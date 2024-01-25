'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, Send, SendHorizonal } from 'lucide-react';
import { useContext, useRef } from 'react';
import { chatContext } from './chat-context';

function ChatInput({ disabled }: { disabled?: boolean }) {
  const { addMessage, handleInputChange, message, isLoading } =
    useContext(chatContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className=" absolute bottom-0 left-0 w-full bg-secondary">
      <form className="mx-0 flex flex-row gap-0 md:mx-4 md:last:mb-2 lg:mx-0 lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full grow flex-col p-3">
            <div className="relative">
              <Textarea
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!message) return;
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                onChange={handleInputChange}
                value={message}
                ref={textareaRef}
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none rounded-[0.2rem] py-3 pr-12 font-mono text-sm"
                rows={1}
                maxRows={4}
                autoFocus
                placeholder="Eneter a question here..."
              />
              <Button
                disabled={isLoading || disabled}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  if (!message) return;
                  addMessage();
                  textareaRef.current?.focus();
                }}
                className="absolute bottom-[5px] right-[8px] h-9 rounded-sm bg-secondary hover:bg-secondary/80"
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
