import api from "@/services/api";
import { HttpStatusCode } from "axios";
import { useState, useEffect } from "react";


const useDeleteRecipe = (token:string) => {
    const[recipeId,setRecipeId]=useState<number>()
    const [update, setUpdate] = useState(true)
    const [success,setSuccess]=useState<boolean>(false)
    const[error,setError]=useState<string>("")
    useEffect(() => {
        if(recipeId)
        setSuccess(false)
        setError("")
        api.delete(`/recipe/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
                if(res.status===HttpStatusCode.NoContent)
                setSuccess(true)
            })
            .catch((error) => {
                setError(error.response.errors);
                setSuccess(false)
            });
            
    }, [token, update, recipeId]);
    return {  setUpdate,error,setError,success,setRecipeId };
};

export default useDeleteRecipe;