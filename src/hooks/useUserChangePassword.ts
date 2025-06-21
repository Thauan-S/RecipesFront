import api from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import type { ErrorResponse } from "@/types/errorResponse";
interface ResetPassword{
    password: string,
    newPassword: string
}
const useUserchangePassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState<ResetPassword>({
      password: "",
      newPassword: "",
    });
    const token = localStorage.getItem("jwtToken");
    const fetchRecipes = async () => {
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

    return { 
        isOpen,

    };
};

export default useUserchangePassword;