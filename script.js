var APIKey = "&units=imperial&appid=f7881db99aec8ecaf4b4187281073fcc"
var searchCity = $("#City").val();
var searchCountry = $("#Country").val();
var cities = [];
    
//click to search for city
$("button").on("click", function(){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
    // var UV = "https://api.openweathermap.org/data/2.5/uvi?q="+ ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        // console.log(queryURL);
        // console.log(response);
                
        //creates and appends button to list 
        var userSearch = $("<button>");
        localStorage.setItem($("#City").val(), $("#City").val() + $("#Country").val());

        // userSearch.attr("data-name", )
        userSearch.text($("#City").val() + ", " + ($("#Country").val()).toUpperCase());
        userSearch.addClass("list-group-item");
        $("#cityList").prepend(userSearch);
    
        //sets the search term to the title on the right
        $("#dailyTitle").empty();
        $("#dailyTitle").append($("#City").val() + ", " + ($("#Country").val().toUpperCase()) + " (" + moment().format('L') + ")");

        var weatherImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#dailyTitle").append(weatherImage);

        //grabbing data
        $("#temp").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
        // $("#UV").attr("src","https://api.openweathermap.org/data/2.5/uvi?q="+ ($("#City").val()) + "," + ($("#Country").val()) + APIKey));


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

    var counter = 0;
    // $("#day1").empty();

    for(var i = 0; i < response.list.length; i++){
        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
            
            // localStorage.setItem("Temp: ", response.list[i].main.temp);
            if (counter === 0){
                $("#temp1").append(response.list[i].main.temp);
                $("#humidity1").append(response.list[i].main.humidity);
                counter++;
            } else if (counter === 1){
                $("#day2").append(response.list[i].main.temp);
                counter++;
            } else if(counter === 2){
                $("#day3").append(response.list[i].main.temp);
                counter++;
            } else if(counter === 3){
                $("#day4").append(response.list[i].main.temp);
                counter++;
            } else if(counter === 4){
                $("#day5").append(response.list[i].main.temp);
            }
        }
    }
})};

// function callCity (){
//     // userSearch.on("click", getItem($("#City").val());
// }

//functions to add dates to five day forecast
function addDate1(){
    $("#date1").empty();
    var date1 = $("<div>");
    date1.text(moment().add(1, 'days').format('L'));
    $("#date1").append(date1);
}

function addDate2(){
    $("#date2").empty();
    var date2 = $("<div>");
    date2.append(moment().add(2, 'days').format('L'));
    $("#date2").append(date2);
}

function addDate3(){    
    $("#date3").empty();
    var date3 = $("<div>");
    date3.append(moment().add(3, 'days').format('L'));
    $("#date3").append(date3);
}

function addDate4(){
    $("#date4").empty();
    var date4 = $("<div>");
    date4.append(moment().add(4, 'days').format('L'));
    $("#date4").append(date4);
}

function addDate5(){
    $("#date5").empty();
    var date5 = $("<div>");
    date5.append(moment().add(5, 'days').format('L'));
    $("#date5").append(date5);
}
