import { db } from '@/db';
import { pinecone } from '@/lib/pinecone';
import { MessageValidator } from '@/lib/validators/message-validator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const { fileId, message } = MessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  if (!file) return new Response('Not found', { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  });

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const pineconeIndex = pinecone.Index('pff');
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: fileId,
  });

  const results = await vectorStore.similaritySearch(message, 4);

  const prevMsgs = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 10,
  });

  const fmtPrevMsgs = prevMsgs.map((msg) => ({
    role: msg.isUserMessage ? 'user' : 'assistant',
    content: msg.text,
  }));

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
      
\n----------------\n

PREVIOUS CONVERSATION:
${fmtPrevMsgs.map((message) => {
  if (message.role === 'user') return `User: ${message.content}\n`;
  return `Assistant: ${message.content}\n`;
})}

\n----------------\n

CONTEXT:
${results.map((r) => r.pageContent).join('\n\n')}

USER INPUT: ${message}`,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.message.create({
        data: {
          userId,
          fileId,
          text: completion,
          isUserMessage: false,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
