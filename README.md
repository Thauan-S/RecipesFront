# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# RecipesFront

# Recipes App

Este projeto foi refatorado para usar **@tanstack/react-query** para gerenciamento de estado de servidor.

## Hooks Refatorados com React Query

### useDashboard
```typescript
// Antes (useState + useEffect)
const { recipes, isLoading, setUpdate } = useDashBoard();

// Agora (React Query)
const { recipes, isLoading, setUpdate } = useDashBoard();
// setUpdate agora é um refetch automático
```

### useDeleteRecipe
```typescript
// Antes (useState + useEffect)
const { setRecipeId, success, error } = useDeleteRecipe(token);

// Agora (React Query + useMutation)
const { setRecipeId, success, error, isLoading } = useDeleteRecipe(token);
// Invalidação automática da cache após deleção
```

### useFilterRecipe
```typescript
// Antes (useState + useEffect)
const { filteredRecipes, setFilters, setUpdate } = useFilterRecipes(token, baseUrl);

// Agora (React Query)
const { filteredRecipes, setFilters, setUpdate } = useFilterRecipes(token, baseUrl);
// Cache automático e refetch inteligente
```

## Benefícios do React Query

1. **Cache Automático**: Dados são cacheados automaticamente
2. **Refetch Inteligente**: Atualiza dados quando necessário
3. **Loading States**: Estados de carregamento gerenciados automaticamente
4. **Error Handling**: Tratamento de erros simplificado
5. **Invalidação**: Cache invalida automaticamente após mutações
6. **Otimistic Updates**: Possibilidade de atualizações otimistas

## Configuração

O React Query está configurado no `main.tsx` com:
- `staleTime`: 5 minutos
- `retry`: 1 tentativa
- QueryClient global para toda a aplicação
