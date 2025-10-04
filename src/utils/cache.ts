/**
 * Generic Cache Utility
 *
 * A centralized caching solution that can be reused across the application.
 * Supports TTL (Time To Live), size limits, and automatic cleanup.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
}

class Cache<T = any> {
  private cache: Map<string, CacheEntry<T>>;
  private ttl: number;
  private maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.cache = new Map();
    this.ttl = options.ttl ?? 5 * 60 * 1000; // Default 5 minutes
    this.maxSize = options.maxSize ?? 100; // Default 100 entries
  }

  /**
   * Get data from cache
   * @param key - Cache key
   * @returns Cached data or null if expired/not found
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set data in cache
   * @param key - Cache key
   * @param data - Data to cache
   * @param customTTL - Optional custom TTL for this entry
   */
  set(key: string, data: T, customTTL?: number): void {
    // Enforce max size by removing oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const ttl = customTTL ?? this.ttl;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    };

    this.cache.set(key, entry);
  }

  /**
   * Check if key exists and is not expired
   * @param key - Cache key
   * @returns true if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Remove specific entry from cache
   * @param key - Cache key
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Remove all expired entries
   */
  cleanup(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl,
    };
  }
}

/**
 * Create a cache instance with optional configuration
 */
export const createCache = <T = any>(options?: CacheOptions): Cache<T> => {
  return new Cache<T>(options);
};

/**
 * Singleton cache instances for common use cases
 */
export const weatherCache = createCache({ ttl: 5 * 60 * 1000, maxSize: 50 });
export const citySearchCache = createCache({ ttl: 15 * 60 * 1000, maxSize: 100 });
export const computationCache = createCache({ ttl: 60 * 60 * 1000, maxSize: 1000 });

export default Cache;
