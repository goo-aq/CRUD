var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var nameAlert = document.getElementById("nameAlert");
var categoryAlert = document.getElementById("categoryAlert");
var priceAlert = document.getElementById("priceAlert");
var descriptionAlert = document.getElementById("descriptionAlert");
var capacityAlert = document.getElementById("capacityAlert");
var nameFlag = 0;
var categoryFlag = 1;
var priceFlag = 1;
var descriptionFlag = 1;
var capacityFlag = 1;
console.log(descriptionFlag);
var addbtn = document.getElementById("add");
var courses = [];
var table = document.getElementById("table");
var search = document.getElementById("search");
var currentIndex;
if (JSON.parse(localStorage.getItem("courses")) != null) {
  courses = JSON.parse(localStorage.getItem("courses"));
  display();
}
// add/update button
addbtn.onclick = function (event) {
  event.preventDefault();
  if (addbtn.value == "Add Course") {
    add();
  } else if (addbtn.value == "Update Course") {
    update();
  }
};
// add data
function add() {
  var course = {
    name: courseName.value,
    category: courseCategory.value,
    Price: coursePrice.value,
    Description: courseDescription.value,
    Capacity: courseCapacity.value,
  };

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      courses.push(course);
      localStorage.setItem("courses", JSON.stringify(courses));
      display();
      clear();
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      clear();
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
// clear inputs
function clear() {
  courseName.value = "";
  courseName.classList.remove("is-valid");
  courseName.classList.remove("is-invalid");
  courseCategory.value = "";
  courseCategory.classList.remove("is-valid");
  courseCategory.classList.remove("is-invalid");
  coursePrice.value = "";
  coursePrice.classList.remove("is-valid");
  coursePrice.classList.remove("is-invalid");
  courseDescription.value = "";
  courseDescription.classList.remove("is-valid");
  courseDescription.classList.remove("is-invalid");
  courseCapacity.value = "";
  courseCapacity.classList.remove("is-valid");
  courseCapacity.classList.remove("is-invalid");
  if (nameAlert.classList.contains("d-block")) {
    nameAlert.classList.replace("d-block", "d-none");
  }
  if (categoryAlert.classList.contains("d-block")) {
    categoryAlert.classList.replace("d-block", "d-none");
  }
  if (priceAlert.classList.contains("d-block")) {
    priceAlert.classList.replace("d-block", "d-none");
  }
  if (descriptionAlert.classList.contains("d-block")) {
    descriptionAlert.classList.replace("d-block", "d-none");
  }
  if (capacityAlert.classList.contains("d-block")) {
    capacityAlert.classList.replace("d-block", "d-none");
  }
  addbtn.setAttribute("disabled", "disabled");
  nameFlag = 0;
  categoryFlag = 1;
  priceFlag = 1;
  descriptionFlag = 1;
  capacityFlag = 1;
  addbtn.value = "Add Course";
}
// clear btn
document.getElementById("clearbtn").onclick = function () {
  clear();
};
// show data in the table
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
            <td><button class="btn btn-info" onclick="get(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</button></td>

        </tr>
        `;
  }
  table.innerHTML = data;
}
// delete single
function Delete(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem("courses", JSON.stringify(courses));
      display();
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  });
}
// delete all
deleteBtn.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      localStorage.setItem("courses", JSON.stringify(courses));
      table.innerHTML = "";
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  });
};
// search function
search.onkeyup = function () {
  var data = "";
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].name.toLowerCase().includes(search.value.toLowerCase()))
      data += `
        <tr>
            <td>${i + 1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].Price}</td>
            <td>${courses[i].Description}</td>
            <td>${courses[i].Capacity}</td>
            <td><button class="btn btn-info" onclick="get(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</button></td>

        </tr>
        `;
  }
  table.innerHTML = data;
};
// update function
function get(index) {
  var course = courses[index];
  courseName.value = course.name;
  courseCategory.value = course.category;
  coursePrice.value = course.Price;
  courseDescription.value = course.Description;
  courseCapacity.value = course.Capacity;
  addbtn.value = "Update Course";
  currentIndex = index;
  nameFlag = 1;
}
function update() {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      courses[currentIndex].name = courseName.value;
      courses[currentIndex].category = courseCategory.value;
      courses[currentIndex].Price = coursePrice.value;
      courses[currentIndex].Description = courseDescription.value;
      courses[currentIndex].Capacity = courseCapacity.value;
      localStorage.setItem("courses", JSON.stringify(courses));
      display();
      clear();
      addbtn.value = "Add Course";
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      clear();
      addbtn.value = "Add Course";
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

// validation(regex)
// check flags status
function validate() {
  if (
    nameFlag &&
    categoryFlag &&
    priceFlag &&
    descriptionFlag &&
    capacityFlag
  ) {
    addbtn.removeAttribute("disabled");
  }
}
// name
// first letter is capital , 3-10 letters , no numbers
courseName.onkeyup = function () {
  var pattern = /^[A-Z][a-z]{2,10}$/;
  if (pattern.test(courseName.value)) {
    nameFlag = 1;
    if (courseName.classList.contains("is-invalid")) {
      courseName.classList.replace("is-invalid", "is-valid");
      nameAlert.classList.replace("d-block", "d-none");
    } else {
      courseName.classList.add("is-valid");
    }
  } else {
    nameFlag = 0;
    addbtn.setAttribute("disabled", "disabled");
    nameAlert.classList.replace("d-none", "d-block");
    if (courseName.classList.contains("is-valid")) {
      courseName.classList.replace("is-valid", "is-invalid");
    } else {
      courseName.classList.add("is-invalid");
    }
  }
  validate();
};
// category
// first letter is capital , 3-20 letters , no numbers
courseCategory.onkeyup = function () {
  var pattern = /^[A-Z][a-z]{2,20}$/;
  if (pattern.test(courseCategory.value)) {
    categoryFlag = 1;
    if (courseCategory.classList.contains("is-invalid")) {
      courseCategory.classList.replace("is-invalid", "is-valid");
      categoryAlert.classList.replace("d-block", "d-none");
    } else {
      courseCategory.classList.add("is-valid");
    }
  } else {
    categoryFlag = 0;
    addbtn.setAttribute("disabled", "disabled");
    categoryAlert.classList.replace("d-none", "d-block");
    if (courseCategory.classList.contains("is-valid")) {
      courseCategory.classList.replace("is-valid", "is-invalid");
    } else {
      courseCategory.classList.add("is-invalid");
    }
  }
  validate();
};
// price
// only numbers and 3 digits
coursePrice.onkeyup = function () {
  var pattern = /^[0-9]{3,4}$/;
  if (pattern.test(coursePrice.value)) {
    priceFlag = 1;
    if (coursePrice.classList.contains("is-invalid")) {
      coursePrice.classList.replace("is-invalid", "is-valid");
      priceAlert.classList.replace("d-block", "d-none");
    } else {
      coursePrice.classList.add("is-valid");
    }
  } else {
    priceFlag = 0;
    addbtn.setAttribute("disabled", "disabled");
    priceAlert.classList.replace("d-none", "d-block");
    if (coursePrice.classList.contains("is-valid")) {
      coursePrice.classList.replace("is-valid", "is-invalid");
    } else {
      coursePrice.classList.add("is-invalid");
    }
  }
  validate();
};
// description
// maximum 120 character
courseDescription.onkeyup = function () {
  var pattern = /^.{0,120}$/;
  if (pattern.test(courseDescription.value)) {
    descriptionFlag = 1;
    if (courseDescription.classList.contains("is-invalid")) {
      courseDescription.classList.replace("is-invalid", "is-valid");
      descriptionAlert.classList.replace("d-block", "d-none");
    } else {
      courseDescription.classList.add("is-valid");
    }
  } else {
    descriptionFlag = 0;
    addbtn.setAttribute("disabled", "disabled");
    descriptionAlert.classList.replace("d-none", "d-block");
    if (courseDescription.classList.contains("is-valid")) {
      courseDescription.classList.replace("is-valid", "is-invalid");
    } else {
      courseDescription.classList.add("is-invalid");
    }
  }
  validate();
};
// capacity
// only numbers and 1-3 digits
courseCapacity.onkeyup = function () {
  var pattern = /^[0-9]{1,3}$/;
  if (pattern.test(courseCapacity.value)) {
    capacityFlag = 1;
    if (courseCapacity.classList.contains("is-invalid")) {
      courseCapacity.classList.replace("is-invalid", "is-valid");
      capacityAlert.classList.replace("d-block", "d-none");
    } else {
      courseCapacity.classList.add("is-valid");
    }
  } else {
    capacityFlag = 0;
    addbtn.setAttribute("disabled", "disabled");
    capacityAlert.classList.replace("d-none", "d-block");
    if (courseCapacity.classList.contains("is-valid")) {
      courseCapacity.classList.replace("is-valid", "is-invalid");
    } else {
      courseCapacity.classList.add("is-invalid");
    }
  }
  validate();
};
