const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./models/message.js");
const Pusher = require("pusher");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
const connection_url = "mongodb://127.0.0.1:27017/messages";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  // const msgCollection = db.collection("messagecontents");
  // const changeStream = msgCollection.watch();
  // changeStream.on("change", (change) => {
  //   //   console.log(change);
  //   if (change.operationType === "insert") {
  //     const messageDetails = change.fullDocument;
  //     pusher.trigger("messages", "inserted", {
  //       name: messageDetails.name,
  //       message: messageDetails.message,
  //       timestamp: messageDetails.timestamp,
  //       received: messageDetails.received,
  //     });
  //   } else {
  //     console.log("Error triggering Pusher");
  //   }
  // });
});

app.get("/", (req, res) => res.status(200).send("hello world"));
app.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/messages/new", async (req, res) => {
  try {
    const dbMessage = req.body;
    const message = await Messages.create(dbMessage);
    res.status(201).send(message);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating user");
    } else {
      res.status(200).send("User created successfully");
    }
  });
});
app.listen(port, () => console.log(`Listening on localhost:${port}`));
