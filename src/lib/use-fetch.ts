"use client";

import { useCallback, useEffect, useState } from "react";

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

  const load = useCallback(
    (opts?: { force?: boolean }) => {
      setLoading(true);
      setError(null);
      const target = opts?.force ? `${url}${url.includes("?") ? "&" : "?"}force=1` : url;
      fetch(target)
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
          setData(json.data);
          setWarning(json.warning ?? null);
        })
        .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."))
        .finally(() => setLoading(false));
    },
    [url]
  );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error, warning, refetch: load };
}
