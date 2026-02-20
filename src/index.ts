#!/usr/bin/env node
import { FastMCP } from "fastmcp";

import getMathComparisonTool from "./math/get-math-comparison";
import getLetterCountTool from "./strings/get-letter-count";
import wordCounter from "./strings/word-counter";
import now from "./time/now";
import { clipboardWriteImageTool, clipboardWriteTextTool, clipboardReadTool } from "./io/clipboard";

const server = new FastMCP({
  name: "MCP stdlib",
  version: "2026.01.12",
});

server.addTool(getLetterCountTool)
server.addTool(getMathComparisonTool)
server.addTool(wordCounter)
server.addTool(now)
server.addTool(clipboardWriteImageTool)
server.addTool(clipboardWriteTextTool)
server.addTool(clipboardReadTool)

server.start({
  transportType: "stdio",
});
