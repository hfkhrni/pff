'use client';

import Link from 'next/link';
import FileDropdown from './file-dropdown';
import { UploadStatus } from '@prisma/client';

type Files = {
  id: string;
  userId: string | null;
  name: string;
  uploadStatus: UploadStatus;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
}[];

function FilesList({ files }: { files: Files }) {
  return (
    <ul className="mt-8">
      {files
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
            <FileDropdown file={file} />
          </li>
        ))}
    </ul>
  );
}

export default FilesList;
