// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening");
});

app.get("/", function(req, res) {
  //res.send("Hi this is my newsletter app");

  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  //  res.send("Thanks <strong>" + firstName + " " + lastName + "</strong> for signing up for the News Letter. Please check your email <strong>" + email + "</strong> for the same." );

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);


  const url = "https://us18.api.mailchimp.com/3.0/lists/530306a168";

  const options = {
    method: "POST",
    auth: "deep_pathak:f1dfff41e5a796bfaf0249c6fd088ea2-us18"
  };

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      //res.send("Successfully submitted");
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
      //res.send("There is an error. Please try again");
    }
    response.on("data", function(data) {
      //console.log(JSON.parse(data));
      const responseData = JSON.parse(data);

      //  const statusCode = responseData;


    });
  });

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});

//API key

// f1dfff41e5a796bfaf0249c6fd088ea2-us18


// List ID
// 530306a168
