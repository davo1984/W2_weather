//set temp scale to fahrenheit or celsius
let scale = 'f';
jsonText = '';

function setScale() {

    let y = '';
    let x = document.getElementById("IDscale");
    //x.innerHTML = "XXXXXXX";

    //if (x.innerHTML === "Fahrenheit") {
    if (scale === "f") {
        scale = 'c';
        x.innerHTML = "Celsius"; //change button text

        //convert the temperatures    
        x = document.getElementById("IDtemp");
        y = document.getElementById("IDtemp").innerHTML;
        y = Math.round((y - 32) * 5 /9);
        //(32°F − 32) × 5 / 9 = 0°C

        document.getElementById("IDtemp").innerHTML = y;

        x = document.getElementById("IDmin");
        y = document.getElementById("IDmin").innerHTML;
        y = Math.round((y - 32) * 5 / 9);
        document.getElementById("IDmin").innerHTML = y;

        x = document.getElementById("IDmax");
        y = document.getElementById("IDmax").innerHTML;
        y = Math.round((y - 32) * 5 / 9);
        document.getElementById("IDmax").innerHTML = y;

    } else {
        scale = 'f';
        //console.log('x=' + x + ' y=' + y);

        x.innerHTML = "Fahrenheit"; //change button text

        //convert the temperatures    
        x = document.getElementById("IDtemp");
        y = document.getElementById("IDtemp").innerHTML;
        y = Math.round(y * 9 / 5 + 32);
        document.getElementById("IDtemp").innerHTML = y;

        x = document.getElementById("IDmin");
        y = document.getElementById("IDmin").innerHTML;
        y = Math.round(y * 9 / 5 + 32);
        document.getElementById("IDmin").innerHTML = y;

        x = document.getElementById("IDmax");
        y = document.getElementById("IDmax").innerHTML;
        y = Math.round(y * 9 / 5 + 32);
        document.getElementById("IDmax").innerHTML = y;

        tMin = Math.round((y - 273.15) * 9 / 5 + 32);
    }
}


// fetch the weather data & place in JSON
function goFetch() {
    let whichZip = document.getElementById("IDzip").value;
    console.log('3 ZIP=' + whichZip);
    console.log('isNaN=' + isNaN(whichZip) + ' length=' + whichZip.length);
    if ((isNaN(whichZip)) || (whichZip.length != 5)) {
        displayError('Bad ZIPcode, Must be 5 numbers only!');
        console.log(displayError);

    } else {
        fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + whichZip + ",us&appid=70078e74187791740cd2f096f55ee289").then(function (response) {
            return response.json();
        }).then(function (jsonText) {
            let weatherData = '';
            weatherData.textContent = jsonText;
            console.log({ jsonText });
            // make main container Visible
            //let mainC = document.querySelector('#IDmain'); not this
            let classInfo = document.getElementById("IDmain");  //use this
            let mainC = classInfo.getAttribute("class");
            console.log('does it have d-none? ' + ' search returns=' + mainC.search("d-none"));
            if (mainC.search("d-none") >= 0) {
                classInfo.classList.toggle("d-none");    //use this
                console.log('toggled');
            } else {
                console.log('Not toggled!=' + mainC.search("d-none"));
            }
            //mainC.setAttribute("class", classInfo); not this

            console.log('city=' + jsonText.name);
            document.getElementById("IDcity").innerHTML
                = jsonText.name;

            console.log('temp=' + jsonText.main.temp);
            console.log("jsonText.weather.description=" + jsonText.weather.description);
            console.log({ jsonText });
            displayTemp(jsonText);
            console.log(' between Temp & Desc' + jsonText.main.temp + ' ' + jsonText.weather.description);
            document.getElementById("IDdesc").innerHTML
                = jsonText.weather[0].description;
                

            //create obj (srcIcon) that will be added to html. EXPLAIN THIS!!!
            let srcIcon = document.createElement("src");  // create/add image element
            let srcIconWhere = document.getElementById("IDicon"); //where does it go
            console.log('icon goes here='+srcIconWhere);
            srcIcon.id = "id";
            srcIcon.className = "class";
            srcIcon.src = "http://openweathermap.org/img/wn/"
                + jsonText.weather[0].icon + "@2x.png";            // image.src = "IMAGE URL/PATH"
            srcIconWhere.appendChild(srcIcon);

            console.log("http://openweathermap.org/img/wn/"+ jsonText.weather[0].icon + "@2x.png")

            document.getElementById("IDdesc").innerHTML = jsonText.weather[0].description;

            document.getElementById("IDicon").src = "http://openweathermap.org/img/wn/" 
                    + jsonText.weather[0].icon + "@2x.png";

            //console.log('FETCHED: ' + jsonText.weather[0].description);
            //console.log(jsonText.main.temp);
        }).catch(function (err) {
            //console.log('ERROR=' + err+'=');
            console.log({err});
            let ErrMsg = 'Error getting your data.<br>Maybe try again later?<br>' + err.message;
            //console.log(ErrMsg);  //

            if (err) {
                displayError(ErrMsg);
            }
        });
    }
}

function displayTemp(weatherJ) {

    // todo kelvin to F 
    // todo choose C or F button
    let t = tMax = tMin = 0;
    console.log(weatherJ.main.temp+' '+weatherJ.main.temp_max);
    if (scale=='c') {
        t = Math.round(weatherJ.main.temp - 273.15);
        tMin = Math.round(weatherJ.main.temp_min - 273.15);
        tMax = Math.round(weatherJ.main.temp_max - 273.15);
    } else {
        t = Math.round((weatherJ.main.temp - 273.15) * 9 / 5 + 32);
        tMax = Math.round((weatherJ.main.temp_max - 273.15) * 9 / 5 + 32);
        tMin = Math.round((weatherJ.main.temp_min - 273.15) * 9 / 5 + 32);
    }
    document.getElementById("IDtemp").innerHTML = t;
    document.getElementById("IDmax").innerHTML = tMax;
    document.getElementById("IDmin").innerHTML = tMin;

    console.log('process Temp=' + t);
}

function displayConditions(weatherJ) {
    console.log('process Conditions=' + jsonText.weather.description);

}

function displayError(errMsg) {
    console.log('errMsg=' + errMsg);
    let classInfo = "";
    let mainC = "";

    // make main container invisible
    classInfo = document.getElementById("IDmain");
    mainC = classInfo.getAttribute("class");

    console.log('does it have d-none? ' + ' search returns=' + mainC.search("d-none"));
    if (mainC.search("d-none") >= 0) {
        console.log('Not toggled!=' + mainC.search("d-none"));
    } else {
        classInfo.classList.toggle("d-none");
        console.log('toggled');
    }

    // make main container invisible
    //classInfo = document.getElementById("IDmain");  //use this
    //mainC = classInfo.getAttribute("class");
    if (mainC.search("d-none") < 0) {
        //classInfo.classList.toggle("d-none");    //use this
    }

    //write error popup        
    document.getElementById("IDerror").innerHTML = errMsg;
    $('#IDerrPopUp').modal('show');  // create error message & move this to error function

    document.getElementById("IDerror2").innerHTML = errMsg;
    document.getElementById("IDerror2").innerHTML = errMsg;
}

