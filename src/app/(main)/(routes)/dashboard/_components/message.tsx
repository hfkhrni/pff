import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { RefObject, forwardRef } from 'react';

type Message =
  | {
      id: string;
      createdAt: string;
      text: string;
      isUserMessage: boolean;
    }
  | {
      createdAt: Date;
      id: string;
      isUserMessage: boolean;
      text: JSX.Element;
    };
type MessageProps = {
  message: Message;
  isNextMsgUser: boolean;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMsgUser }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-end', {
          'justify-end': message.isUserMessage,
        })}
      >
        {/* <div
        className={cn(
          'relative flex h-4 w-4 aspect-square items-center justify-center rounded-sm',
          {
            'order-1 items-end just': !message.isUserMessage,
            'order-2 items-start': message.isUserMessage,
            invisible: isNextMsgUser,
          }
        )}
      >
        {message.isUserMessage ? <MoveLeft /> : <MoveRight />}
      </div> */}

        <div
          className={cn('flex flex-col space-y-2 max-w-md mx-2', {
            'order-1 items-end': message.isUserMessage,
            'order-2 items-start': !message.isUserMessage,
          })}
        >
          <div
            className={cn('p-2 rounded-sm inline-block font-mono font-thin', {
              'bg-background text-primary': message.isUserMessage,
              'bg-primary text-background': !message.isUserMessage,
            })}
          >
            {message.text}
          </div>
        </div>
      </div>
    );
  }
);
Message.displayName = 'Message';
export default Message;
