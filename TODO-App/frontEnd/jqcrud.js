$(function () {
  loadTasks();
  $("#tasks").on("click", ".del-btn", handleDelete);
  $("#tasks").on("click", ".edit-btn", handleUpdate);
  $("#addBtn").on("click", addTask);
  $("#updateBtn").on("click", updateTask);
});

// function to update any record/recipe
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe"); //traversing from button towards its closest parent with id .recipe
  let id = parentDiv.attr("data-id");
  $.get("http://localhost:3000/api/tasks/" + id, function (response) {
    $("#updateId").val(response._id);
    $("#updateTask").val(response.task);
    $("#updateDate").val(response.date);
    $("#updateStatus").val(response.status);
    $("#updateModal").modal("show"); // show modal after filling its input values
  });
}

function updateTask() {
  var id = $("#updateId").val();
  var task = $("#updateTask").val();
  var date = $("#updateDate").val();
  var status = $("#updateStatus").val();
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "PUT",
    data: { task: task, date: date, status: status },
    success: function (response) {
      console.log(response);
      $("#updateModal").modal("hide");
      loadTasks();
    },
  });
}

//function to add new recipe
function addTask() {
  var task = $("#addTask").val();
  var date = $("#addDate").val();
  var status = $("#addStatus").val();
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "POST",
    data: { task: task, date: date, status: status },
    success: function (response) {
      console.log(response);
      loadTasks();
    },
  });
}

//function to delete a particular data set
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe"); //traversing from button towards its closest parent with id .recipe
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "DELETE",
    error: function () {
      var tasks = $("#tasks");
      tasks.html("An error has occurd while deleting");
    },
    success: function () {
      loadTasks();
    },
  });
}

//function to fetch and load data on the page
function loadTasks() {
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "GET",
    error: function () {
      var tasks = $("#tasks");
      tasks.html("An error has occurd loading Tasks");
    },
    success: function (response) {
      console.log(response);
      $("#tasks").empty();
      for (var i = 0; response.length; i++) {
        var res = response[i];
        $("#tasks").append(
          `<tr class="recipe" data-id="${res._id}">
            <td><button class="btn del-btn"><i class="bi bi-trash-fill"></i></button></td>
            <td></button><button class="btn edit-btn"><i class="bi bi-pencil-fill"></i></button></td>
            <td>${res.task}</td>
            <td>${res.date}</td>
            <td>${res.status}</td>
            `
        );
      }
    },
  });
}
