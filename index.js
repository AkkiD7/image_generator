const express = require("express");
const multer = require("multer");
const { createCanvas } = require("canvas");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index", { image: null });
});

app.post("/generate-image", upload.none(), (req, res) => {
  const prompt = req.body.prompt;

  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fcba03";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#000000";
  ctx.font = "bold 30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(prompt, width / 2, height / 2);

  const buffer = canvas.toBuffer("image/png");
  const image = buffer.toString("base64");

  res.render("index", { image: `data:image/png;base64,${image}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
