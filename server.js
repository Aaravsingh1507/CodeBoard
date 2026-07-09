const { onRequest } = require("firebase-functions/v2/https");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

let appReady = false;

exports.nextserver = onRequest(
  {
    region: "us-central1",
    memory: "512MiB",
  },
  async (req, res) => {
    if (!appReady) {
      await app.prepare();
      appReady = true;
    }
    return handle(req, res);
  }
);
