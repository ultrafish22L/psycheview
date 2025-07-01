const TILE_SIZE = 1024; // Stability AI's recommended size
const CACHE_KEY = 'psycheview_tile_cache';

class StabilityAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_STABILITY_API_KEY;
    this.cache = this.loadCache();
  }

  loadCache() {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  }

  saveCache() {
    localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
  }

  getCacheKey(x, y) {
    return `tile_${x}_${y}`;
  }

  async generateTile(x, y, sourceImage) {
    const cacheKey = this.getCacheKey(x, y);
    
    // Check cache first
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      const response = await fetch('https://api.stability.ai/v2beta/stable-image/edit/outpaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          image: sourceImage,
          mask_image: null, // We'll generate this based on visible area
          height: TILE_SIZE,
          width: TILE_SIZE,
          image_guidance: 0.7, // Adjust for balance between matching and creativity
          sampler: 'K_DPMPP_2M',
          steps: 30,
          seed: Math.floor(Math.random() * 1000000),
          cfg_scale: 7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stability AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache[cacheKey] = data.image;
      this.saveCache();

      return data.image;
    } catch (error) {
      console.error('Error generating tile:', error);
      throw error;
    }
  }
}

export const stabilityAIService = new StabilityAIService();