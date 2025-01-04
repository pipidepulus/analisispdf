import { TokenTextSplitter } from "@langchain/textsplitters";

export const textToChunks = (text: string) => {
  const splitter = new TokenTextSplitter({
    chunkSize: 512, // Adjusted chunk size for better focus
    chunkOverlap: 64, // Reduced overlap unless required
  });
  const chunks = splitter.splitText(text);

  return chunks;
};
