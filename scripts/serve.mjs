import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filename = path.resolve(directory, `.${pathname === '/' ? '/index.html' : pathname}`);
    const relative = path.relative(directory, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Nie znaleziono strony.');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Portfolio: http://localhost:${port}`));
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
