import { getJson } from "serpapi";
import axios from "axios";

// Step 1: Get trending product names (company-related) from Google Shopping
const extractTrendingCompanyNames = async () => {
  return new Promise((resolve, reject) => {
    getJson({
      engine: "google_shopping",
      q: "trending products",
      google_domain: "google.co.in",
      gl: "in",
      hl: "en",
      api_key: "6c9a293749ce36c4e8e20fd785a26ec9f771b926bdba0f7f8f79e435ae9ae880"
    }, (json) => {
      try {
        const rawTitles = json.shopping_results?.map(item => item.title) || [];
        
        // Extract first word or brand-like term
        const brands = rawTitles.map(title => {
          const match = title.match(/^[A-Za-z0-9]+/);
          return match ? match[0] : null;
        }).filter(Boolean);

        // Deduplicate and return top N
        const uniqueBrands = [...new Set(brands)].slice(0, 10);

        resolve(uniqueBrands);
      } catch (err) {
        reject(err);
      }
    });
  });
};

// Step 2: Get image from Google Images for a given product name
const getImageForProduct = async (productName, category = '') => {
  const searchQuery = `${productName} ${category} product packaging`;

  return new Promise((resolve, reject) => {
    getJson({
      q: searchQuery,
      engine: "google_images",
      ijn: "0",
      api_key: "6c9a293749ce36c4e8e20fd785a26ec9f771b926bdba0f7f8f79e435ae9ae880"
    }, (json) => {
      try {
        const results = json.images_results || [];

        // Try to find an image with alt or source matching keywords
        const preferred = results.find(img =>
          img.link?.includes(productName.toLowerCase()) ||
          img.original?.includes(productName.toLowerCase()) ||
          img.title?.toLowerCase().includes(productName.toLowerCase())
        );

        const fallback = results[0];

        resolve((preferred || fallback)?.thumbnail || null);
      } catch (err) {
        console.error('Image fetch error:', err.message);
        resolve(null);
      }
    });
  });
};


// ✅ Controller version (use in route)
export const getEnrichedTrendingProducts = async (req, res) => {
  try {
    const productTitles = await extractTrendingCompanyNames();
    console.log("📦 Trending Companies:", productTitles);

    const flaskResponse = await axios.get("http://localhost:5050/suggest", {
      params: { trend: productTitles },
      paramsSerializer: {
        serialize: params =>
          Object.entries(params)
            .map(([key, val]) =>
              Array.isArray(val)
                ? val.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join("&")
                : `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            ).join("&")
      }
    });

    const { keywords, results } = flaskResponse.data;

    const enriched = await Promise.all(
      keywords.map(async (category) => {
        const products = results[category]?.slice(0, 3) || [];

        const withImages = await Promise.all(
          products.map(async (product) => {
            const image = await getImageForProduct(product.product_name, category);
            return {
              name: product.product_name,
              image
            };
          })
        );
        

        return {
          category,
          products: withImages
        };
      })
    );

    return res.status(200).json({ success: true, data: enriched });
  } catch (err) {
    console.error("❌ Error in pipeline:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};


export const suggestItems = async (req, res) => {
  const prompt = req.query.prompt;
  console.log(prompt)

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' query parameter" });
  }

  try {
    const response = await axios.get("http://127.0.0.1:5050/search", {
      params: { prompt }
    });

    const items = response.data; 
    console.log(typeof items)
    console.log('type of items:', typeof items);

    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const image = await getImageForProduct(item.product_name);
        return {
          ...item,
          image: image || "https://dummyimage.com/300x300/eee/555.png&text=No+Image"
        };
      })
    );

    return res.status(200).json(enrichedItems);
  } catch (error) {
    console.error("❌ Error fetching suggestions:", error.message);
    return res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
