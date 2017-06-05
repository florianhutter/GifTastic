var simpsonsArr = ["Groundskeeper Willie", "Principal Skinner", "Ralph", "Krusty", "Millhouse", "Moe", "Ned", "Mr. Burns", "Maggie", "Lisa", "Bart", "Marge", "Homer"]; 


function renderButtons() {
  // Empty all buttons before recreating them
  $("#buttonPanel").empty();

  // Loop through the array of simpsons
  for (var i = 0; i < simpsonsArr.length; i++) {
    // Generate a button for each simpson in the array
    var button = $("<button>");
    button.addClass("simpsonButton");
    button.attr("data-simpson", simpsonsArr[i]);
    button.text(simpsonsArr[i]);

    // Adding button to the HTML
    $("#buttonPanel").prepend(button);
  }
}

// Adding additional simpsons to the array
$("#add-character").on("click", function(event) {
  event.preventDefault();

  var simpson = $("#simpsonInput").val().trim();

  // Adde to our simpsonsArr array
  simpsonsArr.push(simpson);
  $("#simpsonInput").val("");

  // Recreate the simpson buttons
  renderButtons();
});

// Get simpson Gifs with the Giphy API
function getSimpsonsGifs() {
  // Get the simpson name from the button clicked
  var simpsonName = $(this).attr("data-simpson");
  var simpsonStr = simpsonName.split(" ").join("+");

  // Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + simpsonStr + 
                 "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  // Call to Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
 
    var dataArray = result.data;

    // Display gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("simpsonGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append new Gifs
      $("#gifPanel").append(newDiv);
    }
  });
}
// Animate still gif and stop a moving gif
function animateGif() {
  
  var state = $(this).find("img").attr("data-state");

  // Create gif animated or still
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render simpson buttons
$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".simpsonButton", getSimpsonsGifs);

$(document).on("click", ".simpsonGif", animateGif);