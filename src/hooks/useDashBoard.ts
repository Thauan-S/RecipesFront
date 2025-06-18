import api from "@/services/api";
import type { RecipeParams } from "@/types/RecipeParams";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";
import { useState, useEffect } from "react";

const useDashBoard = () => {
    const [recipes, setRecipes] = useState<ResponseShortRecipes[]>([]);
    const [update, setUpdate] = useState(true)
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const[error,setError]=useState<string>("")
    const [params, setParams] = useState<RecipeParams>({
        direction: "asc",
        pageNumber: 1,
        pageSize: 10
    })
    const token = localStorage.getItem("jwtToken");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    useEffect(() => {
        setIsLoading(true)
        setError("")
        api
            .get(`${baseUrl}/dashboard`, {
                params:params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("dashboard",res.data.recipes);
                setRecipes(res.data.recipes);
                setIsLoading(false)
            })
            .catch((error ) => {
                setError(error.response.errors);
                setIsLoading(false)
            });
            
    }, [token, baseUrl, update, setParams, params]);
    return { recipes, setRecipes, setUpdate, setParams,error,setError,isLoading };
};

export default useDashBoard;