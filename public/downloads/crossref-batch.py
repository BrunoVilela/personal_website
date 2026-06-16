"""Minimal CrossRef batch query example."""
from urllib.parse import urlencode
import requests


def search_crossref(query: str, rows: int = 20):
    url = "https://api.crossref.org/works?" + urlencode({"query": query, "rows": rows})
    response = requests.get(url, timeout=20)
    response.raise_for_status()
    return response.json()["message"]["items"]
