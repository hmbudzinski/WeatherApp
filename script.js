var apiKey = "Sf7881db99aec8ecaf4b4187281073fcc"
var searchTerm = $("#searchTerm").val();
    
var queryURL = "https://api.openweathermap.org/data/2.5/weather" + apiKey + "&q=" + searchTerm;

    $.ajax({ 
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });