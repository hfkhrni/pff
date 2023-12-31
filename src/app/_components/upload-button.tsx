'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

function UploadButton() {
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
        <Button className="h-8 rounded-sm bg-secondary font-mono text-primary hover:bg-primary hover:text-primary-foreground">
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none font-mono sm:max-w-[425px]">
        hi
      </DialogContent>
    </Dialog>
    //   <div>
    //     <Button
    //       variant="default"
    //       className="h-8 rounded-sm font-mono"
    //     >
    //       Upload
    //     </Button>
    //   </div>
  );
}

export default UploadButton;
