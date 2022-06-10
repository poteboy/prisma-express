import { spawn } from "child_process";

// テスト実行前にDBを初期化する
export const resetDB = async () => {
  if (process.env.NODE_ENV === "test") {
    await new Promise((resolve, reject) => {
      const process = spawn("prisma", ["migrate", "reset", "--force", "--skip-generate", "--skip-seed"]);
      process.on("close", (code) => {
        if (code === 0) {
          resolve(0);
        } else {
          reject(code);
        }
      });
    });
  }
};
