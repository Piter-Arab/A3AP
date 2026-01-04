"use server";
import fs from "fs/promises";

const LOG_FILE = "/home/armasrv/steamcmd/arma3server/server.log";

export async function getConsoleLogs() {
  try {
    await fs.access(LOG_FILE);

    const content = await fs.readFile(LOG_FILE, "utf-8");

    const lines = content.split("\n");
    return lines.slice(-100).join("\n");
  } catch (error) {
    return "Log file not found or server has not started yet.";
  }
}
