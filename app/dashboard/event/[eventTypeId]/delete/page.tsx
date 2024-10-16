import { DeleteEventTypeAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const DeleteEventType = ({ params }: { params: { eventTypeId: string } }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Excluir tipo de evento</CardTitle>
          <CardDescription>
          Tem certeza de que deseja excluir este tipo de evento?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <Button variant="destructive">Delete</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteEventType;
