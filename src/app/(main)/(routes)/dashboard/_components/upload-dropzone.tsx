'use client';

import { Progress } from '@/components/ui/progress';
import { File } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';

import { useUploadThing } from '@/lib/uploadthing';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';

function UploadDropzone() {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const { startUpload } = useUploadThing('pdfUploader');
  const { toast } = useToast();

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      setIsUploading(false);
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  function simulateProgress() {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  }

  async function handleOnDrop(acceptedFile: File[]) {
    setIsUploading(true);
    const interval = simulateProgress();
    const res = await startUpload(acceptedFile);

    if (!res) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });
    }

    const [file] = res ? res : [];
    const key = file?.key;
    if (!key) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });
    }

    clearInterval(interval);
    startPolling({ key });
    setProgress(100);
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={handleOnDrop}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="mt-6 h-48 rounded-sm border border-dashed border-muted-foreground"
        >
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-sm bg-secondary/50 hover:bg-secondary"
            >
              <div className="mt-2 flex flex-col items-center justify-center py-6">
                <p className="mb-2 font-mono text-sm">
                  CLICK OR DRAG TO UPLOAD
                </p>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  PDF (MAX. 4MB)
                </p>
              </div>
              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-[calc(100vw-6rem)] items-center divide-x divide-dashed divide-muted-foreground overflow-hidden rounded-sm bg-background outline-dashed outline-[1px] outline-muted-foreground sm:max-w-xs">
                  <div className="grid h-full place-items-center p-2">
                    <File className="h-4 w-4 text-muted-foreground"></File>
                  </div>
                  <div className="h-full truncate px-2 pt-1.5 text-sm text-primary">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}
              {isUploading && progress < 100 && (
                <div className="mx-auto my-4 w-full max-w-xs">
                  <Progress
                    value={progress}
                    className="h-1 w-full bg-background"
                  />
                </div>
              )}
              {progress === 100 && (
                <p className="my-4 text-center font-mono text-sm">
                  REDIRECTING
                </p>
              )}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default UploadDropzone;
