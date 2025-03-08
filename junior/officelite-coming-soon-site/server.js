const http = require("http");
const fs = require("fs");
const path = require("path");
const sass = require("sass");

// função para compilar SASS em CSS
function complileSass() {
  const scssPath = path.join(__dirname, "public/scss/style.scss");
  const cssPath = path.join(__dirname, "public/css/style.css");

  try {
    const result = sass.compile(scssPath);
    fs.writeFileSync(cssPath, result.css);
    console.log("SASS compilado com sucesso");
  } catch (error) {
    console.error("Erro ao compilar SASS", error);
  }
}

//monitora mudanças no arquivo SASS
fs.watch(path.join(__dirname, "public/scss"), (event, filename) => {
  if (filename && filename.endsWith(".scss")) {
    console.log(`${filename} foi alterado. Recompilando SASS...`);
    complileSass();
  } 
});

//criação do servidor HTTP
const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  const extname = String(path.extname(filePath)).toLowerCase();

  const mineTypes = {
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

  let contentType = mineTypes[extname] || "application/octet-steam";

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
