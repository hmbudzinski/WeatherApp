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

    for(var i = 0; i < response.list.length; i++){
        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
            
            var fdarray = [];
            fdarray.push([i]);
            console.log(fdarray);

            //if i use this is clears the entire div but also only shows day 1 of the array
            $("#day1").empty();

            //if the index of 12 is present in the above referenced list, 
            //then create a div and make the content that index
            $("<div>").text("Temp: " + fdarray[0]).appendTo($("#day1"));
            $("<div>").text("Temp: " + fdarray[1]).appendTo($("#day2"));
            
            // localStorage.setItem("Temp: ", response.list[i].main.temp);

            // console.log(response.list[i].main.temp)

            // $("#day1").append(response.list[0].main.temp);
            // $("#day2").append(response.list[1].main.temp);
            // $("#day3").append(response.list[2].main.temp);
            // $("#day4").append(response.list[3].main.temp);
            // $("#day5").append(response.list[4].main.temp);
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
