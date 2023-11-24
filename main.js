class Person {
  constructor(name, address, id, email) {
    this.name = name;
    this.address = address;
    this.id = id;
    this.email = email;
  }
}

class Student extends Person {
  constructor(name, address, id, email, math, physics, chemistry) {
    super(name, address, id, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  calculateAverage() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

class Employee extends Person {
  constructor(name, address, id, email, workDays, dailySalary) {
    super(name, address, id, email);
    this.workDays = workDays;
    this.dailySalary = dailySalary;
  }

  calculateSalary() {
    return this.workDays * this.dailySalary;
  }
}

class Customer extends Person {
  constructor(name, address, id, email, companyName, orderValue, rating) {
    super(name, address, id, email);
    this.companyName = companyName;
    this.orderValue = orderValue;
    this.rating = rating;
  }
}

class ListPerson {
  constructor() {
    this.persons = [];
  }

  addPerson(person) {
    this.persons.push(person);
    this.displayUserList();
  }

  removePersonById(id) {
    this.persons = this.persons.filter((person) => person.id !== id);
    this.displayUserList();
  }

  updatePerson(person) {
    const index = this.persons.findIndex((p) => p.id === person.id);
    if (index !== -1) {
      this.persons[index] = person;
      this.displayUserList();
    }
  }

  sortByName() {
    this.persons.sort((a, b) => a.name.localeCompare(b.name));
    this.displayUserList();
  }

  filterByType(type) {
    const filteredPersons = this.persons.filter(
      (person) => person.constructor.name.toLowerCase() === type
    );
    this.displayUserList(filteredPersons);
  }

  displayUserList(persons = this.persons) {
    const userListDiv = document.getElementById("userList");
    userListDiv.innerHTML = "<h2>Danh sách người dùng</h2>";
    persons.forEach((person) => {
      const details = Object.entries(person)
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join("<br>");
      userListDiv.innerHTML += `<div>${details}</div>`;
    });
  }
}

const listPerson = new ListPerson();

document.addEventListener("DOMContentLoaded", function () {
  displayUserForm();

  document
    .getElementById("personType")
    .addEventListener("change", displayUserForm);
});

function displayUserForm() {
  const userFormDiv = document.getElementById("userForm");
  const selectedType = document.getElementById("personType").value;

  userFormDiv.innerHTML = "<h2>Thông tin người dùng</h2>";

  switch (selectedType) {
    case "student":
      userFormDiv.innerHTML += `
                <label for="name">Tên:</label>
                <input type="text" id="name">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address">
                <label for="id">Mã:</label>
                <input type="text" id="id">
                <label for="email">Email:</label>
                <input type="email" id="email">
                <label for="math">Toán:</label>
                <input type="number" id="math">
                <label for="physics">Lý:</label>
                <input type="number" id="physics">
                <label for="chemistry">Hóa:</label>
                <input type="number" id="chemistry">
            `;
      break;
    case "employee":
      userFormDiv.innerHTML += `
                <label for="name">Tên:</label>
                <input type="text" id="name">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address">
                <label for="id">Mã:</label>
                <input type="text" id="id">
                <label for="email">Email:</label>
                <input type="email" id="email">
                <label for="workDays">Số ngày làm việc:</label>
                <input type="number" id="workDays">
                <label for="dailySalary">Lương theo ngày:</label>
                <input type="number" id="dailySalary">
            `;
      break;
    case "customer":
      userFormDiv.innerHTML += `
                <label for="name">Tên:</label>
                <input type="text" id="name">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address">
                <label for="id">Mã:</label>
                <input type="text" id="id">
                <label for="email">Email:</label>
                <input type="email" id="email">
                <label for="companyName">Tên công ty:</label>
                <input type="text" id="companyName">
                <label for="orderValue">Trị giá hóa đơn:</label>
                <input type="number" id="orderValue">
                <label for="rating">Đánh giá:</label>
                <input type="number" id="rating" min="1" max="5">
            `;
      break;
    default:
      userFormDiv.innerHTML = "";
  }
}

function addUser() {
  const selectedType = document.getElementById("personType").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;

  let person;

  switch (selectedType) {
    case "student":
      const math = parseFloat(document.getElementById("math").value);
      const physics = parseFloat(document.getElementById("physics").value);
      const chemistry = parseFloat(document.getElementById("chemistry").value);
      person = new Student(name, address, id, email, math, physics, chemistry);
      break;
    case "employee":
      const workDays = parseInt(document.getElementById("workDays").value);
      const dailySalary = parseFloat(
        document.getElementById("dailySalary").value
      );
      person = new Employee(name, address, id, email, workDays, dailySalary);
      break;
    case "customer":
      const companyName = document.getElementById("companyName").value;
      const orderValue = parseFloat(
        document.getElementById("orderValue").value
      );
      const rating = parseInt(document.getElementById("rating").value);
      person = new Customer(
        name,
        address,
        id,
        email,
        companyName,
        orderValue,
        rating
      );
      break;
    default:
      alert("Vui lòng chọn loại người dùng.");
      return;
  }

  listPerson.addPerson(person);
}

function deleteUser() {
  const id = prompt("Nhập mã người dùng cần xóa:");
  if (id) {
    listPerson.removePersonById(id);
  }
}

function updateUser() {
  const id = prompt("Nhập mã người dùng cần cập nhật:");
  if (id) {
    const selectedType = document.getElementById("personType").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    let person;

    switch (selectedType) {
      case "student":
        const math = parseFloat(document.getElementById("math").value);
        const physics = parseFloat(document.getElementById("physics").value);
        const chemistry = parseFloat(
          document.getElementById("chemistry").value
        );
        person = new Student(
          name,
          address,
          id,
          email,
          math,
          physics,
          chemistry
        );
        break;
      case "employee":
        const workDays = parseInt(document.getElementById("workDays").value);
        const dailySalary = parseFloat(
          document.getElementById("dailySalary").value
        );
        person = new Employee(name, address, id, email, workDays, dailySalary);
        break;
      case "customer":
        const companyName = document.getElementById("companyName").value;
        const orderValue = parseFloat(
          document.getElementById("orderValue").value
        );
        const rating = parseInt(document.getElementById("rating").value);
        person = new Customer(
          name,
          address,
          id,
          email,
          companyName,
          orderValue,
          rating
        );
        break;
      default:
        alert("Vui lòng chọn loại người dùng.");
        return;
    }

    listPerson.updatePerson(person);
  }
}

function sortByName() {
  listPerson.sortByName();
}

function filterByType() {
  const selectedType = document.getElementById("personType").value;
  listPerson.filterByType(selectedType);
}
