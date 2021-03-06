$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<b><font color='red'>Title: </font></b>" + data[i].title + "<br />" + "<b><font color='red'>Link: </font></b>"+ data[i].link + "<br />"+ "<b><font color='red'>Short Summary: </font></b>" + data[i].body+"</p>");
  }
});

$(document).on("click","#scraper", function(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data){
    console.log(data);
    location.reload();
  })
});


$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  }).then(function(data){
    console.log(data);
    location.reload();
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

