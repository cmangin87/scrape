// Grab articles as JSON and display applicable information
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

// When clicked, empty note and store id
$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  // Ajax call for article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    $("#notes").append("<h2>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append(
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );
    $("#notes").prepend("<p>" + data.note.body + "</p>");
    $("#notes").prepend("<h6><u>Note Title: </u>" + data.note.title + "</h6>");

    // If an article has a note, place note title in title input and note body in textarea
    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});

// When note is saved, grab article id
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  // Run POST
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    // Log response and empty the notes section
    console.log(data);
    $("#notes").empty();
  });

  // Remove the entered information
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
