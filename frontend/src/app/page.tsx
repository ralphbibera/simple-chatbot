"use client";

import { guard } from "@/components/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/providers/auth-provider";
import { useContext, useEffect, useRef, useState } from "react";

function Home() {
  const context = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:6789");
    const wsCurrent = ws.current;

    wsCurrent.onopen = () => console.log("ws opened");
    wsCurrent.onclose = () => console.log("ws closed");

    wsCurrent.onmessage = (event) => {
      setMessageHistory((prev) => [...prev, event.data]);
    };

    return () => {
      wsCurrent.close();
    };
  }, []);

  const sendMessage = () => {
    const message = `${context.username}: ${value}`;
    ws.current?.send(message);
    setValue("");
  };

  return (
    <main>
      <ul>
        {messageHistory.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      <Button onClick={sendMessage}>Send</Button>
    </main>
  );
}

export default guard(Home);
