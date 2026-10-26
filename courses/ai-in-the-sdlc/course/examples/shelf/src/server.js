import { createServer } from "node:http";
import { activeLoans } from "./loans.js";

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

export function createApp() {
  return createServer((req, res) => {
    if (req.method === "GET" && req.url === "/loans") {
      send(res, 200, { loans: activeLoans() });
      return;
    }
    send(res, 404, { error: "not-found" });
  });
}
