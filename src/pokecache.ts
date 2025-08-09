/**
 * With generic type T, val can be any type so I can store anything in it
 */
export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

/**
 *
 */
export class Cache {
  /**
   * @remarks
   * cache is a JS Map object. Map is a key-value store that remembers the insertion order of keys.
   * There will only ever be one cache object so static and readonly made sense to me.
   * Also I like calling it with 'Cache.' rather that 'this.' syntax
   *
   * @returns A new map object
   */
  static readonly #cache = new Map<string, CacheEntry<any>>();
  static #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  static #interval: number;

  constructor(interval: number) {
    Cache.#interval = interval;
    this.#startReapLoop();
  }

  /**
   * Add an entry to the cache
   * @param key key value of cache entry
   * @param val contents of the cache entry
   */
  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    Cache.#cache.set(key, entry);
  }

  /**
   * Get a cache entry corresponding to a key value
   * @param key key of the cache entry
   * @returns cache entry if found of `undefined` if not found
   */
  get<T>(key: string): CacheEntry<T> | undefined {
    if (Cache.#cache.has(key)) {
      return Cache.#cache.get(key);
    }
    return undefined;
  }

  /**
   * Delete cache entries older than interval
   */
  #reap() {
    for (const [key, val] of Cache.#cache) {
      if (val.createdAt < Date.now() - Cache.#interval) {
        Cache.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    Cache.#reapIntervalId = setInterval(this.#reap, Cache.#interval);
  }

  stopReapLoop() {
    clearInterval(Cache.#reapIntervalId);
    Cache.#reapIntervalId = undefined;
  }
}
