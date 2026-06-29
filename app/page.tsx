"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { user: "User1", text: "Hello" },
    { user: "User2", text: "Hey" },
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        user: "You",
        text: input,
      },
    ]);

    setInput("");
  }

  return (
    <div className="flex h-screen bg-[#313338] text-white overflow-hidden">

      {/* Server Sidebar */}
      <div className="w-[72px] bg-[#1e1f22] p-3 flex flex-col items-center gap-3">

        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center font-bold cursor-pointer hover:rounded-xl transition-all">
          M
        </div>

        <div className="w-12 h-12 bg-[#313338] rounded-full hover:bg-[#5865f2] hover:rounded-xl transition-all cursor-pointer"></div>

        <div className="w-12 h-12 bg-[#313338] rounded-full hover:bg-[#5865f2] hover:rounded-xl transition-all cursor-pointer"></div>

      </div>

      {/* Channel Sidebar */}
      <div className="w-60 bg-[#2b2d31] flex flex-col">

        <div className="p-4 font-bold text-xl border-b border-[#1f2023]">
          My Server
        </div>

        <div className="p-2">

          <div className="bg-[#404249] rounded p-2 cursor-pointer mb-1">
            # general
          </div>

          <div className="hover:bg-[#404249] rounded p-2 cursor-pointer mb-1">
            # games
          </div>

          <div className="hover:bg-[#404249] rounded p-2 cursor-pointer">
            # memes
          </div>

        </div>

      </div>

      {/* Main Chat */}
      <div className="flex flex-col flex-1">

        <div className="h-14 border-b border-[#1f2023] px-5 flex items-center font-bold">
          # general
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <div className="space-y-6">

            {messages.map((msg,index)=>(
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center font-bold">
                  {msg.user[0]}
                </div>

                <div>
                  <div className="font-semibold">
                    {msg.user}
                  </div>

                  <div className="text-gray-300">
                    {msg.text}
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="p-5">

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

        <div className="font-bold mb-5">
          Members — 3
        </div>

        <div className="space-y-3">

          <div className="flex gap-2">
            🟢 User1
          </div>

          <div className="flex gap-2">
            🔵 User2
          </div>

          <div className="flex gap-2">
            🟣 You
          </div>

        </div>

      </div>

    </div>
  );
}