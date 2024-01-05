import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto max-w-screen-xl', className)}>{children}</div>
  );
}

export default MaxWidthWrapper;
