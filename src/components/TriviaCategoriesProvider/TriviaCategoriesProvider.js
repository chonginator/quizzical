import React, { createContext, useCallback, useMemo, memo } from 'react';
import useSWR from 'swr';

import {
    TRIVIA_CATEGORIES_URL,
    ANY_CATEGORY
} from '../../constants';

export const TriviaCategoriesContext = createContext();

function TriviaCategoriesProvider({ children }) {
  const fetcher = useCallback(async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (!data) {
        throw new Error(`Unexpected data: ${data}.`);
    }

    return data;
  }, [])
  const { data, error: triviaCategoriesError, isLoading: triviaCategoriesAreLoading } = useSWR(TRIVIA_CATEGORIES_URL, fetcher)

  const value = useMemo(() => {
    const triviaCategories = data ? [ANY_CATEGORY, ...data.trivia_categories] : [];
    return { triviaCategories, triviaCategoriesError, triviaCategoriesAreLoading }
  }, [data, triviaCategoriesAreLoading, triviaCategoriesError])

  return (
    <TriviaCategoriesContext.Provider value={value}>
      {children}
    </TriviaCategoriesContext.Provider>
  );
}

export default memo(TriviaCategoriesProvider);
