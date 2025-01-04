declare class Pdfparser extends EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(context: any, value: number);
  parseBuffer(buffer: Buffer): void;
  loadPDF(pdfFilePath: string, verbosity?: number): Promise<void>;
  createParserStream(): ParserStream;
  on<K extends keyof EventMap>(eventName: K, listener: EventMap[K]): this;
}
