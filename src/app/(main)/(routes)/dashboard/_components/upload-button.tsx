'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import UploadDropzone from './upload-dropzone';

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
      <DialogContent className="mx-auto w-[95vw] rounded-sm font-mono sm:max-w-[25vw]">
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
