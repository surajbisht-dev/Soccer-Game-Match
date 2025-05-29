import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/api/matches", async (req, res) => {
  try {
    const response = await fetch("https://www.scorebat.com/video-api/v3/");
    const data = await response.json();

    const matches = data.response.map((match) => ({
      title: match.title,
      competition: match.competition,
      date: match.date,
      thumbnail: match.thumbnail,
      matchviewUrl: match.matchviewUrl,
    }));

    res.json(matches);
  } catch (error) {
    console.log("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch match data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
