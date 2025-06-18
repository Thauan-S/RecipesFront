import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ResponseShortRecipes } from '@/types/responseShortRecipesJson';
import RecipeCardModal from './RecipeCardModal';
import { Button } from '@/components/ui/button';
interface RecipeCardProps{
    recipe:ResponseShortRecipes;
}
const RecipeCard = ({recipe}:RecipeCardProps) => {
  return (
    <Card
    className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
  >
    <CardHeader className="p-0">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="text-lg font-semibold mb-2">
        {recipe.title}
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Quantidade de ingredientes: {recipe.amountIngredients}
      </p>
      <div className="mt-4">
        <RecipeCardModal
          recipeId={recipe.id}
          trigger={<Button className="w-full">Ver receita</Button>}
          // onSuccess={() => fetchRecipes()}
        />
      </div>
    </CardContent>
  </Card>
  )
}

export default RecipeCard