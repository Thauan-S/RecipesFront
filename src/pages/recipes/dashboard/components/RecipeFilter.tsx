import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface RecipeFilterProps {
  onFilter: (filters: RecipeFilterData) => void;
}

export interface RecipeFilterData {
  recipeTitle_Ingredient: string;
  cookingTimes: number[];
  difficulties: number[];
  dishTypes: number[];
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<RecipeFilterData>({
    recipeTitle_Ingredient: "",
    cookingTimes: [],
    difficulties: [],
    dishTypes: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <Card className="p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Buscar por título ou ingrediente"
            value={filters.recipeTitle_Ingredient}
            onChange={(e) =>
              setFilters({ ...filters, recipeTitle_Ingredient: e.target.value })
            }
          />
        </div>

        <div className="flex  justify-between gap-4">
          <Select
            onValueChange={(value) =>
              setFilters({
                ...filters,
                cookingTimes: [parseInt(value)],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Tempo de preparo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Rápido</SelectItem>
              <SelectItem value="1">Médio</SelectItem>
              <SelectItem value="2">Longo</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setFilters({
                ...filters,
                difficulties: [parseInt(value)],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Fácil</SelectItem>
              <SelectItem value="1">Médio</SelectItem>
              <SelectItem value="2">Difícil</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setFilters({
                ...filters,
                dishTypes: [parseInt(value)],
              })
            }
          >
            <SelectTrigger>
              <SelectValue  placeholder="Tipo de prato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Café da Manhã</SelectItem>
              <SelectItem value="1">Almoço</SelectItem>
              <SelectItem value="2">Aperitivos</SelectItem>
              <SelectItem value="3">Lanche</SelectItem>
              <SelectItem value="4">Sobremesa</SelectItem>
              <SelectItem value="5">Jantar</SelectItem>
              <SelectItem value="6">Bebidas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Filtrar
        </Button>
      </form>
    </Card>
  );
};

export default RecipeFilter; 