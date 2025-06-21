import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/services/api";
import { AxiosError, HttpStatusCode } from "axios";
import useUserchangePassword from "@/hooks/useUserChangePassword";


interface ResetPasswordModalProps {
  children: React.ReactNode;
}

export const ResetPasswordModal = ({ children }: ResetPasswordModalProps) => {
  const{isOpen}=useUserchangePassword()
  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="dialogContent" asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white ">
        <DialogHeader>
          <DialogTitle>Redefinir Senha</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input
              id="current-password"
              type="password"
              value={password.password}
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input
              id="new-password"
              type="password"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Alterar Senha
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 