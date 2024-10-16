import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import AlmostFinished from "@/public/work-is-almost-over-happy.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

const GrantIdRoute = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Você está quase lá!</CardTitle>
          <CardDescription>
            Agora precisamos conectar seu calendário à sua conta.
          </CardDescription>
          <Image
            src={AlmostFinished}
            alt="Quase Concluído"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Conectar Calendário à Conta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrantIdRoute;
