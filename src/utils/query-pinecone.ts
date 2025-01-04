import { openai } from "./open-ai";
import { pineConeIndex } from "./pinecone";

export async function queryPinecone(queryText: string) {
  // Generate query embedding
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: queryText,
  });

  const queryEmbedding = response.data[0].embedding;

  // Query Pinecone
  const result = await pineConeIndex.query({
    vector: queryEmbedding,
    topK: 5, // Number of top results
    includeMetadata: true, // Return metadata with results
  });

  return result;
}
