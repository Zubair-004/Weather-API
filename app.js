const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  const query = req.body.cityName;
  const key = "c535c128de843118aadc71305685b7b0";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ key +"&units="+ units;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const img = weatherData.weather[0].icon;
      const url = "http://openweathermap.org/img/wn/" + img + "@2x.png";
      const weatDesc = weatherData.weather[0].description;
      res.write("<h1>The temperature in " + query + " is "+temp+" degree celsius.</h1>");
      res.write("<p> The weather condition is of "+weatDesc+"</p>");
      res.write("<img src="+url+">");
      res.send();
          })
  });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
