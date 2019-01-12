var MongoClient = require('mongodb').MongoClient;

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    url = "mongodb://localhost:27017";
var ObjectID = require('mongodb').ObjectID;

server.listen(process.env.PORT || 3001);


app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './'});
});


io.sockets.on('connection', function (socket) {
    console.log("Socket connected. sukces :D");


//-----------------------------------------------------------------


    socket.on('ZapiszDaneOproduktachDoBazy', function (a, b, c, d) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("wow");
            var newRecord = {towar: a, obrazek: b, stack: c, cena: d};
            dbo.collection('towary').insertOne(newRecord, function (err, res) {
                if (err) throw err;
                console.log("Towar zapisano do bazy wow! ");
                res = "Towar zapisano do bazy wow!";
                socket.emit('ZapisanoRecord', res);
                db.close();
            });
        });
    });

//-----------------------------------------------------------------

    socket.on('pobierzDanewow', function () {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('wow');
            dbo.collection('towary').find().toArray(function (err, result) {
                if (err) throw err;
                socket.emit('odczytZBazyWow', result);
                db.close();
            });
        });
    });

//-----------------------------------------------------------------

    socket.on('aktualizujDaneOprodukcie', function (id, Towar, Stack, Cena) {
        console.log('id-> ' + id);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('wow');


            var query = {"_id": ObjectID(id)};
            var aktualizacja = {$set: {towar: Towar, stack: Stack, cena: Cena}};

            dbo.collection('towary').update(query, aktualizacja, function (err) {
                if (err) throw err;
                socket.emit('zaktualizowanoDaneoProdukcie');
                db.close();
            });
        });
    });


});


