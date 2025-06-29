import { getJson } from "serpapi";

getJson({
  engine: "google_shopping",
  q: "trending products",
  google_domain: "google.co.in",
  gl: "in",
  hl: "en",
  api_key: "547972684f44c56f603e3d13c58a1c888a68fa0fa64c189df12d87419027ab32"
}, (json) => {
  const results = json.shopping_results;

  if (!results || results.length === 0) {
    console.log("No trending products found.");
    return;
  }

  const trendingProducts = results.map(item => ({
    title: item.title,
  }));

  console.log(trendingProducts);
});
