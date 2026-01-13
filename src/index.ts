#!/usr/bin/env node
import { FastMCP } from "fastmcp";

import getMathComparisonTool from "./math/get-math-comparison";
import getLetterCountTool from "./strings/get-letter-count";
import wordCounter from "./strings/word-counter";

const server = new FastMCP({
  name: "MCP stdlib",
  version: "2026.01.12",
});

server.addTool(getLetterCountTool)
server.addTool(getMathComparisonTool)
server.addTool(wordCounter)

server.start({
  transportType: "stdio",
});
