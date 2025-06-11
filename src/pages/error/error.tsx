import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
          <Card className="max-w-md w-full shadow-xl border-red-500 border-2">
            <CardHeader className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <CardTitle className="text-xl">Erro ao carregar página</CardTitle>
            </CardHeader>
    
            <CardContent className="space-y-4">
              <p className="text-gray-700">Ocorreu um problema inesperado ao tentar acessar esta página.</p>
              <Button variant="destructive" onClick={() => navigate("/")}>
                Voltar para o Início
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    
}

export default Error