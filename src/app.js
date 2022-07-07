import express from "express";
import cors from "cors";
import SearchItem from "./Model/searchItem.js";

const app = express();

app.use(cors());
app.use(express.json());



app.get("/search/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  try {
    const result = await SearchItem.paginate({}, { page, limit: 5 });
    res.json(result);
  } catch (e) {}
});

app.get("/search/:search/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  try {
    const result = await SearchItem.paginate(
      {
        $or: [
          { name: { $regex: "^" + req.params.search, $options: "i" } },
          { symbol: { $regex: "^" + req.params.search, $options: "i" } },
          { sector: { $regex: "^" + req.params.search, $options: "i" } },
        ],
      },
      { page, limit: 5 },
    );
    res.json(result);
  } catch (e) {}
});

app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));

export default app;
