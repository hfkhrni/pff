'use client';

import { trpc } from '@/app/_trpc/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UploadStatus } from '@prisma/client';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

type File = {
  id: string;
  userId: string | null;
  name: string;
  uploadStatus: UploadStatus;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
};

function FileDropdown({ file }: { file: File }) {
  const [deleting, setDeleting] = useState<string | null>('null');
  const utils = trpc.useUtils();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setDeleting(id);
    },
    onSettled() {
      setDeleting(null);
    },
  });
  return (
    <div className="flex items-center justify-center gap-2">
      {deleting === file.id && <p className="text-xs">DELETING</p>}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            role="button"
            className="flex h-full w-6 justify-center rounded-sm opacity-100 group-hover:bg-background"
          >
            <MoreHorizontal className="h-4 w-4 text-primary hover:text-primary" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mr-2 w-20 bg-background"
          align="start"
          side="bottom"
          forceMount
        >
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation();
              deleteFile({ id: file.id });
            }}
            className="font-mono"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default FileDropdown;
