const { createServer } = require('vite');
async function start() {
  try {
    const vite = await createServer({
      server: { middlewareMode: true, hmr: { port: 8080 } },
      appType: 'spa'
    });
    console.log("Vite server started");
    // do not close immediately, wait to see if it crashes
    setTimeout(() => { vite.close(); console.log("done"); }, 2000);
  } catch (e) {
    console.error(e);
  }
}
start();
