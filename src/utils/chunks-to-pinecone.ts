import { embeddingToPinecone } from "./embedding-to-pinecone";
import { openai } from "./open-ai";

export const chunksToPineCone = async (chunks: string[], fileName: string) => {
  for (const [index, chunk] of chunks.entries()) {
    // Generate OpenAI embedding for the chunk
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002", // Ada embedding model
      input: chunk,
    });
    const embedding = response.data[0].embedding;
    console.log("Embedding: " + index, embedding.length);
    await embeddingToPinecone(embedding, chunk, index, fileName);
  }
};
