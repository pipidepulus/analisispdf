
# Company HR Chatbot

This project enables employees to ask questions about company policies, such as Vision, Mission, Values, Code of Conduct, Attendance policies, Leave management, and more. The chat interface delivers quick, reliable answers based on the company policy database, empowering employees with easy access to important HR information anytime.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Vercel AI SDK**: A tool for integrating AI-powered features into the application.
- **Pinecone**: A vector database for storing and querying policy information for fast, relevant responses.
- **OpenAI**: Provides natural language understanding and generation capabilities.

## Features

- Employee-driven Q&A interface to retrieve company policy information.
- Easy access to policies like Vision, Mission, Values, Attendance, Leave management, etc.
- AI-powered responses to help employees understand company guidelines.
- Integration with Pinecone for fast, reliable vector searches on the policy database.

## Setup

### Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Yarn](https://yarnpkg.com/) (optional, but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add the following keys:

   ```env
   PINECONE_API_KEY=<your-pinecone-api-key>
   PINECONE_INDEX_NAME=<your-pinecone-index-name>
   OPENAI_API_KEY=<your-openai-api-key>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run the application locally:

   ```bash
   npm run dev
   ```

   The app should now be running at `http://localhost:3000`.

## Usage

- After setting up the application, you can ask the chatbot about various company policies such as Vision, Mission, Values, Attendance, Leave management, and more.
- The AI will retrieve relevant responses based on the policies stored in Pinecone, leveraging OpenAI's language capabilities for answering questions.

## Deployment

This application can be deployed to Vercel or any other platform of your choice. If you're using Vercel, simply push your code to GitHub and connect the repository to Vercel. The environment variables should be added to Vercel's project settings.

## License

This project is licensed under the MIT License.

---

Let me know if you need further modifications!