var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addbtn = document.getElementById("add");
var courses = [];
var table = document.getElementById("table");

addbtn.onclick = function (event) {
  event.preventDefault();
  var course = {
    name: courseName.value,
    category: courseCategory.value,
    Price: coursePrice.value,
    Description: courseDescription.value,
    Capacity: courseCapacity.value,
  };
  courses.push(course);
  display();
  clear();
};

function clear() {
  courseName.value = "";
  courseCategory = "";
  coursePrice = "";
  courseDescription = "";
  courseCapacity = "";
}

function display() {
  var data = "";
  for (var i = 0; i < courses.length; i++) {
    data += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].Price}</td>
            <td>${courses[i].Description}</td>
            <td>${courses[i].Capacity}</td>
            <td><button class="btn btn-info">Update</button></td>
            <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</button></td>

        </tr>
        `;
  }
  table.innerHTML = data;
}

function Delete(index) {
  courses.splice(index, 1);
  display();
}
