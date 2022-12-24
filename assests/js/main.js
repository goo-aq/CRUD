var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addbtn = document.getElementById("add");
var courses = [];

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
  clear();
  console.log(courses);
};

function clear() {
  courseName.value = "";
  courseCategory = "";
  coursePrice = "";
  courseDescription = "";
  courseCapacity = "";
}
