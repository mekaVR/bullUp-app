import { ThemedView } from "@/components/ThemedView";
import { PropsWithChildren } from "react";

type ScreenLayoutProps = PropsWithChildren;

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <ThemedView className={"flex-1 justify-center items-center px-5"}>
      {children}
    </ThemedView>
  );
}
