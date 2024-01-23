"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 7007;
const fetchAPI_1 = require("./util/fetchAPI");
// import path from "path";
// Endpoint for Server-Sent Events
app.get("/live/:id", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    console.log(req.params);
    console.log(req.query);
    // Function to send data to the client
    const sendEvent = () => {
        //@ts-ignore
        (0, fetchAPI_1.fetchData)(req.params.id, req.query.auth)
            //@ts-ignore
            .then((data) => {
            res.write(`data: ${JSON.stringify(data.rows)}\n\n`);
        })
            //@ts-ignore
            .catch((error) => {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        });
    };
    // Send data every second
    const intervalId = setInterval(sendEvent, 1000);
    // Clear interval on client disconnect
    req.on("close", () => {
        clearInterval(intervalId);
    });
});
app.get("/rest/:id", async (req, res) => {
    // Function to send data to the client
    //@ts-ignore
    let result = await (0, fetchAPI_1.fetchData)(req.params.id, req.query.auth);
    // //@ts-ignore
    // .then((data) => {
    //   res.write(`data: ${JSON.stringify(data.rows)}\n\n`);
    // })
    // //@ts-ignore
    // .catch((error) => {
    //   res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    // });
    res.json(result.rows);
});
app.get("/", (_req, res) => {
    // res.sendFile(path.join(__dirname, "../", "index.html"));
    res.json({ this: "is true" });
});
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT} 🚀🔥👻`);
});
//# sourceMappingURL=index.js.map