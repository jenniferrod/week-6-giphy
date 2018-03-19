$(document).ready(function () {

    var initialBtns = ["happy dance", "I love it", "sassy", "shocked", "ew", "hard pass", "intrigued", "high five", "yay"];

    // search, find and display the gifs 
    function imageGif() {
        var input = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=Jsa27Fcp9DhIONmlbg94PcN4DtZsUntD&limit=10&rating=PG-13";

        //  perform an AJAX GET request to queryURL 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < 10; i++) {

                // create a div for the gifs to be dumped to
                var gifDiv = $("<div>");
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gifs");
                gifDiv.append(image);

                // pull and print the ratings 
                var rating = response.data[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                gifDiv.prepend(pRating)

                $("#display-gifs").prepend(gifDiv);
            }
        });
    }

    // add buttons to search for user-inputs 
    function buttons() {
        $("#display-btns").empty();
        for (var j = 0; j < initialBtns.length; j++) {

            var newBtns = $("<button>")
            newBtns.attr("class", "btn btn-outline-secondary btn-sm");
            newBtns.attr("id", "input")
            newBtns.attr("data-name", initialBtns[j]);
            newBtns.text(initialBtns[j]);

            $("#display-btns").append(newBtns);
        }
    }

    //  animate and pause gifs
    function animateAndPause() {

        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var pause = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        else if (state === "animate") {
            $(this).attr("src", pause);
            $(this).attr("data-state", "still");
        }
    }

    //  add user-input as a new button, push to button array
    $("#add-gifs").on("click", function () {
        var input = $("#user-input").val().trim();
        initialBtns.push(input);

        buttons();

        return false;
    });

    buttons();

    $(document).on("click", "#input", imageGif);
    $(document).on("click", ".gifs", animateAndPause);
});


