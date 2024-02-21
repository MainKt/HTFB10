"use client";

import { useChat } from "ai/react";
import { SendIcon } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="overflow-auto flex flex-col w-full max-w-md pb-12 mx-auto stretch">
      {messages.map((message) => (
        <article
          key={message.id}
        >
          <header>
            <h2>{`${message.role === "user" ? "You" : "Bot"}`}</h2>
          </header>
          {message.content}
          <br />
          <br />
        </article>
      ))}

      <form onSubmit={handleSubmit}>
        <fieldset role="group"
          className="fixed bottom-0 w-full max-w-md mb-8 "
        >
          <input value={input} placeholder="Say something..." onChange={handleInputChange} />
          <button type="submit" className="bg-blue"><SendIcon /></button>
        </fieldset>
      </form>
    </div>
  );
}