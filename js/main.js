// fetch the weather data & place in JSON
function goFetch() {
    let whichZip = document.getElementById("IDzip").value;
    console.log('3 ZIP=' + whichZip);
    if (isNaN(whichZip) || (whichZip.length != 5)) {
        displayError('Bad ZIPcode, Must be 5 numbers only!')
    }
    fetch("http://api.openweathermap.org/data/2.5/weather?zip="+whichZip+",us&appid=70078e74187791740cd2f096f55ee289").then(function (response) {
        return response.json();
    }).then(function (jsonText) {
        let weatherData = '';
        weatherData.textContent = jsonText;
console.log({jsonText});
        // make main container Visible
        //let mainC = document.querySelector('#IDmain'); not this
        let classInfo = document.getElementById("IDmain");  //use this
        let mainC = classInfo.getAttribute("class");
        console.log('does it have d-none? ' + ' search returns=' + mainC.search("d-none"));
        if (mainC.search("d-none")>=0) {
            classInfo.classList.toggle("d-none");    //use this
            console.log('toggled');
        } else { 
            console.log('Not toggled!=' + mainC.search("d-none"));
        }
        //mainC.setAttribute("class", classInfo); not this

        console.log('city='+jsonText.name);
        document.getElementById("IDcity").innerHTML
            = jsonText.name;

        console.log('temp=' + jsonText.main.temp);
        document.getElementById("IDtemp").innerHTML
            = jsonText.main.temp;
        document.getElementById("IDmax").innerHTML
            = jsonText.main.temp_max;
        document.getElementById("IDmin").innerHTML
            = jsonText.main.temp_min;
        //displayTemp(weatherData);
        console.log(' between Temp & Desc'+jsonText.main.temp+' '+jsonText.weather.description);
        document.getElementById("IDdesc").innerHTML
            = jsonText.weather.description;
        //displayConditions(weatherData);

        console.log('FETCHED: '+jsonText.weather[0].description);
        console.log(jsonText.main.temp);
    }).catch(function (err) {
        //console.log('ERROR=' + err+'=');
        //console.log({err});
        let ErrMsg = 'Error getting data:<br>' + err.message;
        //console.log(ErrMsg);  //working

        if (err) {
            displayError(ErrMsg);
        }
    });
}

function displayTemp (weatherJ) {
    console.log('process Temp='+weather.main.temp);
}

function displayConditions(weatherJ) {
    console.log('process Conditions=' + weatherJ.weather.description);

}

function displayError(errMsg) {
    console.log('displayError');
    let classInfo = mainC = "";

    // make main container invisible
    classInfo = document.getElementById("IDmain");  //use this
    mainC = classInfo.getAttribute("class");
    if (mainC.search("d-none") < 0) {
        //classInfo.classList.toggle("d-none");    //use this
    }

    // make error alert Visible
    classInfo = document.getElementById("IDerror2");  //use this
    mainC = classInfo.getAttribute("class");
    //if (mainC.search("d-none") < 0) {
        classInfo.classList.toggle("d-none");    //use this
    //}

//let mainC = document.querySelector('#IDmain');
//classInfo = mainC.getAttribute("class");
//classInfo = classInfo.replace("d-none", "d-block");
//mainC.setAttribute("class", classInfo);

// make error alert Visible
//let errorC = document.querySelector('#IDmain');
//let errorInfo = mainC.getAttribute("class");
//errorInfo = errorInfo.replace("d-block", "d-none");
//errorC.setAttribute("class", errorInfo);

    document.getElementById("IDerror2").innerHTML = errMsg;
    document.getElementById("IDerror2").innerHTML = errMsg;
}