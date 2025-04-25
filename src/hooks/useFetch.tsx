import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => {
      clearInterval(interval);
      abortController.abort();
    };
  }, [url]);

  return data;
}
