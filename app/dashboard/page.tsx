import { Button } from "@/components/ui/button"; // Importa o componente de botão
import Link from "next/link"; // Importa o componente de link do Next.js
import { notFound } from "next/navigation"; // Importa a função para lidar com erros de "não encontrado"
import React from "react"; // Importa React
import prisma from "../lib/db"; // Importa a instância do Prisma para interagir com o banco de dados
import { requireUser } from "../lib/hooks"; // Importa um hook para garantir que o usuário esteja autenticado
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react"; // Importa ícones do Lucide React

import { EmptyState } from "../components/dashboard/EmptyState"; // Importa o componente de estado vazio

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Importa componentes do menu suspenso
import { MenuActiveSwitcher } from "../components/dashboard/EventTypeSwitcher"; // Importa o componente para alternar o estado ativo
import { CopyLinkMenuItem } from "../components/dashboard/CopyLinkMenuItem"; // Importa o componente para copiar o link

// Função assíncrona para obter dados do usuário com base no ID
async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
        orderBy: {
          createdAt: "desc", // Ordena os eventos por data de criação
        },
      },
      username: true, // Seleciona o nome de usuário
    },
  });

  // Se não encontrar dados, retorna erro 404
  if (!data) {
    return notFound();
  }

  return data; // Retorna os dados encontrados
}

// Componente principal da página do dashboard
const DashbaordPage = async () => {
  const session = await requireUser(); // Verifica se o usuário está autenticado
  const data = await getData(session.user?.id as string); // Obtém dados do usuário

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="sm:grid gap-1 hidden">
          <h1 className="font-heading text-3xl md:text-4xl">Tipos de Eventos</h1>
          <p className="text-lg text-muted-foreground">
            Crie e gerencie seus tipos de eventos.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Criar Novo Evento</Link>
        </Button>
      </div>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="Você não tem Tipos de Eventos"
          description="Você pode criar seu primeiro tipo de evento clicando no botão abaixo."
          buttonText="Adicionar Tipo de Evento"
          href="/dashboard/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.EventType.map((item) => (
            <div
              className="overflow-hidden shadow rounded-lg border relative"
              key={item.id}
            >
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20" align="end">
                    <DropdownMenuLabel>Evento</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/${data.username}/${item.url}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Visualizar</span>
                        </Link>
                      </DropdownMenuItem>
                      <CopyLinkMenuItem
                        meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`}
                      />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/event/${item.id}`}>
                          <Pen className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/event/${item.id}/delete`}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link href={`/dashboard/event/${item.id}`}>
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium truncate ">
                          Reunião de {item.duration} Minutos
                        </dt>
                        <dd>
                          <div className="text-lg font-medium ">
                            {item.title}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="bg-muted dark:bg-gray-900 px-5 py-3 flex justify-between items-center">
                <MenuActiveSwitcher
                  initialChecked={item.active}
                  eventTypeId={item.id}
                />

                <Link href={`/dashboard/event/${item.id}`}>
                  <Button className="">Editar Evento</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashbaordPage; // Exporta o componente
