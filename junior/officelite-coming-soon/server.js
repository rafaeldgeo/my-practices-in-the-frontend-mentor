const http = require("http");
const fs = require("fs");
const path = require("path");
const sass = require("sass");
const processForm = require("./public/process-form");

// compile SASS from CSS
function compileSass() {
  const scssDir = path.join(__dirname, "src/scss");
  const cssDir = path.join(__dirname, "public/css");

  fs.readdirSync(scssDir).forEach((file) => {
    if (file.endsWith(".scss")) {
      const scssPath = path.join(scssDir, file);
      const cssPath = path.join(cssDir, file.replace(".scss", ".css"));

      try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log("SASS compilado com sucesso");
      } catch (error) {
        console.error("Erro ao compilar SASS", error);
      }
    }
  });
}

// monitors changes in SASS file
fs.watch(path.join(__dirname, "src/scss"), (event, filename) => {
  if (filename && filename.endsWith(".scss")) {
    console.log(`${filename} foi alterado. Recompilando SASS...`);
    compileSass();
  }
});

// create HTTP server
const server = http.createServer((req, res) => {

  let requestedUrl = "";

  if (req.method === "GET" && req.url === "/") {
    requestedUrl = "index.html";
  } else if (req.method === "POST" && req.url === "/process-form.js") {
    processForm(req, res);
    return;
  } else {
    requestedUrl = req.url;
  }

  let safePath = path.normalize(decodeURIComponent(requestedUrl)).replace(/^(\.\.[\/\\])+/, '');
  
  let filePath = path.join(
    __dirname,
    "public",
    safePath
  );
  
  const extname = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
    ".webp": "image/webp",
  };

  let contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>", "utf-8");
      } else {
        res.writeHead(500);
        res.end(`Server Error`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
