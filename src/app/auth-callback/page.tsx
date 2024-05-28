"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);// Get configuration ID from local storage

  // Get configuration ID from local storage
  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  // Get auth status
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  // Redirect user to preview page if auth is successful, we are using a useEffect hook for 2 reasons:
  // 1. To check if the data is available, and if it is, we can redirect the user to the preview page while taking the configuration ID from the local storage.
  // 2. But most importantly, we cannot update a router while rendering the page. Ran into a bug where the router.push was not working as expected.
  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem("configurationId");
        router.push(`/configure/preview?id=${configId}`);
      }
    } else if (data !== undefined) {
      router.push('/');
    }
  }, [data, configId, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
};

export default Page;
