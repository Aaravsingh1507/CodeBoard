"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  warning: string | null;
  refetch: (opts?: { force?: boolean }) => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(
    (opts?: { force?: boolean }) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);
      const target = opts?.force ? `${url}${url.includes("?") ? "&" : "?"}force=1` : url;
      fetch(target, { signal: controller.signal })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
          setData(json.data);
          setWarning(json.warning ?? null);
        })
        .catch((err) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError(err instanceof Error ? err.message : "Something went wrong.");
        })
        .finally(() => setLoading(false));
    },
    [url]
  );

  // Trigger fetch when URL changes. The `load` callback is stable per-url via
  // useCallback, so this re-runs only when the URL actually changes.
  const initialRef = useRef(true);
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      // First render: kick off fetch via a microtask to avoid synchronous
      // setState inside the effect body.
      queueMicrotask(() => load());
    } else {
      queueMicrotask(() => load());
    }
    return () => controllerRef.current?.abort();
  }, [load]);

  return { data, loading, error, warning, refetch: load };
}
