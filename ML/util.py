import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import requests
import re
from tqdm import tqdm
import os

# -------------------------------
# Load catalog and build index
# -------------------------------




def build_faiss_index(embeddings):
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    return index


# -------------------------------
# LLM Query using Ollama
# -------------------------------

import requests
import re


OLLAMA_URL = os.getenv("OLLAMA_HOST", "http://localhost:11434")


def query_ollama(prompt, model="storeGeniusLLM"):
    print("Querying LLM for product keywords...")
    
    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={"model": model, "prompt": prompt, "stream": False}
    )
    
    raw_output = response.json().get("response", "")
    lines = raw_output.splitlines()

    # Match common bullet styles: -, *, •, —, 1. 2. etc.
    bullet_regex = r'^\s*(?:[-*•—]|\d+\.)\s*(.+)'
    keywords = [re.match(bullet_regex, line) for line in lines]
    keywords = [match.group(1).strip() for match in keywords if match]

    # Fallback: take last 5 short content lines (without "Here are", etc.)
    if not keywords:
        keywords = [
            line.strip().lstrip("-•*0123456789. ") 
            for line in lines 
            if 1 < len(line.strip()) < 60 and "product" not in line.lower()
        ]
        keywords = keywords[-5:]
        print(keywords)

    return keywords[:5]


def extract_keywords_from_llm_response(response):
    # Handles bullet points or newline-separated lists
    keywords = re.findall(r'[-*]\s*(.+)', response)
    if not keywords:
        keywords = response.strip().split('\n')
    keywords = [kw.strip() for kw in keywords if kw.strip()]
    return keywords[:5]


# -------------------------------
# Trend → Keyword → Embedding → Search
# -------------------------------

def search_top_k_products(keywords, model, faiss_index, df_catalog, top_k=5):
    print("\nSearching catalog for matches...\n")
    keyword_embeddings = model.encode(keywords)
    results = {}

    for keyword, emb in zip(keywords, keyword_embeddings):
        D, I = faiss_index.search(np.array([emb]), top_k)
        matched = df_catalog.iloc[I[0]]
        results[keyword] = matched[['product_name']].to_dict('records')
    return results


# -------------------------------
# Main entry point
# -------------------------------


def select_catalogue_items(trend: str):
    # Load embedding model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Load catalog and precomputed embeddings
    df_catalog = pd.read_csv('df_with_embeddings.csv')
    catalog_embeddings = np.load('product_embeddings.npy')

    # Build FAISS index
    index = build_faiss_index(catalog_embeddings)

    # Query LLM for keywords
    keywords = query_ollama(trend)  # already returns a list

    # Search for products
    search_results = search_top_k_products(keywords, model, index, df_catalog)

    # Package results
    return {
        "trend": trend,
        "keywords": keywords,
        "results": search_results
    }


def main():
    # Load embedding model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Load catalog
    df_catalog = pd.read_csv('df_with_embeddings.csv')
    catalog_embeddings = np.load('product_embeddings.npy')

    # Build FAISS index
    index = build_faiss_index(catalog_embeddings)

    # Input trend
    trend = input("Enter a trending topic: ").strip()

    # Query LLM for keywords
    keywords = query_ollama(trend)  # already a list now

    # Search for products
    search_results = search_top_k_products(keywords, model, index, df_catalog)

    # Display results
    for keyword, matches in search_results.items():
        print(f"\n🔍 Top products for keyword: '{keyword}'")
        for i, item in enumerate(matches, 1):
            print(f"{i}. {item['product_name']}")

# -------------------------------
# Run the pipeline
# -------------------------------

if __name__ == '__main__':
    main()
