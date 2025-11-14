import { Toast, ToastDescription } from "@/components/ui/toast";

interface ToastComponentProps {
  id: string;
  message: string;
  action: "error" | "warning" | "success" | "info" | "muted" | undefined;
  variant: "solid" | "outline" | undefined;
}

export default function ToastComponent({
  id,
  action,
  variant,
  message,
}: ToastComponentProps) {
  const uniqueToastId = "toast-" + id;
  return (
    <Toast nativeID={uniqueToastId} action={action} variant={variant}>
      <ToastDescription>{message}</ToastDescription>
    </Toast>
  );
}
