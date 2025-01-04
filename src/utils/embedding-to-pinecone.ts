import { pineConeIndex } from "./pinecone";

export const embeddingToPinecone = async (
  embedding: number[],
  chunk: string,
  index: number,
  fileName: string
) => {
  const metadata = {
    chunkIndex: index,
    text: chunk,
    source: fileName,
  };
  await pineConeIndex.upsert([
    {
      id: `chunk-${index}`, // Unique ID for the chunk
      values: embedding, // The embedding vector
      metadata, // Additional metadata
    },
  ]);
  console.log(`Chunk ${index} saved to Pinecone.`);
};
