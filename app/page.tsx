"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Message = {
  id: number;
  username: string;
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const username = "Guest" + Math.floor(Math.random() * 1000);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Message,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at");

    if (data) {
      setMessages(data);
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;

    await supabase
      .from("messages")
      .insert({
        username,
        content: input,
      });

    setInput("");
  }

  return (
    <div className="flex h-screen bg-[#313338] text-white">

      {/* Left bar */}
      <div className="w-[72px] bg-[#1e1f22]"></div>

      {/* Channels */}
      <div className="w-60 bg-[#2b2d31] p-4">
        <h1 className="font-bold text-xl">
          Desk's Server
        </h1>

        <div className="mt-4">
          # general
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-1">

        <div className="h-14 border-b border-[#1f2023] px-5 flex items-center font-bold">
          # general
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {messages.map((msg) => (
            <div key={msg.id}>
              <b>{msg.username}</b>
              <div>{msg.content}</div>
            </div>
          ))}

        </div>

        <div className="p-4">

          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                sendMessage();
              }
            }}
            placeholder="Message #general"
            className="w-full bg-[#383a40] p-4 rounded-lg outline-none"
          />

        </div>

      </div>

      {/* Members */}
      <div className="w-60 bg-[#2b2d31] p-4">
        Members
      </div>

    </div>
  );
}