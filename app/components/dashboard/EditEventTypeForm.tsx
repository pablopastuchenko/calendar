"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { EditEventTypeAction } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { useState } from "react";

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export function EditEventTypeForm({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
}: iAppProps) {
  const [lastResult, action] = useFormState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    // Sincroniza o resultado da última submissão
    lastResult,

    // Reutiliza a lógica de validação no cliente
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },

    // Valida o formulário no evento de perda de foco
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [activePlatform, setActivePlatform] = useState<Platform>(
    callProvider as Platform
  );

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar novo tipo de compromisso</CardTitle>
          <CardDescription>
            Crie um novo tipo de compromisso que permita às pessoas agendar horários.
          </CardDescription>
        </CardHeader>
        <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Título</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="Reunião de 30 min"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2 ">
              <Label>Url</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  pabloteste.com/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={url}
                  name={fields.url.name}
                  placeholder="usuario-exemplo-1"
                  className="rounded-l-none"
                />
              </div>

              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Descrição</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="Reunião de 30 min"
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Duração</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duração</SelectLabel>
                    <SelectItem value="15">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Min</SelectItem>
                    <SelectItem value="60">1 Hora</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <Label>Provedor de Videochamada</Label>
              <ButtonGroup className="w-full">
                <Button
                  onClick={() => togglePlatform("Zoom Meeting")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>
                <Button
                  onClick={() => togglePlatform("Google Meet")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  type="button"
                  className="w-full"
                  onClick={() => togglePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button asChild variant="secondary">
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <SubmitButton text="Editar Tipo de Evento" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
