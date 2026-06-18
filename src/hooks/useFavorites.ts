import { useCallback, useEffect, useState } from 'react';

import { getItem, setItem } from '@/lib/kv';

const KEY = 'shadow.favorite_flow_ids';

/**
 * User-curated quick-access practices. A plain pinned list — never ranked,
 * counted, or algorithmically suggested. Stored as a JSON array of flow ids in
 * the KV store. Removed/renamed flows are tolerated by callers resolving each
 * id through getPractice() and dropping misses.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getItem(KEY).then((raw) => {
      if (!mounted) return;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setFavorites(parsed.filter((x) => typeof x === 'string'));
        } catch {
          // ignore a corrupt value; treat as empty
        }
      }
      setLoaded(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = favorites.includes(id)
        ? favorites.filter((x) => x !== id)
        : [...favorites, id];
      setFavorites(next);
      void setItem(KEY, JSON.stringify(next));
    },
    [favorites],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, isFavorite, toggle, loaded };
}
