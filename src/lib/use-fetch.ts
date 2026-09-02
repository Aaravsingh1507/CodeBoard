"use client";

import { useCallback, useEffect, useState, useRef } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  warning: string | null;
  refetch: (opts?: { force?: boolean }) => void;
}

// In-memory cache for instantaneous navigation without repeated layout flashes
const cache = new Map<string, { data: any; warning: string | null; timestamp: number }>();
const CACHE_TTL = 30 * 1000; // 30s fresh window before silent background revalidation

export function useFetch<T>(url: string): UseFetchResult<T> {
  const cached = cache.get(url);
  const [data, setData] = useState<T | null>(cached ? (cached.data as T) : null);
  const [loading, setLoading] = useState<boolean>(!cached);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(cached?.warning ?? null);
  const isMounted = useRef(true);

  const load = useCallback(
    (opts?: { force?: boolean }) => {
      const isForced = !!opts?.force;
      if (!cache.has(url) || isForced) {
        setLoading(true);
      }
      setError(null);
      const target = isForced ? `${url}${url.includes("?") ? "&" : "?"}force=1` : url;

      fetch(target)
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
          cache.set(url, { data: json.data, warning: json.warning ?? null, timestamp: Date.now() });
          if (isMounted.current) {
            setData(json.data);
            setWarning(json.warning ?? null);
          }
        })
        .catch((err) => {
          if (isMounted.current) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setLoading(false);
          }
        });
    },
    [url]
  );

  useEffect(() => {
    isMounted.current = true;
    const currentCached = cache.get(url);
    if (currentCached) {
      setData(currentCached.data as T);
      setWarning(currentCached.warning);
      if (Date.now() - currentCached.timestamp > CACHE_TTL) {
        load();
      } else {
        setLoading(false);
      }
    } else {
      load();
    }

    return () => {
      isMounted.current = false;
    };
  }, [url, load]);

  return { data, loading, error, warning, refetch: load };
}
