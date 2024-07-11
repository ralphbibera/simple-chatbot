"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { username, setUsername } = useContext(AuthContext);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main className="flex h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="username">
            Username
            <Input
              className="mt-2"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Label>
          <Button onClick={handleClick}>Login</Button>
        </CardContent>
      </Card>
    </main>
  );
}
