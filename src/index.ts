import { FastMCP,  } from "fastmcp";

import getMathComparisonTool from "./math/get-math-comparison";
import getLetterCountTool from "./strings/get-letter-count";
import wordCounter from "./strings/word-counter";
import { IncomingHttpHeaders } from "http";

interface SessionData {
  headers: IncomingHttpHeaders;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

const server = new FastMCP({
  name: "MCP stdlib",
  version: "2026.01.12",
  authenticate: async (request: any): Promise<SessionData> => {
    // Authentication logic
    return {
      headers: request.headers,
    };
  },
});

server.addTool(getLetterCountTool)
server.addTool(getMathComparisonTool)
server.addTool(wordCounter)

server.start({
  transportType: "stdio",
});

console.log("Server started");
