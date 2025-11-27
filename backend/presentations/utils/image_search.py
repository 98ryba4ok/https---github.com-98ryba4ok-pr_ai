# your_app/utils/image_search.py
import requests
from django.conf import settings
from typing import Optional, List

UNSPLASH_URL = "https://api.unsplash.com/search/photos"


def search_image_urls(prompt: str, count: int = 2) -> List[str]:
    """Возвращает up to `count` URL-ов картинок по запросу prompt.
    Если ничего не найдено — возвращает пустой список.
    """
    print("🔍 [search_image_urls] prompt =", prompt, "count=", count)

    if not prompt:
        print("❌ [search_image_urls] prompt пустой")
        return []

    params = {
        "query": prompt,
        "client_id": settings.UNSPLASH_ACCESS_KEY,
        "orientation": "landscape",
        "per_page": count,
    }

    print("🌐 [search_image_urls] Запрос к Unsplash:", params)

    try:
        r = requests.get(UNSPLASH_URL, params=params, timeout=10)
        print("🌐 [search_image_urls] Статус ответа:", r.status_code)
        r.raise_for_status()
        data = r.json()
        print("📦 [search_image_urls] Ответ от Unsplash: count=", len(data.get("results", [])))
    except Exception as e:
        print("❌ [search_image_urls] Ошибка запроса:", e)
        return []

    results = data.get("results") or []
    urls: List[str] = []
    for res in results[:count]:
        url = res.get("urls", {}).get("regular")
        if url:
            urls.append(url)

    print("✅ [search_image_urls] Найдено URL-ов:", len(urls))
    return urls


def search_image_url(prompt: str) -> Optional[str]:
    """Backward-compatible: возвращает первый URL или None."""
    urls = search_image_urls(prompt, count=1)
    return urls[0] if urls else None

