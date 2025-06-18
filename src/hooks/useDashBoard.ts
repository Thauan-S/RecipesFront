import api from "@/services/api";
import type { RecipeParams } from "@/types/RecipeParams";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";
import { useState, useEffect } from "react";

const useFilterRecipes = () => {
    const [recipes, setRecipes] = useState<ResponseShortRecipes[]>([]);
    const [update, setUpdate] = useState(true)
    const [params, setParams] = useState<RecipeParams>({
        direction: "asc",
        pageNumber: 1,
        pageSize: 10
    })
    const token = localStorage.getItem("jwtToken");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    useEffect(() => {
        api
            .post(`${baseUrl}/dashboard`, {
                params:params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setRecipes(res.data.recipes);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [token, baseUrl, update, setParams, params]);
    return { recipes, setRecipes, setUpdate, setParams };
};

export default useFilterRecipes;