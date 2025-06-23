import api from "@/services/api";
import { AxiosError, HttpStatusCode } from "axios";
import { useState } from "react";
import type { ErrorResponse } from "@/types/errorResponse";
import type { ResetPassword } from "@/types/changePassword";
import { toast } from "sonner";

const useUserchangePassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState<ResetPassword>({
      password: "",
      newPassword: "",
    });

    const handleChangePassword = async () => {
        const token = localStorage.getItem("jwtToken");
        try {
            const res = await api.put("/user/change-password", password, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === HttpStatusCode.NoContent) {
                setIsOpen(false);
                setPassword({ password: "", newPassword: "" });
                toast.success("Senha alterada com sucesso",{className:"bg-green-500 text-green-600"})
            }
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            const errors = error.response?.data.errors;
            if (errors && errors.length > 0) {
                toast.error(errors[0],{
                className:"bg-red-700 text-red-700"
                  });
            } else {
                toast.info("Erro ao alterar senha.");
            }
        }
    };

    return {
        isOpen,
        setIsOpen,
        password,
        setPassword,
        handleChangePassword
    };
};

export default useUserchangePassword;