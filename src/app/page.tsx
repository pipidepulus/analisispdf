"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Input } from "@/components/input";
import { Message } from "ai";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown, { Options } from "react-markdown";
import { LoadingIcon } from "@/components/icons";
import { cn } from "@/utils/utils";
import { toast } from "sonner";
import { useLimitRestriction } from "@/utils/limt-restrcition-hook";

export default function Home() {
  const [toolCall, setToolCall] = useState<string>();
  const { incrementTotalRequests, totalRequests } = useLimitRestriction();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 4,
      onToolCall({ toolCall }) {
        setToolCall(toolCall.toolName);
      },
      onError: () => {
        toast.error("You've been rate limited, please try again later!");
      },
    });

  const currentToolCall = useMemo(() => {
    const tools = messages?.slice(-1)[0]?.toolInvocations;
    if (tools && toolCall === tools[0].toolName) {
      return tools[0].toolName;
    } else {
      return undefined;
    }
  }, [toolCall, messages]);

  const awaitingResponse = useMemo(() => {
    if (
      isLoading &&
      currentToolCall === undefined &&
      messages.slice(-1)[0].role === "user"
    ) {
      return true;
    } else {
      return false;
    }
  }, [isLoading, currentToolCall, messages]);

  const userQuery: Message | undefined = messages
    .filter((m) => m.role === "user")
    .slice(-1)[0];

  const lastAssistantMessage: Message | undefined = messages
    .filter((m) => m.role !== "user")
    .slice(-1)[0];

  const isRateLimited = totalRequests >= 5;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isRateLimited) return toast.error("You've been rate limited, please try again later!");
    incrementTotalRequests();
    handleSubmit(e);
  }

  // Nuevo estado para indicar si se ha cargado un archivo
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  console.log("Home - isFileUploaded:", isFileUploaded); // <-- Agregamos console.log

  return (
    <div className="flex justify-center items-start sm:pt-16 min-h-screen w-full dark:bg-neutral-900 px-4 md:px-0 py-4">
      <div className="flex flex-col items-center w-full max-w-[500px]">
        {/* Interfaz de carga de archivos (siempre visible) */}
        <div className='px-12 my-12'>
          <div>
            <FilePond
              server={{
                process: '/api/upload',
                fetch: null,
                revert: null,
              }}
              acceptedFileTypes={['application/pdf']}
              allowMultiple={false}
              maxFiles={1}
              labelIdle="Drag & Drop your files here or click to select files"
              labelFileWaitingForSize="Waiting for file size"
              instantUpload={false}
              allowRevert={false}
              onaddfile={(err: any, fileItem: any) => { // Usamos el evento onaddfile
                console.log("onaddfile - Inicio"); // <-- Agregamos console.log
                if (err) {
                  console.error("onaddfile - Error al cargar el archivo:", err);
                  return;
                }
                setIsFileUploaded(true);
                console.log("onaddfile - Archivo cargado correctamente! setIsFileUploaded(true)"); // <-- Agregamos console.log
              }}
            />
          </div>
        </div>

        {/* Muestra el formulario y la lista de mensajes solo después de cargar el archivo */}
        {isFileUploaded && (
          <motion.div
            animate={{
              minHeight: 200, //Forzamos el minHeight
              padding: 12, //Forzamos el padding
            }}
            transition={{
              type: "spring",
              bounce: 0.5,
            }}
            className="rounded-lg w-full bg-neutral-200 dark:bg-neutral-800"  //Forzamos los estilos
          >
            <div className="flex flex-col w-full justify-between gap-2">
              <form onSubmit={handleFormSubmit} className="flex space-x-2">
                <Input
                  className={`bg-neutral-100 text-base w-full text-neutral-700 dark:bg-neutral-700 dark:placeholder:text-neutral-400 dark:text-neutral-300`}
                  minLength={3}
                  required
                  value={input}
                  placeholder={isRateLimited ? "Your request is exceeded thanks for your patience." : "Ask anything..."}
                  onChange={handleInputChange}
                  disabled={isRateLimited}
                />
              </form>
              <motion.div
                transition={{
                  type: "spring",
                  }}
                className="min-h-fit flex flex-col gap-2"
              >
                <AnimatePresence>
                  {awaitingResponse || currentToolCall ? (
                    <div className="px-2 min-h-12">
                      <div className="dark:text-neutral-400 text-neutral-500 text-sm w-fit mb-1">
                        {userQuery.content}
                      </div>
                      <Loading tool={currentToolCall} />
                    </div>
                  ) : lastAssistantMessage ? (
                    <div className="px-2 min-h-12">
                      <div className="dark:text-neutral-400 text-neutral-500 text-sm w-fit mb-1">
                        {userQuery.content}
                      </div>
                      <AssistantMessage message={lastAssistantMessage} />
                    </div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const AssistantMessage = ({ message }: { message: Message | undefined }) => {
  if (message === undefined) return "HELLO";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="whitespace-pre-wrap font-mono anti text-sm text-neutral-800 dark:text-neutral-200 overflow-hidden"
        id="markdown"
      >
        <MemoizedReactMarkdown
          className={"max-h-72 overflow-y-scroll no-scrollbar-gutter"}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </motion.div>
    </AnimatePresence>
  );
};

const Loading = ({ tool }: { tool?: string }) => {
  const toolName =
    tool === "getInformation"
      ? "Getting information"
      : tool === "addResource"
        ? "Adding information"
        : "Thinking";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring" }}
        className="overflow-hidden flex justify-start items-center"
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="animate-spin dark:text-neutral-400 text-neutral-500">
            <LoadingIcon />
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
            {toolName}...
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const MemoizedReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);