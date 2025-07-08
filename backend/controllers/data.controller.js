import { getJson } from "serpapi";
import axios from "axios";

const knownCompanies = [
  "Nike", "Adidas", "Puma", "Levis", "Allen Solly", "Biba", "UCB", "Van Heusen",
  "Zara", "H&M", "Crocs", "Wrangler", "Pepe", "Tommy Hilfiger", "Jack & Jones",
  "Roadster", "Max", "Pantaloons", "FabIndia", "Manyavar", "RayBan", "Titan",
  "Fastrack", "Campus", "HRX", "Flying Machine", "Peter England", "Killer",
  "Red Tape", "Woodland", "Sparx", "Action", "Clarks", "Metro", "Bata"
];

const query = "popular fashion brands Walmart India 2025";

const extractTopTrendingCompany = async () => {
  return new Promise((resolve, reject) => {
    getJson({
      engine: "google_shopping",
      q: query,
      google_domain: "google.co.in",
      gl: "in",
      hl: "en",
      api_key: process.env.API_KEY
    }, (json) => {
      try {
        const titles = json.shopping_results?.map(item => item.title) || [];

        console.log("📝 Titles Fetched:", titles.slice(0, 5));

        const freqMap = {};

        titles.forEach(title => {
          const words = title.split(/[\s\-:|]+/)
            .map(w => w.replace(/[^\w]/g, '').trim())
            .filter(w => w.length > 1);

          words.forEach(word => {
            const formatted = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            if (knownCompanies.includes(formatted)) {
              freqMap[formatted] = (freqMap[formatted] || 0) + 1;
            }
          });
        });

        console.log("📊 Brand Frequencies:", freqMap);

        const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
        const topCompany = sorted[0]?.[0];

        if (topCompany) {
          console.log("🔥 Top Walmart Trend:", topCompany);
          resolve(topCompany);
        } else {
          console.log("❌ No brand matched");
          resolve(null);
        }

      } catch (err) {
        reject(err);
      }
    });
  });
};
// ✅ Step 2: Get image from Google Images
const getImageForProduct = async (productName, category = '') => {
  const searchQuery = `${productName} ${category} product packaging`;

  return new Promise((resolve) => {
    getJson({
      engine: "google_images",
      q: searchQuery,
      ijn: "0",
      api_key: process.env.API_KEY
    }, (json) => {
      try {
        const results = json.images_results || [];

        const preferred = results.find(img =>
          img.link?.toLowerCase().includes(productName.toLowerCase()) ||
          img.original?.toLowerCase().includes(productName.toLowerCase()) ||
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

// ✅ Step 3: Main controller
export const getEnrichedTrendingProducts = async (req, res) => {
  try {
    const topTrend = await extractTopTrendingCompany();
    console.log("🔥 Top Trend:", topTrend || "❌ No brand matched");

    if (!topTrend) {
      return res.status(404).json({ success: false, message: "No top brand found." });
    }

    const flaskResponse = await axios.get(`${process.env.API_URL}/suggest`, {
      params: { trend: topTrend }
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
    console.error("❌ Error in trend pipeline:", err.message);
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
    const response = await axios.get(`${process.env.API_URL}/search`, {
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
