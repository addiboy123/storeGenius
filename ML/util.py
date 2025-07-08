import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import requests
import re
import os


# -------------------------------
# Build FAISS Cosine Similarity Index
# -------------------------------
def build_faiss_index(embeddings: np.ndarray):
    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)  # Cosine similarity
    index.add(embeddings)
    return index


# -------------------------------
# LLM Query using Ollama
# -------------------------------
OLLAMA_URL = os.getenv("OLLAMA_HOST", "http://host.docker.internal:11434")


def query_ollama(prompt, model="storeGeniusLLM"):
    print("Querying LLM for product keywords...")
    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={"model": model, "prompt": prompt, "stream": False}
    )
    raw_output = response.json().get("response", "")
    lines = raw_output.splitlines()

    bullet_regex = r'^\s*(?:[-*•—]|\d+\.)\s*(.+)'
    keywords = [re.match(bullet_regex, line) for line in lines]
    keywords = [m.group(1).strip() for m in keywords if m]

    if not keywords:
        keywords = [
            line.strip().lstrip("-•*0123456789. ")
            for line in lines
            if 1 < len(line.strip()) < 60 and "product" not in line.lower()
        ]
        keywords = keywords[-5:]

    return keywords[:5]


# -------------------------------
# Trend → Embedding → Search
# -------------------------------
def search_top_k_products(keywords, model, faiss_index, df_catalog, top_k=5):
    print("\nSearching catalog for matches...\n")

    # Query embeddings
    query_embeddings = model.encode(
        [f"Query: {k}" for k in keywords],
        normalize_embeddings=True
    )

    results = {}

    for keyword, emb in zip(keywords, query_embeddings):
        emb = np.array([emb])
        D, I = faiss_index.search(emb, top_k)
        matched = df_catalog.iloc[I[0]]
        results[keyword] = matched[['product_name', 'short_description']].to_dict('records')

    return results


# -------------------------------
# Main function for selecting catalog items
# -------------------------------
def select_catalogue_items(trend: str):
    # Load embedding model (better retrieval quality)
    model = SentenceTransformer('BAAI/bge-base-en')

    # Load catalog
    df_catalog = pd.read_csv('df_with_embeddings.csv')

    # Load or create passage embeddings
    # These must be created with "Passage: ..." format and normalized
    catalog_embeddings = np.load('product_embeddings_bge.npy')

    # Build FAISS index
    index = build_faiss_index(catalog_embeddings)

    # Query LLM
    keywords = query_ollama(trend)

    # Search products
    search_results = search_top_k_products(keywords, model, index, df_catalog)

    return {
        "trend": trend,
        "keywords": keywords,
        "results": search_results
    }


# -------------------------------
# CLI usage
# -------------------------------
def main():
    model = SentenceTransformer('BAAI/bge-base-en')
    df_catalog = pd.read_csv('df_with_embeddings.csv')
    catalog_embeddings = np.load('product_embeddings_bge.npy')
    index = build_faiss_index(catalog_embeddings)

    trend = input("Enter a trending topic: ").strip()
    keywords = query_ollama(trend)
    search_results = search_top_k_products(keywords, model, index, df_catalog)

    for keyword, matches in search_results.items():
        print(f"\n🔍 Top products for keyword: '{keyword}'")
        for i, item in enumerate(matches, 1):
            print(f"{i}. {item['product_name']}")
            print(f"   {item.get('short_description','')}\n")


if __name__ == '__main__':
    main()
