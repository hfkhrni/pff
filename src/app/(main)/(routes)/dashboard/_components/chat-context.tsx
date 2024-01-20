'use client';

import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useState } from 'react';

type StreamResponse = {
  message: string;
  addMessage: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};
export const chatContext = createContext<StreamResponse>({
  message: '',
  addMessage: () => {},
  handleInputChange: () => {},
  isLoading: false,
});

type Props = {
  fileId: string;
  children: ReactNode;
};
function ChatContextProvider({ fileId, children }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ fileId, message }),
      });
      if (!response.ok) {
        throw new Error('failed to send message');
      }
      return response.body;
    },
  });

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }
  function addMessage() {
    sendMessage({ message });
  }

  return (
    <chatContext.Provider
      value={{
        message,
        addMessage,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

export default ChatContextProvider;
