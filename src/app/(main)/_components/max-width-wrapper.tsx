import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn('', className)}>{children}</div>;
}

export default MaxWidthWrapper;
