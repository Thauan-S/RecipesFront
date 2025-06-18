import type { RecipeFilterData } from "@/pages/recipes/dashboard/components/RecipeFilter";
import api from "@/services/api";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";
import { useState, useEffect } from "react";

const useFilterRecipes = () => {
  const [recipes, setRecipes] = useState<ResponseShortRecipes[]>([]);
  const[update,setUpdate]=useState(true)
  const[filters,setFilters]=useState<RecipeFilterData>()
  const token = localStorage.getItem("jwtToken");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    console.log("usefilter")
    api
      .post(`${baseUrl}/recipe/filter`, filters,{
        headers: {  
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.recipes)
        setRecipes(res.data.recipes);
      })
      .catch((error) => {
        console.error(error);
      });
    
  }, [token, baseUrl, update, filters]);
  return { recipes, setRecipes,setUpdate,setFilters };
};

export default useFilterRecipes;