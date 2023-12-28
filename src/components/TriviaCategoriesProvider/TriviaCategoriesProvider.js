import React, { createContext } from 'react';
import useSWR from 'swr';

import {
    TRIVIA_CATEGORIES_URL,
    ANY_CATEGORY
} from '../../constants';

export const TriviaCategoriesContext = createContext();

function TriviaCategoriesProvider({ children }) {
    const { data, error: triviaCategoriesError, isLoading: triviaCategoriesAreLoading } = useSWR(TRIVIA_CATEGORIES_URL, fetcher)

  async function fetcher(url) {
    const res = await fetch(url)
    const data = await res.json()

    if (!data) {
        throw new Error(`Unexpected data: ${data}.`);
    }

    return data;
}

  const triviaCategories = data ? [ANY_CATEGORY, ...data.trivia_categories] : [];

  return (
    <TriviaCategoriesContext.Provider value={{ triviaCategories, triviaCategoriesError, triviaCategoriesAreLoading }}>
      {children}
    </TriviaCategoriesContext.Provider>
  );
}

export default TriviaCategoriesProvider;
