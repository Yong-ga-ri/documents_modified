const express = require("express");
const app = express();
const mongoose = require("mongoose");

//
function readJsonFile() {
  const fs = require("fs");

  const jsonFile = fs.readFileSync("src/exdata.json", "utf-8");

  const jsonData = JSON.parse(jsonFile);

  const datalist = jsonData.data;

  return datalist;
}

//

const MONGO_URI =
  "mongodb+srv://ys:ew4hylORn4hKnJun@directory.4kdpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

db = mongoose.connection;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "movium",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    //req.body에서 json parsing 진행 middleware
    app.use(express.json());

    app.get("/home", async (req, res) => {
      try {
        console.log("/home api called");
        const data = await db.collection("review_data").find().toArray();
        //     const data = readJsonFile()

        //    const a = data.slice(0,3)
        //    const b = data.slice(3,6)
        //    const c = data.slice(6,9)
        //    console.log(data);
        //    return res.send({ a_group: a, b_group: b, c_group: c  })
        return res.send({ data });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.post("/test_post", function (req, res) {
      console.log(req.body);
      return res.send({ success: true });
    });

    app.get("/test_get", function (req, res) {
      console.log(req.body);
      return res.send({ success: true });
    });

    app.listen(80, function () {
      console.log("server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

server();
