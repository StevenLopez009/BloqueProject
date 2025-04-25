import { useEffect, useState } from "react";
import { Subscription } from "rxjs";

export function useOfflineSync<T>(
  key: string,
  service: { subscribe: (cb: (data: T[]) => void) => Subscription }
) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const hasInternet = navigator.onLine;

    if (!hasInternet) {
      const saved = localStorage.getItem(key);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } else {
      const sub: Subscription = service.subscribe((newData) => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [key, service]);

  return data;
}
