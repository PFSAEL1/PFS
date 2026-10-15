import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve('dist/public');
const port = Number(process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

function safeFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root)) return null;
  return file;
}

function sendFile(res, status, file) {
  const body = fs.readFileSync(file);
  res.writeHead(status, {
    'Content-Type': types[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const pathname = url.pathname;

  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(301, { Location: `${pathname.replace(/\/+$/, '')}${url.search}` });
    res.end();
    return;
  }

  const direct = safeFile(pathname === '/' ? '/index.html' : pathname);
  const candidates = direct
    ? [direct, `${direct}.html`, path.join(direct, 'index.html')]
    : [];

  for (const candidate of candidates) {
    if (candidate.startsWith(root) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      sendFile(res, 200, candidate);
      return;
    }
  }

  const notFound = path.join(root, '404.html');
  if (fs.existsSync(notFound)) sendFile(res, 404, notFound);
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`preview ${port}`);
});
