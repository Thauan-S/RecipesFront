import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"
import { useRegisterUser } from "@/hooks/useRegisterUser" 


export function UserRegisterModal({ children }: { children: React.ReactNode }) {
  const[user,setUser]=useState<User>({
    name: "",
    email: "",
    password: "",
  })
  const { registerUser, isLoading } = useRegisterUser();
  const [message, setMessage] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage([])
    registerUser(user, setMessage)
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Crie sua conta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={user.name} onChange={(e) => setUser({...user,name:e.target.value})} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} required />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
          {message &&
           message.map((m,index)=><p key={index} className="text-sm text-center text-muted-foreground text-green-500">{m}</p>)}
        </form>
      </DialogContent>
    </Dialog>
  )
}
