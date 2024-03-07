const express = require("express");
const axios = require("axios");
const { connectDb } = require("/usr/src/app/src/helpers/db");
const { host, port, db, apiUrl } = require("/usr/src/app/src/helpers/configuration");

const app = express();
 
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our auth server is working well");
});

app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + '/testapidata').then(response => {
	res.json ({
		testapidata: response.data.testwithapi
	});
  });
});

app.get("/api/currentUser", (req, res) => {
  res.json({
	  id: "1234",
	  email: "test@gmail.com"
  });
});

connectDb()
  .on("error", console.error)
  .on("disconnected", connectDb)
  .once("open", startServer);
