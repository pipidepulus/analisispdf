import { createContext } from "@/utils/create-context";
import { generatePrompt } from "@/utils/generate-chat-answer";
import { queryPinecone } from "@/utils/query-pinecone";
import { NextRequest, NextResponse } from "next/server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: NextRequest) {
  try {
    // Example: Fetch or generate some data

    const { messages } = await req.json();

    console.log("Received data:", messages);

    const query = messages[messages.length - 1].content;

    if (!query) {
      return NextResponse.json(
        { error: "No query provided." },
        {
          status: 400,
        }
      );
    }
    console.log("Query:", query);

    const pineConeResult = await queryPinecone(query);

    console.log("Pinecone result:", pineConeResult);

    const context = await createContext(pineConeResult);
    const prompt = generatePrompt(context, query);
    console.log("Prompt:", prompt);

    if (prompt.length > 0) {
      const systemContent = prompt[0].content;

      const result = await streamText({
        system: systemContent,
        temperature: 0.2,
        model: openai.chat("gpt-4o-mini"),
        maxRetries: 8,
        prompt: prompt[1].content,
      });
      return result.toDataStreamResponse();
    } else {
      throw new Error(
        "Unexpected server response structure: 'prompt' array is missing or empty."
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
