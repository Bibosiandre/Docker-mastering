const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { connectDb } = require("/usr/src/app/src/helpers/db");
const { host, port, db, authApiUrl } = require("/usr/src/app/src/helpers/configuration");

const app = express();

const postSchema = new mongoose.Schema({
  name: String
});

const Post = mongoose.model("Post", postSchema);

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);
  });

  try {
    const posts = await Post.find();
    console.log("posts", posts);

    const silence = new Post({ name: "Silence" });
    const savedSilence = await silence.save();
    console.log('savedSilence', savedSilence);
  } catch (error) {
    console.error(error);
  }
};

app.get("/test", (req, res) => {
  res.send("Our api server  is working well");
});

app.get('/api/testapidata', (req, res) => {
  res.json({
	  testwithapi: true
  });
});

app.get("/testwithcurrentuser", (req, res) => {
	try{
		  axios.get(authApiUrl + '/currentUser').then(response => {
			res.json({
			  testWithCurrentUser: true,
			  currentUserFromAuth: response.data
			});
		  });
	} catch(error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred'
    });
  }
});
connectDb()
  .on("error", console.error)
  .on("disconnected", connectDb)
  .once("open", startServer);
