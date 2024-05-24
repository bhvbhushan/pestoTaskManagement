import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import fs from "fs";
import path from "path";

function getDirectories(source: string) {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

const srcPath = path.resolve(__dirname, "src");
const directories = getDirectories(srcPath);

const alias = directories.reduce((acc: Record<string, string>, dir: string) => {
  acc[`${dir}`] = path.resolve(srcPath, dir);
  return acc;
}, {});
console.log({ alias });

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), viteCommonjs()],
    resolve: {
      alias: {
        ...alias,
      },
    },
    server: {
      port: 3000,
      host: true,
      watch: {
        usePolling: true,
      },
    },
  });
};
