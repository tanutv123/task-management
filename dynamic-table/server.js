// server.js
const fs = require('fs');
const https = require('https');
const next = require('next');

const port = 3000;
const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
};

app.prepare().then(() => {
    https.createServer(httpsOptions, (req, res) => {
        handle(req, res);
    }).listen(port, () => {
        console.log(`🚀 HTTPS dev server running at https://localhost:${port}`);
    });
});
