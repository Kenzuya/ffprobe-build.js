const os = require("os");
const fs = require("fs");
const path = require("path");
const { default: fetch } = require("node-fetch");
const arch = os.arch();
const platform = os.platform();
async function downloadFile() {
  if (platform !== "darwin" && platform !== "linux" && platform !== "win32") {
    console.error("Unsupported platform.");
    process.exit(1);
  }
  const binPath = path.resolve(__dirname, "bin");
  const pathPlatform = path.resolve(__dirname, "bin", platform);
  const pathArch = path.resolve(__dirname, "bin", platform, arch);
  if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
  if (!fs.existsSync(pathPlatform)) fs.mkdirSync(pathPlatform);
  if (!fs.existsSync(pathArch)) fs.mkdirSync(pathArch);
  const downloadLinks = {
    darwin: {
      x64: "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/darwin/x64/ffprobe",
      arm64:
        "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/darwin/arm64/ffprobe",
    },
    linux: {
      x64: "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/linux/x64/ffprobe",
      ia32: "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/linux/ia32/ffprobe",
    },
    win32: {
      x64: "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/win32/x64/ffprobe.exe",
      ia32: "https://raw.githubusercontent.com/Kenzuya/ffprobe-build.js/main/bin/win32/ia32/ffprobe.exe",
    },
  };
  const download = await fetch(downloadLinks[platform][arch]);
  const ffprobePath = path.resolve(
    __dirname,
    "bin",
    platform,
    arch,
    platform === "win32" ? "ffprobe.exe" : "ffprobe"
  );
  const stream = fs.createWriteStream(ffprobePath);
  download.body.pipe(stream);
  stream.on("finish", () => fs.chmodSync(ffprobePath, 0o755));
  // request("");
}

downloadFile();
