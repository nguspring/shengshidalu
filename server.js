// 简易 CORS 静态文件服务器：替代 VS Code Live Server，供酒馆助手 $('body').load() 跨域加载前端产物
// 用法：node server.js （工作目录为前端工程根，端口 5500 匹配 frontend.md 约定）
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 5500;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  // 防止路径遍历攻击
  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`CORS static server running at http://localhost:${port}`);
  console.log(`Root: ${root}`);
});
