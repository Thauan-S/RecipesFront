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
import api from "@/services/api"
import { AxiosError, HttpStatusCode } from "axios"
import type { ErrorResponse } from "@/types/errorResponse"


export function UserRegisterModal({ children }: { children: React.ReactNode }) {
  const[user,setUser]=useState<User>({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(false)
    setMessage([])
    console.log(loading)
  api.post("/user",user, {
    
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      .then((response)=>{
        if(response.status===HttpStatusCode.Created)
        setMessage(["Usuário registrado com sucesso!"])
      setLoading(false)
      })
        .catch((err: AxiosError<ErrorResponse>)=> {
          const errors= err.response?.data.errors
          setMessage(errors as string [])
          setLoading(false)
        })
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </Button>
          {message &&
           message.map((m,index)=><p key={index} className="text-sm text-center text-muted-foreground text-red-500">{m}</p>)}
        </form>
      </DialogContent>
    </Dialog>
  )
}
