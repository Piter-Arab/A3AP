"use server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

const SCRIPTS = {
  arma: {
    start: "/home/armasrv/steamcmd/arma3server/start.sh",
    stop: "/home/armasrv/stop-arma.sh",
  },
  ark: {
    start: "/home/armasrv/start-ark.sh",
    stop: "/home/armasrv/stop-ark.sh",
  },
};

export async function getServerStatus(game: "ark" | "arma") {
  try {
    const { stdout } = await execPromise(
      `ps aux | grep "${game === "ark" ? "[S]hooterGameServer" : "[a]rma3server"}"`,
    );

    return { isOnline: stdout.length > 0 };
  } catch (error) {
    return { isOnline: false };
  }
}

export async function toggleServer(
  game: "ark" | "arma",
  action: "start" | "stop",
) {
  const command = action === "start" ? SCRIPTS[game].start : SCRIPTS[game].stop;

  try {
    await execPromise(command);
    return { success: true };
  } catch (error) {
    console.error(`Error running ${action}:`, error);
    return { success: false };
  }
}
