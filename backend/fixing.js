const getProductImage = async (productName) => {
  return new Promise((resolve, reject) => {
    getJson({
      q: productName,
      engine: "google_images",
      ijn: "0",
      api_key: "your_key"
    }, (json) => {
      try {
        const imageUrl = json.images_results?.[0]?.thumbnail;
        if (imageUrl) resolve(imageUrl);
        else reject("No image found");
      } catch (e) {
        reject("Error fetching image");
      }
    });
  });
};
