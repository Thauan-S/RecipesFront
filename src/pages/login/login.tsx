import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
import type { GoogleUser } from "@/types/googleUser";
import { UserRegisterModal } from "./components/RegisterCardModal";


const Login = () => {
  const [user,setUser] = useState<GoogleUser>({email: "", password: ""});
  const handleLogin =  async () => {
    const returnUrl = encodeURIComponent(import.meta.env.VITE_Return_URL);
    console.log(import.meta.env.VITE_Return_URL)
    window.location.href = `${import.meta.env.VITE_BASE_URL}/login/google?returnUrl=${returnUrl}`;
  }
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle>Entre com sua conta</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">
                {" "}
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
              onChange={(e) => setUser({...user, email: e.target.value})}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="password">
                  <Lock className="w-4 h-4" /> Senha 
                </Label>
              </div>
              <Input id="password" type="password" required onChange={(e) => setUser({...user, password: e.target.value})}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button onClick={handleLogin} variant="outline" className="w-full">
        <div className="border-1 border-gray-300 rounded-full p-2 bg-white">
            <FcGoogle style={{height: "13px", width: "13px"}} className="w-4 h-3" />
          </div>
          Google
        </Button>
        <UserRegisterModal>
          <Button variant="outline" className="w-full">
            Crie sua conta
          </Button>
        </UserRegisterModal>
      </CardFooter>
    </Card>
  );
};

export default Login;
