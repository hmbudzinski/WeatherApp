var APIKey = "&units=imperial&appid=f7881db99aec8ecaf4b4187281073fcc"
var searchCity = $("#City").val();
var searchCountry = $("#Country").val();
var cities = [];
    

$("button").on("click", function(){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        // console.log(queryURL);
        // console.log(response);
                
        var userSearch = $("<button>");
        localStorage.setItem("User Search", $("#City").val() + $("#Country").val());
        userSearch.text($("#City").val() + ", " + $("#Country").val());
        userSearch.addClass("list-group-item");
        $("#cityList").append(userSearch);
        //
        $("#dailyTitle").append($("#City").val() + ", " + $("#Country").val());

        $("#temp").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
        $("#UV").text("UV Index: " + response.wind.speed); //need to find real UV index

    // var currentTitle = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    // $("#dailyTitle").append(currentTitle);

    fiveday();
    addDate1();
    addDate2();
    addDate3();
    addDate4();
    addDate5();
});
})

function fiveday(){
    var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;

    $.ajax({
        url: fivedayqueryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

    for(var i = 0; i < response.list.length; i++){
        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
            
            var temp = $("<div>");
            temp.text("Temp: " + response.list[i].main.temp);
            console.log(response.list[i].main.temp)
            $("#day1").append(temp);
            
        }
    }
})};

function addDate1(){
    var date1 = $("<div>");
    date1.text(moment().add(1, 'days').format('L'));
    $("#date1").append(date1);
}

function addDate2(){
    var date2 = $("<div>");
    date2.append(moment().add(2, 'days').format('L'));
    $("#date2").append(date2);
}

function addDate3(){
    var date3 = $("<div>");
    date3.append(moment().add(3, 'days').format('L'));
    $("#date3").append(date3);
}

function addDate4(){
    var date4 = $("<div>");
    date4.append(moment().add(4, 'days').format('L'));
    $("#date4").append(date4);
}

function addDate5(){
    var date5 = $("<div>");
    date5.append(moment().add(5, 'days').format('L'));
    $("#date5").append(date5);
}
