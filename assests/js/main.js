var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addbtn = document.getElementById("add");
var courses = [];
var table = document.getElementById("table");
var search = document.getElementById("search");

addbtn.onclick = function (event) {
  event.preventDefault();
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
      display();
      clear();
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      clear();
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

function clear() {
  courseName.value = "";
  courseCategory.value = "";
  coursePrice.value = "";
  courseDescription.value = "";
  courseCapacity.value = "";
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
      display();
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  });
}

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
      table.innerHTML = "";
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  });
};

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
            <td><button class="btn btn-info">Update</button></td>
            <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</button></td>

        </tr>
        `;
  }
  table.innerHTML = data;
};
