import { Tool } from "fastmcp";
import { z } from "zod";
import { Clipboard } from "@napi-rs/clipboard";
import { Jimp } from "jimp";

const clipboard = new Clipboard();

export const clipboardWriteImageTool: Tool<
  any,
  z.ZodObject<{ url: z.ZodString }>
> = {
  name: "clipboard_write_image",
  description:
    "Fetches an image from a URL and writes it to the system clipboard. " +
    "Supports JPEG, PNG, BMP, TIFF, and GIF formats.",
  parameters: z.object({
    url: z.string().url().describe("URL of the image to copy to the clipboard"),
  }),
  execute: async (args: any) => {
    const { url } = args;
    const image = await Jimp.read(url);
    const { width, height } = image;
    // bitmap.data is a raw RGBA Buffer, which is what setImage expects
    clipboard.setImage(width, height, image.bitmap.data);
    return JSON.stringify({
      success: true,
      message: "Image written to clipboard",
      dimensions: `${width}x${height}`,
    });
  },
};

export const clipboardWriteTextTool: Tool<
  any,
  z.ZodObject<{ text: z.ZodString }>
> = {
  name: "clipboard_write_text",
  description: "Writes a text string to the system clipboard.",
  parameters: z.object({
    text: z.string().describe("The text to copy to the clipboard"),
  }),
  execute: async (args: any) => {
    clipboard.setText(args.text);
    return JSON.stringify({ success: true, message: "Text written to clipboard" });
  },
};

export const clipboardReadTool: Tool<any, z.ZodObject<{}>> = {
  name: "clipboard_read",
  description:
    "Reads the current system clipboard content and returns its type and content. " +
    "Returns text content verbatim, or image metadata (dimensions) for image data.",
  parameters: z.object({}),
  execute: async () => {
    // Try text first — getText() returns an empty string when clipboard holds non-text.
    try {
      const text = clipboard.getText();
      if (text && text.length > 0) {
        return JSON.stringify({ type: "text/plain", content: text });
      }
    } catch {
      // clipboard holds no text; fall through to image check
    }

    // Try image — getImage() returns raw RGBA bytes; length 0 means no image.
    try {
      const rgba = clipboard.getImage();
      if (rgba && rgba.length > 0) {
        // Reconstruct a Jimp bitmap to recover width/height.
        // For a square RGBA buffer: side = sqrt(bytes / 4).
        // Use Jimp.fromBitmap if we can determine dimensions.
        // Since getImage() returns flat RGBA with no header, we report the byte size.
        return JSON.stringify({
          type: "image",
          content: null,
          bytes: rgba.length,
        });
      }
    } catch {
      // no image on clipboard
    }

    return JSON.stringify({ type: "empty", content: null });
  },
};
