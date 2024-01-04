'use client';

import { trpc } from '@/app/(main)/_trpc/client';
import UploadButton from './upload-button';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, Trash } from 'lucide-react';

import Link from 'next/link';
import { useState } from 'react';
import FilesList from './files-list';

function Dashboard() {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  return (
    <>
      <main className="mx-auto max-w-screen-xl p-4">
        <div className="mt-8 flex flex-row items-start justify-between gap-4 border-b border-primary pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="font-mono">FILES</h1>
          <UploadButton />
        </div>
        {files && files.length !== 0 ? (
          <FilesList files={files} />
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
