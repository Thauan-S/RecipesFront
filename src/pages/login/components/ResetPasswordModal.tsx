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
import { useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
import { AxiosError, HttpStatusCode } from "axios";
import type { ErrorResponse } from "@/types/errorResponse";

interface ResetPasswordModalProps {
  children: React.ReactNode;
}
interface ResetPassword{
    password: string,
    newPassword: string
}
export const ResetPasswordModal = ({ children }: ResetPasswordModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState<ResetPassword>({
    password: "",
    newPassword: "",
  });

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    const token=localStorage.getItem("jwtToken")
    console.log(token)
    console.log(password.newPassword)
    console.log(password.password)
        api.put("/user/change-password",password,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json" ,
                Authorization:`Bearer ${token}`}
        })
        .then((response)=>{
            if(response.status===HttpStatusCode.NoContent){
                toast.success("Senha alterada com sucesso!")
                setIsOpen(false);
                setPassword({ password: "", newPassword: "" });
            }
        })
        .catch((err: AxiosError<ErrorResponse> )=>{
            const errors= err.response?.data.errors
            errors!.forEach(e => {
                toast.error(e)
            });
        });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
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