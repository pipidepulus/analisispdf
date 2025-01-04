export const generatePrompt = (
  context: string,
  query: string,
  companyName: string = "Optisol"
) => {
  const prompt = `Given the following context, please provide a brief yet informative answer to the user's query related to company policies:

            Context:
            ${context}

            Question: ${query}

            Answer: (Provide a summarized but comprehensive response)`;

  return [
    {
      role: "system",
      content: `You are an assistant for ${companyName} that provides concise, summarized answers based on the context provided while ensuring the response is comprehensive and clear.`,
    },
    { role: "user", content: prompt },
  ];
};
