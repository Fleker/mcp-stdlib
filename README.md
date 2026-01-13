# Felker MCP

This is a collection of tools I've written in Node.js which I can run in a local server and connect to my Gemini CLI installation or some other sort of LLM.

## Setup

You can add this MCP server by:

1. Add this setup to your LLM CLI settings:

```json
"mcpServers": {
  "mcp-stdlib": {
    "command": "npx",
    "args": ["@fleker/mcp-stdlib@latest"]
  }
}
```

2. Setup the MCP project:

- Run `npm install`
- Run `npm run execute`

It will compile and run the tools on port `8080`.

You can also go into `src/index.ts` to comment/remove any tools you don't want to run.

## Debugging

```json
  "mcp stdlib": {
    "command": "node",
    "args": ["/mnt/c/Users/handn/Development/mcp-stdlib/dist/index.js"]
  }
```
