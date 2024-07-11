"use client";

import { AuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const guard = (Component: any) => {
  return function Guard(props: any) {
    const context = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (context.username === "") {
        return router.replace("/login");
      }
    }, []);

    return <Component {...props} />;
  };
};
export { guard };
