import { useState, useEffect } from "react";
import { useUserGet } from "@/hooks/useUserGet";
import { useUserUpdate } from "@/hooks/useUserUpdate";
import { useUserDelete } from "@/hooks/useUserDelete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordModal } from "../login/components/ResetPasswordModal";

export default function UserProfile() {
  const { user, isLoading, error, refetch } = useUserGet();
  const { updateUser, isLoading: isUpdating } = useUserUpdate(refetch);
  const { deleteUser, isLoading: isDeleting } = useUserDelete();

  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    setEditData(user);
  }, [user]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar usuário</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
                
      <h2 className="text-xl mb-4">Meu Perfil</h2>
      <Input
        value={editData?.name || ""}
        onChange={e => setEditData({ ...editData, name: e.target.value })}
        placeholder="Nome"
        className="mb-2"
      />
      <Input
        value={editData?.email || ""}
        onChange={e => setEditData({ ...editData, email: e.target.value })}
        placeholder="Email"
        className="mb-2"
      />
      <Button
        onClick={() => updateUser(editData)}
        disabled={isUpdating}
        className="mt-2 w-full"
      >
        {isUpdating ? "Salvando..." : "Salvar"}
      </Button>
      <Button
        onClick={() => deleteUser()}
        disabled={isDeleting}
        variant="destructive"
        className="mt-2 w-full"
      >
        {isDeleting ? "Deletando..." : "Deletar Conta"}
      </Button>
      <div className="ml-8 mt-2">
                  <ResetPasswordModal>
                    <a>Mudar senha</a>
                  </ResetPasswordModal>
                </div>
    </div>
  );
} 