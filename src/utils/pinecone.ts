import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const pineConeIndex = pc.index(process.env.PINECONE_INDEX_NAME!);

export default pc;
