// var tick = io.connect('http://localhost:3001', {"forceNew": true});


// sprawdzic numer portu i kompa!!!


var tick = io.connect('http://ws-mob-1979:3001', {"forceNew": true});


window.onload = function (ev) {


    //-----------------------------------------------------------------

    let button2 = document.getElementById('idZapisz');
    button2.onclick = function () {
        let a = document.getElementById('idNazwa').value;
        let b = document.getElementById('idObrazek').value;
        let c = document.getElementById('idIlosc').value;
        let d = document.getElementById('idCena').value;

        console.log(a + b + c + d);

        tick.emit('ZapiszDaneOproduktachDoBazy', a, b, c, d);

        alert("zapisano ");

        document.getElementById('idNazwa').value = '';
        document.getElementById('idObrazek').value = '';
        document.getElementById('idIlosc').value = '';
        document.getElementById('idCena').value = '';


        // tick.on('ZapisanoRecord', function (result) {
        //     let h1 = document.createElement('h1');
        //     document.body.appendChild(h1);
        //     let text = document.createTextNode(result);
        //     h1.appendChild(text);
        // });
    };


    //-----------------------------------------------------------------

    let button3 = document.getElementById('idPokazWow');
    button3.onclick = function () {
        console.log('idPokazWow');
        tick.emit('pobierzDanewow');
        // window.location.reload();
    };


    //-----------------------------------------------------------------


    tick.on('odczytZBazyWow333', function () {
        console.log('pika!!!!!');
    });


    tick.on('zaktualizowanoDaneoProdukcie', function () {
        console.log('zaktualizowanoDaneoProdukcie !!!!! (index.js)');
    });


    //-----------------------------------------------------------------


    tick.on('odczytZBazyWow', function (result) {


        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);


        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('towar'));
        tr.appendChild(th);


        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('obrazek'));
        tr.appendChild(th);


        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('ilosc w stacku'));
        tr.appendChild(th);

        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('cena za stack'));
        tr.appendChild(th);

        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('edit'));
        tr.appendChild(th);


        var th = document.createElement('TH');
        th.appendChild(document.createTextNode('delete'));
        tr.appendChild(th);



        console.log("ilość wierszy w tabeli: " + result.length);


        for (var a = 0; a < result.length; a++) {
            // for (var a = 0; a < 2; a++) {

            var id = (result[a]._id);


            var tr = document.createElement('TR');
            tableBody.appendChild(tr);


            // var td = document.createElement('TD');
            // td.appendChild(document.createTextNode(result[a].towar));
            // tr.appendChild(td);


            var td = document.createElement('TD');
            let inputTowar = document.createElement('INPUT');
            inputTowar.setAttribute("type", "text");
            inputTowar.setAttribute("value", (result[a].towar));
            td.appendChild(inputTowar);
            tr.appendChild(td);


            var td = document.createElement('TD');
            let myImage = document.createElement("img");
            myImage.setAttribute("src", (result[a].obrazek));
            myImage.setAttribute("height", '50%');
            td.appendChild(myImage);
            tr.appendChild(td);


            // var td = document.createElement('TD');
            // td.appendChild(document.createTextNode(result[a].stack));
            // tr.appendChild(td);


            var td = document.createElement('TD');
            let inputStack = document.createElement('INPUT');
            inputStack.setAttribute("type", "number");
            inputStack.setAttribute("value", (result[a].stack));
            td.appendChild(inputStack);
            tr.appendChild(td);


            var td = document.createElement('TD');
            let inputCena = document.createElement('INPUT');
            inputCena.setAttribute("type", "number");
            inputCena.setAttribute("value", (result[a].cena));
            td.appendChild(inputCena);
            tr.appendChild(td);


            var td = document.createElement('TD');
            let button4 = document.createElement('button');
            button4.textContent = "zapisz";
            button4.title = (result[a]._id);

            button4.onclick = function () {
                tick.emit('aktualizujDaneOprodukcie', button4.title, inputTowar.value, inputStack.value, inputCena.value);
                console.log('--> ' + button4.title, inputTowar.value, inputStack.value, inputCena.value);
            };

            td.appendChild(button4);
            tr.appendChild(td);




            var td = document.createElement('TD');
            let button5 = document.createElement('button');
            button5.textContent = "usuń";
            button5.title = (result[a]._id);

            button5.onclick = function () {
                // tick.emit('aktualizujDaneOprodukcie', button4.title, inputTowar.value, inputStack.value, inputCena.value);
                // console.log('--> ' + button4.title, inputTowar.value, inputStack.value, inputCena.value);
            };

            td.appendChild(button5);
            tr.appendChild(td);





        }

        tr.appendChild(td);
        document.body.appendChild(table);
    });


    //-----------------------------------------------------------------

    //-----------------------------------------------------------------


};