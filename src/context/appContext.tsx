import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import useDashBoard from '@/hooks/useDashBoard';
import type { ResponseShortRecipes } from '@/types/responseShortRecipesJson';
import useFilterRecipes from '@/hooks/useFilterRecipe';
import type { RecipeFilterData } from '@/pages/recipes/dashboard/components/RecipeFilter';
import useDeleteRecipe from '@/hooks/useDeleteRecipe';


interface AppContextState {
  recipes: ResponseShortRecipes[];
  filteredRecipes: ResponseShortRecipes[];
  isLoading: boolean;
  setRecipeId: (recipeId: string | "") => void;
  setFilters: (filters: RecipeFilterData | undefined) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const token = localStorage.getItem("jwtToken") as string;
  const baseUrl = import.meta.env.VITE_BASE_URL as string;
  const { setRecipeId } = useDeleteRecipe(token);
  const { setFilters, filteredRecipes } = useFilterRecipes(token, baseUrl);
  const { recipes, isLoading } = useDashBoard();

  const contextValue: AppContextState = {
    setRecipeId,
    recipes,
    isLoading,
    setFilters,
    filteredRecipes,
    
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export default AppContext;