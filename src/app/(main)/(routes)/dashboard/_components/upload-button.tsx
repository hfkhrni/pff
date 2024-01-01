'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

function UploadButton({
  buttonVariant,
  buttonLabel,
  buttonClassName,
}: {
  buttonLabel?: string;
  buttonVariant?: 'default' | 'ghost' | 'outline' | 'destructive' | 'secondary';
  buttonClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={toggle}
    >
      <DialogTrigger
        asChild
        onClick={toggle}
      >
        {buttonVariant ? (
          <Button
            variant={buttonVariant}
            className={cn(buttonClassName)}
          >
            {buttonLabel ? buttonLabel : 'Upload'}
          </Button>
        ) : (
          <Button
            variant={buttonVariant}
            className="h-8 rounded-sm bg-secondary font-mono text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {buttonLabel ? buttonLabel : 'Upload'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="rounded-none font-mono sm:max-w-[425px]">
        hi
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
