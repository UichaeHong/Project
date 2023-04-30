const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

// 요청하는 곳에 포트 번호가 다르더라고 허용
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const todoRouter = require("./routes/todo");
app.use("/api", todoRouter); // 기본주소: localhost:PORT/api

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
