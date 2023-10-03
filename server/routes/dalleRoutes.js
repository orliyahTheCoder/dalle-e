import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.UNSPLASH_API_KEY;

    const unsplashResponse = await axios.get(
      `https://api.unsplash.com/photos/random?query=${prompt}`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );
    const imageUrl = unsplashResponse.data.urls.regular;

    res.cookie("cross-site-cookie", "whatever", {
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default router;
