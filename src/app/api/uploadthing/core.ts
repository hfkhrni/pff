import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/lib/pinecone';

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
      try {
        const response = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
        );
        console.log(response);
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        const pages = await loader.load();
        const noOfPages = pages.length;
        const pineconeIndex = pinecone.Index('pff');
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });
        await PineconeStore.fromDocuments(pages, embeddings, {
          pineconeIndex,
          namespace: createdFile.id,
        });
        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS',
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: 'FAILED',
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
