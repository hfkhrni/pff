PFF lets you upload pdf files and ask an LLM (currently ChatGPT) questions in a chat interface about the pdf's materials. It's [live](https://pff-hazel.vercel.app/), you can make an account and started using it.

## Run Locally

clone the repo

```bash
git clone https://github.com/hfkhrni/pff.git
```
`cd` into the repo's folder and run `pnpm install`

run a deveopment server 

```bash
pnpm run dev
```

rename the `.env.example` file to `.env` after filling it out

pinecone requires the index name as a string and you'll need to put your index name in `src/app/api/message/route.ts` and `src/app/api/uploadthing/core.ts` where the index variable is declared
```typescript
  const pineconeIndex = pinecone.Index('index name here');
```

## Other Filetypes

you can use this for files other than pdfs, there are 3 parts to this:

1. change the filetype allowed in uploadthing's endpoint in `src/app/api/uploadthing/core.ts`
```typescript
export const ourFileRouter = {
  pdfUploader: f({ "file-type-here": { maxFileSize: '<number>MB' } })
}
```
2. pdfs are rendered by the `<PDFRenderer />` component inside `<ChatWrapper />`, you'll need to create a component that views your file next to the chat if you need that.
3. configure the prompt in `src/app/api/message/route.ts` to suite the filetype you're querying

## Replace ChatGPT

there's only one endpoint which calls ChatGPT's API with the embeddings and gets back a streaming response. this endpoint is `src/app/api/message/route.ts`.

you will need to get embeddings from the model you're using in replacement of:
```typescript
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
```
and where you call the api:
```typescript
  const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: []
})
```

