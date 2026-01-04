"use server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

const SCRIPTS = {
  start: "/home/armasrv/steamcmd/arma3server/start.sh",
  stop: "/home/armasrv/stop.sh",
};

export async function getServerStatus() {
  try {
    const { stdout } = await execPromise('ps aux | grep "[a]rma3server"');

    return { isOnline: stdout.length > 0 };
  } catch (error) {
    return { isOnline: false };
  }
}

export async function toggleServer(action: "start" | "stop") {
  const command = action === "start" ? SCRIPTS.start : SCRIPTS.stop;

  try {
    await execPromise(command);
    return { success: true };
  } catch (error) {
    console.error(`Error running ${action}:`, error);
    return { success: false };
  }
}
