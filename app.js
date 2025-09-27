const express = require("express");
const fs = require("fs").promises;
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`MyApp running on http://localhost:${PORT}`);
});

//Timeout is set at 1 second(1000ms)

// Callback functionality
app.get("/callback", (req, res) => {
  setTimeout(() => {
    try {
      const data = { id: 1, name: "Abhishek"};
      res.json({ message: "Data fetched with callback", data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }, 1000);
});

// Promise functionality
app.get("/promise", (req, res) => {
  new Promise((resolve) => {
    setTimeout(() => {
      const data = { id: 2, name: "Abhishek"};
      resolve(data);
    }, 1000);
  })
    .then((data) => res.json({ message: "Data fetched with Promise", data }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Async/Await functionality
app.get("/async", async (req, res) => {
  try {
    const data = await new Promise((resolve) =>
      setTimeout(
        () => resolve({ id: 3, name: "Abhishek"}),
        1000
      ));
    res.json({ message: "Data fetched with async/await", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reading file
app.get("/file", async (req, res) => {
  try {
    const fileContent = await fs.readFile("log.txt", "utf-8"); // Reads the log file
    res.json({
      message: "log file read successfully",
      length: fileContent.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));   // Returns data after 1 second
}

// Chained tasks
app.get("/chain", async (req, res) => {
  try {
    const steps = [];

    await simulateDelay(500);
    steps.push("Login completed successfully");

    await simulateDelay(500);
    steps.push("Fetched user profile data");

    await simulateDelay(500);
    steps.push("Rendered UI interface");


    res.json({ steps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});