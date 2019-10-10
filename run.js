var express = require("express");
var path = require("path");
var http = require("http");



var PORT = process.env.PORT || 3000;

// Sets up the Express App
// =============================================================
var app = express();


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// function handleRequest(request, response) {

//     console.log(`Request Made`);
//     response.end(`It works! Path hit: ${request.url}`);
// }
//     //var server = http.createServer(handleRequest);

app.listen(PORT, function () {

    console.log(`Server now listening on http://localhost: ${PORT}`);
});
var reservationList = [
    {
        unique_ID: 1,
        name: "Frank Smith",
        phoneNumber: "555-0179",
        email: "franks@write.me",
        time: "6:00pm",
    },
    {
        unique_ID: 2,
        name: "Tracy M",
        phoneNumber: "555-2137",
        email: "tracym@mail.com",
        time: "6:30pm",
    },
    {
        unique_ID: 3,
        name: "Mickey James",
        phoneNumber: "505-2770",
        email: "mickJames@rmail.com",
        time: "7:00pm",
    }
];
var waitList = [
    {
        unique_ID: 4,
        name: "Jeff Baker",
        phoneNumber: "225-2137",
        email: "tracym@smail.com",
        time: "6:30pm",
    },
    {
        unique_ID: 5,
        name: "Sidney Peters",
        phoneNumber: "808-2972",
        email: "Speters@mail.com",
        time: "7:00pm",
    }

]


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
    return res.json(reservationList);
});


app.get("/tables/:name", function (req, res) {
    var chosen = req.params.reservationList.name || req.params.waitList.name;

    console.log(chosen);
    var chosenNameExists = false;

    for (var i = 0; i < reservationList.length; i++) {
        if (chosen === reservationList[i].name) {
            chosenNameExists = true;
            return res.json(reservationList[i]);
        }
    }
    if (chosenNameExists === false) {
        for (var i = 0; i < waitList.length; i++) {
            if (chosen === waitList[i].name) {
                return res.json(waitList[i]);
            }
        }

    }
    return res.json(false);

});
