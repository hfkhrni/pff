import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
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
      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
