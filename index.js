const os = require("os");
const path = require("path");

const platform = os.platform();
if (platform !== "darwin" && platform !== "linux" && platform !== "win32") {
  console.error("Unsupported platform.");
  process.exit(1);
}

const arch = os.arch();
if (platform === "darwin" && arch !== "x64" && arch !== "arm64") {
  console.error("Unsupported architecture.");
  process.exit(1);
}

var ffprobePath = path.join(
  __dirname,
  "bin",
  platform,
  arch,
  platform === "win32" ? "ffprobe.exe" : "ffprobe"
);

exports.path = ffprobePath;
