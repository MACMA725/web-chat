const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});
const expressLayouts = require("express-ejs-layouts");

// SETUP EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", {
    title: "CHAT BARENG YUK",
    layout: "layout/main",
  });
});

io.on("connection", (socket) => {
  console.log("coneting");
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
  socket.on("chat-message", (msg) => {
    console.log(`message: ${msg}`);
  });
});

const port = 8000;
server.listen(port, () => {
  console.log("listening on localhost:%s", port);
});
