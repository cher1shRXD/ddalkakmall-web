"use client";

import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const AiChat = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const canSend = input.trim().length > 0;

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex-1" />

      <div className="p-6 w-full max-w-xl">
        <div className="flex items-end gap-3 bg-surface-2 border border-border rounded-2xl px-4 py-3 focus-within:border-border-focus transition-colors">
          <div className="min-h-8 flex-1 flex items-center">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="딸깍봇과 함께 브랜드 아이덴티티를 만들어보세요."
              rows={1}
              className="w-full bg-transparent resize-none outline-none text-foreground placeholder:text-foreground-dim text-sm leading-6 max-h-40 overflow-y-auto"
            />
          </div>
          <button
            disabled={!canSend}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-foreground-inverse disabled:opacity-30 transition-opacity cursor-pointer disabled:cursor-default"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
