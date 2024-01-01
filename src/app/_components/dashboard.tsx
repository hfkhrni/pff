'use client';

import { trpc } from '@/app/_trpc/client';
import UploadButton from './upload-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

function Dashboard() {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  return (
    <>
      <main className="mx-auto min-w-96 max-w-screen-xl p-4">
        <div className="mt-8 flex flex-row items-start justify-between gap-4 border-b border-primary pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="font-mono">FILES</h1>
          {/* <p className="text-wyw-200">hi</p> */}

          <UploadButton />
        </div>
        {files && files.length !== 0 ? (
          <ul className="mt-8">
            {files
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((file) => (
                <li
                  key={file.id}
                  className="group mt-2 flex items-center justify-between rounded-sm bg-secondary p-4 font-mono hover:bg-primary hover:text-background md:py-2"
                >
                  <Link
                    href={`/dashboard/${file.id}`}
                    className="w-full"
                  >
                    <h3 className="truncate">{file.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(event) => event.stopPropagation()}
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
                            onClick={() => {}}
                            className="font-mono"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : isLoading ? (
          <>
            <Skeleton className="mt-8 flex h-14 items-center justify-between rounded-sm bg-secondary p-4 font-mono sm:h-10 md:py-2" />
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center gap-2 font-mono">
            NO FILES! YOU CAN
            <UploadButton
              buttonVariant="outline"
              buttonLabel="LOAD A PDF"
              buttonClassName="font-mono underline bg-none border-none hover:bg-secondary h-6 text-base rounded-xs"
            ></UploadButton>
            AND TALK TO IT
          </div>
        )}
      </main>
    </>
  );
}

export default Dashboard;
