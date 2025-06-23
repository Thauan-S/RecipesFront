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
import useUserchangePassword from "@/hooks/useUserChangePassword";



interface ResetPasswordModalProps {
  children: React.ReactNode;
}

export const ResetPasswordModal = ({ children }: ResetPasswordModalProps) => {
  const{isOpen,setIsOpen,password,setPassword,handleChangePassword}=useUserchangePassword()



  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
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
          <Button onClick={handleChangePassword} className="w-full">
            Alterar Senha
          </Button>
        </form>
       
      </DialogContent>
    </Dialog>
    </>
  );
}; 