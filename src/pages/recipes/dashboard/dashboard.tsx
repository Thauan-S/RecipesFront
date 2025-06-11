import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";

const DashBoard = () => {
  const { token } = useParams();

  const [recipes, SetRecipes] = useState<ResponseShortRecipes[]>([]);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      console.log(baseUrl);
      axios
        .get(baseUrl + "/dashboard", {
          params: { pageNumber: 1, pageSize: 10, direction: "desc" },
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        })
        .then((response) =>{ 
          console.log(response)
          SetRecipes(response.data.recipes)})
        .catch((error) => setError(error.message));
    }
  }, []);
  console.log(recipes.length)
  return (
    <div>
      { recipes &&
        recipes.map((r,index) => (
          <Card key={index} className="w-full max-w-sm shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="p-0">
            <img
              src={r.imageUrl}
              alt={r.title}
              className="w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold mb-2">{r.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ingredientes: {r.title}
            </p>
          </CardContent>
        </Card>
        ))}
    </div>
  );
};

export default DashBoard;
