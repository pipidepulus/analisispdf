import { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";

export const createContext = (query: QueryResponse<RecordMetadata>) => {
  let context = "";
  query.matches.forEach((result, index) => {
    if (result.metadata) {
      context += `Chunk ${index + 1}: ${result.metadata.text}\n\n`;
    }
  });

  return context;
};
