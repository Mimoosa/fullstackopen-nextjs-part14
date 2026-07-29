import next from "next";
import http from "http";

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  server.listen(3000, "localhost", () => {
    console.log("> Ready on http://localhost:3000");
  });
});
