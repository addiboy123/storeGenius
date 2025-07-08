import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import re

# ---------------------------------
# Load model and catalog
# ---------------------------------
model = SentenceTransformer('BAAI/bge-base-en')
df_catalog = pd.read_csv('df_with_embeddings.csv')

# Load precomputed normalized embeddings
catalog_embeddings = np.load('product_embeddings_bge.npy')

# Build FAISS cosine similarity index
faiss_index = faiss.IndexFlatIP(catalog_embeddings.shape[1])
faiss_index.add(catalog_embeddings)


# ---------------------------------
# Parse price range from user prompt
# ---------------------------------
def parse_price_range(prompt: str):
    prompt = prompt.lower().replace(',', '')

    # 1. Between <low> and <high>
    between_match = re.search(r'between\s*\$?₹?(\d+)\s*(?:and|to)\s*\$?₹?(\d+)', prompt)
    if between_match:
        return float(between_match.group(1)), float(between_match.group(2))

    # 2. Under, below, less than
    under_match = re.search(r'(under|below|less than)\s*\$?₹?(\d+)', prompt)
    if under_match:
        return 0.0, float(under_match.group(2))

    # 3. Above, over, more than
    above_match = re.search(r'(above|over|more than)\s*\$?₹?(\d+)', prompt)
    if above_match:
        return float(above_match.group(2)), float('inf')

    # 4. Approximate standalone price (with ±15% margin)
    price_match = re.search(r'\$?₹?(\d{2,6})(?!\s*(ml|g|gm|kg|%|inch|cm|hz))', prompt)
    if price_match:
        approx = float(price_match.group(1))
        margin = 0.15 * approx
        return approx - margin, approx + margin

    return None


# ---------------------------------
# Search catalog based on prompt
# ---------------------------------
def search_by_user_prompt(prompt: str, top_k=5):
    # Embed query using BGE and normalize
    query_embedding = model.encode([f"Query: {prompt}"], normalize_embeddings=True)

    # Search top matches
    D, I = faiss_index.search(np.array(query_embedding), top_k * 4)
    results = df_catalog.iloc[I[0]].copy()

    # Optional: filter by price range
    price_range = parse_price_range(prompt)
    if price_range and 'final_price' in results.columns:
        low, high = price_range
        results = results[(results['final_price'] >= low) & (results['final_price'] <= high)]

    return results.head(top_k)[['product_name', 'short_description', 'final_price']].to_dict(orient='records')
