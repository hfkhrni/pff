import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error('UNAUTHORIZED');
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          userId: metadata.userId,
          uploadStatus: 'PROCESSING',
        },
      });
      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
