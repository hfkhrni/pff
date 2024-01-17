'use client';

import Messages from './messages';
import ChatInput from './chat-input';
import { trpc } from '@/app/_trpc/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
function ChatWrapper({ fileId }: { fileId: string }) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === 'SUCCESS' || data?.status === 'FAILED' ? false : 500,
    }
  );

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-background rounded-sm bg-secondary p-4">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="font-mono">LOADING</p>
        </div>
        <ChatInput disabled />
      </div>
    );
  if (data?.status === 'PROCESSING')
    return (
      <div className="relative flex h-80 min-h-full flex-col justify-between gap-2 divide-y divide-background rounded-sm bg-secondary p-4">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="font-mono">PROCESSING</p>
        </div>
        <ChatInput disabled />
      </div>
    );
  if (data?.status === 'FAILED')
    return (
      <div className="relative flex h-80 min-h-full flex-col justify-between gap-2 divide-y divide-background rounded-sm bg-secondary p-4">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="font-mono">FAILED</p>
          <p className="font-mono text-sm text-muted-foreground">
            number of pages higher than allowed
          </p>
          <Button
            className="mt-3 py-0 font-mono"
            asChild
          >
            <Link href={`/dashboard/`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              BACK
            </Link>
          </Button>
        </div>
        <ChatInput disabled />
      </div>
    );
  return (
    <div className="relative flex h-80 min-h-full flex-col justify-between gap-2 divide-y divide-background/70 rounded-sm bg-secondary p-4">
      <div className="mb-28 flex-1 flex-col justify-between">
        hi
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWrapper;
