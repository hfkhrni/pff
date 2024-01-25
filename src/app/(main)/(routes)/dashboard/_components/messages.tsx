'use client';

import { trpc } from '@/app/_trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import Message from './message';
import { useContext, useEffect, useRef } from 'react';
import { chatContext } from './chat-context';
import { useIntersection } from '@mantine/hooks';

function Messages({ fileId }: { fileId: string }) {
  const { isLoading: isAIStreaming } = useContext(chatContext);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      { fileId, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    );
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);
  const messages = data?.pages.flatMap((page) => page.messages);
  const loadingMessages = {
    createdAt: new Date(),
    id: 'loading',
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">LOADING</span>
    ),
  };

  const combinedMessages = [
    ...(isAIStreaming ? [loadingMessages] : []),
    ...(messages ?? []),
  ];
  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-14rem)] flex-1 flex-col-reverse gap-4 overflow-y-scroll p-3">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, index) => {
          const isNextMsgUser =
            combinedMessages[index - 1]?.isUserMessage ===
            combinedMessages[index].isUserMessage;

          if (index === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMsgUser={isNextMsgUser}
                key={message.id}
              ></Message>
            );
          } else {
            return (
              <Message
                message={message}
                isNextMsgUser={isNextMsgUser}
                key={message.id}
              ></Message>
            );
          }
        })
      ) : isLoading ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-16 rounded-sm bg-background" />
          <Skeleton className="h-16 rounded-sm bg-background" />
          <Skeleton className="h-16 rounded-sm bg-background" />
          <Skeleton className="h-16 rounded-sm bg-background" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 font-mono">
          <p>ASK A QUESTION TO START</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
