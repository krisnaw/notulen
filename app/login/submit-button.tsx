"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import {Button} from "@/components/ui/button";

type Props = ComponentProps<"button"> & {
  buttonVariant?: "outline" | null;
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, buttonVariant, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" aria-disabled={pending} variant={buttonVariant}>
      {isPending ? pendingText : children}
    </Button>
  );
}
