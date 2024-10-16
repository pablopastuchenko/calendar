"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardContent className="p-6 flex flex-col w-full items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mt-4">
            Este evento está agendado
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Enviamos um convite de calendário para você e os outros participantes com todos os detalhes.
          </p>

          <Separator className="my-5" />

          <div className="grid grid-cols-3 w-full self-start gap-y-4">
            <div className="col-span-1">
              <h1 className="font-medium">O que</h1>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Oficina de Design</p>
            </div>

            <div className="col-span-1">
              <h1 className="font-medium">Quando</h1>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">10:00 - 12:00</p>
            </div>
            <div className="col-span-1">
              <h1 className="font-medium">Onde</h1>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Online</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Fechar esta página</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
