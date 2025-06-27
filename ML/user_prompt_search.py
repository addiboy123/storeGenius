import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import re

# Load once for reuse
model = SentenceTransformer('all-MiniLM-L6-v2')
df_catalog = pd.read_csv('df_with_embeddings.csv')
catalog_embeddings = np.load('ML/product_embeddings.npy')
faiss_index = faiss.IndexFlatL2(catalog_embeddings.shape[1])
faiss_index.add(catalog_embeddings)

def parse_price_range(prompt: str):
    prompt = prompt.lower().replace(',', '')

    # 1. Check for "between <low> and <high>"
    between_match = re.search(r'between\s*\$?₹?(\d+)\s*(?:and|to)\s*\$?₹?(\d+)', prompt)
    if between_match:
        try:
            low = float(between_match.group(1))
            high = float(between_match.group(2))
            return (low, high)
        except:
            return None

    # 2. Check for "under", "below", "less than"
    under_match = re.search(r'(under|below|less than)\s*\$?₹?(\d+)', prompt)
    if under_match:
        try:
            return (0, float(under_match.group(2)))
        except:
            return None

    # 3. Check for "above", "over", "more than"
    above_match = re.search(r'(above|over|more than)\s*\$?₹?(\d+)', prompt)
    if above_match:
        try:
            return (float(above_match.group(2)), float('inf'))
        except:
            return None

    # 4. Single standalone price — fuzzy match
    price_match = re.search(r'\$?₹?(\d{2,6})(?!\s*(ml|g|gm|kg|%|inch|cm|hz))', prompt)
    if price_match:
        try:
            approx = float(price_match.group(1))
            margin = 0.15 * approx
            return (approx - margin, approx + margin)
        except:
            return None

    return None

def search_by_user_prompt(prompt: str, top_k=5):
    embedding = model.encode([prompt])
    D, I = faiss_index.search(np.array(embedding), top_k * 4)
    results = df_catalog.iloc[I[0]].copy()

    price_range = parse_price_range(prompt)

    if price_range and isinstance(price_range, tuple) and 'final_price' in results.columns:
        low, high = price_range
        results = results[(results['final_price'] >= low) & (results['final_price'] <= high)]

    return results.head(top_k)[['product_name', 'short_description', 'final_price']].to_dict(orient='records')
