'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, Send, SendHorizonal } from 'lucide-react';

function ChatInput({ disabled }: { disabled?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <form className="mx-0 flex flex-row gap-0 md:mx-4 md:last:mb-2 lg:mx-0 lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full grow flex-col p-3">
            <div className="relative">
              <Textarea
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none rounded-[0.2rem] py-3 pr-12 font-mono text-sm"
                rows={1}
                maxRows={4}
                autoFocus
                placeholder="Eneter a question here..."
              />
              <Button className="absolute bottom-[5px] right-[8px] h-9 rounded-sm bg-secondary hover:bg-secondary/80">
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
