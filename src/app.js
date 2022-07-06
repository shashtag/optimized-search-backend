import express from "express";
import cors from "cors";
import SearchItem from "./Model/searchItem.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
  const page = parseInt(req.body.page);
  try {
    const result = await SearchItem.paginate(
      {
        $or: [
          { name: { $regex: "^" + req.body.search, $options: "i" } },
          { symbol: { $regex: "^" + req.body.search, $options: "i" } },
          { sector: { $regex: "^" + req.body.search, $options: "i" } },
        ],
      },
      { page, limit: 5 },
    );

    res.json(result);
  } catch (e) {}
});
app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));

export default app;
