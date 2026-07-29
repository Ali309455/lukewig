import { useState, useMemo, useCallback, useRef } from 'react';
import { throttle } from '@/utils/throttle';
import { searchProducts } from '@/utils/searchProducts';

export function useThrottledSearch(products, bundles, delay = 300) {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState({ products: [], bundles: [] });
  const [isSearching, setIsSearching] = useState(false);
  const latestQueryRef = useRef('');

  const throttledSearch = useMemo(
    () =>
      throttle((searchTerm) => {
        const result = searchProducts(products, bundles, searchTerm);
        setResults(result);
        setIsSearching(false);
      }, delay),
    [products, bundles, delay]
  );

  const handleQueryChange = useCallback(
    (value) => {
      setQueryState(value);
      const trimmed = value.trim();
      if (!trimmed) {
        setResults({ products: [], bundles: [] });
        setIsSearching(false);
        latestQueryRef.current = '';
        return;
      }
      latestQueryRef.current = trimmed;
      setIsSearching(true);
      throttledSearch(trimmed);
    },
    [throttledSearch]
  );

  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults({ products: [], bundles: [] });
    setIsSearching(false);
    latestQueryRef.current = '';
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    isSearching,
    clearSearch,
  };
}
