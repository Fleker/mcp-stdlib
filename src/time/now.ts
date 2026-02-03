import { Tool } from "fastmcp";
import { z } from "zod";

const nowTool: Tool<any, z.ZodObject<{}>> = {
  name: "get_current_time",
  description: "Fetches the current date and time in ISO format.",
  parameters: z.object({}),
  execute: async () => {
    const now = new Date();
    return JSON.stringify({
      iso: now.toISOString(),
      local: now.toLocaleString(),
      timestamp: now.getTime(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  },
};

export default nowTool;
