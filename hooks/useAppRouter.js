"use client";

import { useRouter } from "next/navigation";

export function useAppRouter() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const goBack = () => {
    router.back();
  };

  const refreshPage = () => {
    router.refresh();
  };

  return {
    navigateTo,
    goBack,
    refreshPage,
  };
}
