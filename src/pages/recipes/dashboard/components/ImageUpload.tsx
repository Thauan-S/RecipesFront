import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  imageUrl?: string;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  onUpload?: () => void;
  recipeId?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, imageFile, setImageFile, onUpload, recipeId }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Imagem da Receita
    </label>
    {imageUrl && !imageFile && recipeId && (
      <img src={imageUrl} alt="Pré-visualização da imagem" className="w-32 h-32 object-cover mb-4 rounded" />
    )}
    <Input
      type="file"
      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
      accept="image/*"
    />
    {recipeId && imageFile && onUpload && (
      <Button
        type="button"
        onClick={onUpload}
        className="mt-2"
      >
        Atualizar Imagem
      </Button>
    )}
  </div>
);

export default ImageUpload; 