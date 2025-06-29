import { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import type { LocationIQSuggestion } from '@/lib/types';

const LOCATION_IQ_API_ACCESS_TOKEN = 'pk.501c29c02c7d6f69e674624045bd8220';
const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${LOCATION_IQ_API_ACCESS_TOKEN}&q=tower%20of%20lo%20&limit=5&dedupe=1&`;

export function useDebouncedLocationSuggestions(delay = 2000) {
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [locationSelected, setLocationSelected] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLocationSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get<LocationIQSuggestion[]>(
        `${locationUrl}q=${query}`,
        {
          params: {
            key: LOCATION_IQ_API_ACCESS_TOKEN,
            q: query,
            limit: 5,
            dedupe: 1,
            format: 'json',
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      setSuggestions([]);
      console.error('Failed to fetch location suggestions:', error);
    }
  }, []);

  const debouncedFetch = useCallback(
    (query: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchLocationSuggestions(query);
      }, delay);
    },
    [fetchLocationSuggestions, delay]
  );

  return {
    suggestions,
    debouncedFetch,
    locationSelected,
    setLocationSelected,
  };
}
