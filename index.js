const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://TriTamLe:Nhuanthien@cluster0.y1jlcoj.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Database");
  })
  .catch((err) => {
    console.log("Error");
    console.log(err);
  });

let store_data = [
  {
    channelId: "UCsT0YIqwnpJCM-mx7-gSA4Q",
    title: "TEDx Talks",
  },
  {
    channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
    title: "Programming with Mosh",
  },
];

//models:
const Schema = mongoose.Schema;
const ChannelSchema = new Schema(
  {
    channelId: String,
    title: String,
  },
  {
    collection: "channels",
  }
);

const ChannelModel = mongoose.model("channel", ChannelSchema);

// ChannelModel.create({
//   channelId: "UCsT0YIqwnpJCM-mx7-gSA4Q",
//   title: "TEDx Talks",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("ERROR!", err);
//   });

// ChannelModel.find({})
//   .then((data) => {
//     console.log(data.some((ele) => {}));
//     if (data === []) {
//       store_data.forEach((channel) => {
//         ChannelModel.create(channel).then((res) => {
//           console.log("added: ", channel);
//         });
//       });
//     }
//   })
//   .catch((err) => {
//     console.log("Error!", err);
//   });

// store_data.forEach((channel) => {
//   ChannelModel.create(channel).then(() => {
//     console.log("added!", channel);
//   });
// });

let allchannels;

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "0.0.0.0:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  socket.on("loadPage", (data) => {
    console.log(data.message);
    ChannelModel.find({}).then((data) => {
      allchannels = data;
    });
    socket.emit("store", allchannels);
  });

  socket.on("add_channel", (data) => {
    ChannelModel.create(data)
      .then(() => {
        console.log("added", data);
      })
      .then(() => {
        socket.emit("add_done", "done");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  });

  socket.on("delete_channel", (id) => {
    console.log(id);
    console.log("deleting");
    ChannelModel.find({
      channelId: id,
    })
      .then((data) => {
        ChannelModel.deleteOne(data[0]).then((done) => {
          socket.emit("delete_done", "done");
        });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
