const employeesList = [
  {
    name: "Aiesha Simmons",
    avatar: "/img/business-people/pexels-andrea-piacquadio-774909.jpg",
  },
  {
    name: "Ria Byers",
    avatar: "/img/business-people/pexels-asa-dugger-1666073.jpg",
  },
  {
    name: "Coen Hendrix",
    avatar: "/img/business-people/pexels-creation-hill-1681010.jpg",
  },
  {
    name: "Keanu William",
    avatar: "/img/business-people/pexels-daria-shevtsova-1548164.jpg",
  },
  {
    name: "Mita Yoshi",
    avatar: "/img/business-people/pexels-ketut-subiyanto-4349862.jpg",
  },
  {
    name: "Vinny Mcgowan",
    avatar: "/img/business-people/pexels-mentatdgt-936229.jpg",
  },
  {
    name: "Gene Holland",
    avatar: "/img/business-people/pexels-moose-photos-1587009.jpg",
  },
  {
    name: "Roman Chadwick",
    avatar: "/img/business-people/pexels-pixabay-220453.jpg",
  },
  {
    name: "Linda Chamberlain",
    avatar: "/img/business-people/pexels-rfstudio-3867093.jpg",
  },
  {
    name: "Catrin Knapp",
    avatar: "/img/business-people/pexels-victor-miyata-1845534.jpg",
  },
];

const calcToEuro = (pricePLN) => {
  const euro = 4.8282;
  return pricePLN / euro;
};

let tasksList = [
  {
    name: "Zadanie 1",
    pricePLN: 2910,
    priceEUR: calcToEuro(2910),
  },
  {
    name: "Zadanie 2",
    pricePLN: 1350,
    priceEUR: calcToEuro(1350),
  },
  {
    name: "Zadanie 3",
    pricePLN: 6780,
    priceEUR: calcToEuro(6780),
  },
];

const employeeInput = document.getElementById("employee");
const employeeBox = document.querySelector(".employee-box");
let isShown = false;

const toggleEmployeesList = () => {
  if (!isShown) {
    employeeBox.classList.add("shown");
    isShown = !isShown;
  } else {
    employeeBox.classList.remove("shown");
    isShown = !isShown;
  }
};

const employeeBoxShown = employeeInput.addEventListener("click", () => {
  toggleEmployeesList();
});

window.checkedIndex = -1;

const drawEmployesList = (employees, query = "") => {
  const employeesBox = document.getElementById("employees-box");
  employeesBox.innerHTML = "";
  employees.forEach((employee, index) => {
    const employeeElement = document.createElement("div");
    if (employee.name.toLowerCase().indexOf(query) > -1) {
      employeeElement.innerHTML = `
			<div class="person" onclick="handleEmployeeSelect(${index})">
              <div class="personal-info">
                <div class="avatar" style="background-image: url('${
                  employee.avatar
                }')"></div>
                <span class="person-name ${
                  window.checkedIndex === index ? " active" : ""
                } ">${employee.name}</span>
              </div>
              <img
                src="/img/icons/bx-check.svg"
                class="checked ${
                  window.checkedIndex === index ? " active" : ""
                }"
				alt="checked"
              />
            </div>`;
      employeesBox.appendChild(employeeElement);
    }
  });
};

drawEmployesList(employeesList);

const handleEmployeeSelect = (index) => {
  const employeeInput = document.getElementById("employee-input");

  if (index === window.checkedIndex) {
    window.checkedIndex = -1;
    employeeInput.value = "";
    toggleEmployeesList();
  } else {
    window.checkedIndex = index;
    employeeInput.value = employeesList[index].name;
    toggleEmployeesList();
  }
  errorMessage("employee");
  drawEmployesList(employeesList);
};

const drawTasksList = (tasks) => {
  const tasksTable = document.getElementById("tasks");
  tasksTable.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("tr");
    taskElement.innerHTML = `
		<tr>
            <td>${task.name}</td>
            <td>${task.pricePLN} PLN</td>
            <td>${task.priceEUR.toFixed(0)} EUR</td>
            <td>
              <div class="delete-task" onclick="handleTaskDelete(${index})">
                <img src="/img/icons/bxs-trash-alt.svg" alt="delete" />
                <span >Usuń</span>
              </div>
            </td>
          </tr>
		`;
    tasksTable.appendChild(taskElement);
  });
};

const handleSearchQueryChange = (event) => {
  const query = event.target.value;
  drawEmployesList(employeesList, query);
};

const sortTaskList = (key, desc) => {
  if (desc) {
    tasksList.sort((a, b) => {
      return a[key] < b[key] ? -1 : 1;
    });
  } else {
    tasksList.sort((a, b) => {
      return a[key] < b[key] ? 1 : -1;
    });
  }

  drawTasksList(tasksList);
};

const sumTasksPrice = () => {
  const summaryBox = document.getElementById("total-price");
  let summaryPLN = 0;
  let summaryEUR = 0;
  tasksList.forEach((task) => {
    summaryPLN += task.pricePLN;
    summaryEUR += task.priceEUR;
  });
  summaryBox.innerText = `${summaryPLN.toFixed(2)} PLN (${summaryEUR.toFixed(
    2
  )} EUR)`;
};
sumTasksPrice();

const handleTaskAdd = () => {
  const isTaskInputCorrect = document.getElementById("task-name");
  const isErrorPriceInputCorrect = document.getElementById("task-price");
  const taskName = document.getElementById("task-name").value;
  const taskPrice = parseFloat(document.getElementById("task-price").value);
  const addError = document.getElementById("e5");
  const isEmptyTask = isTaskInputCorrect.value == "";
  const isEmptyPrice = isErrorPriceInputCorrect.value == "";
  const isErrorPrice = isErrorPriceInputCorrect.classList.contains("error");
  const isErrorTask = isTaskInputCorrect.classList.contains("error");
  if (isEmptyTask || isEmptyPrice) {
    addError.classList.add("shown");
    addError.innerText = "Wypelnij pola";
  } else if (isErrorPrice || isErrorTask) {
    addError.classList.add("shown");
    addError.innerText = "Wypelnij poprawnie pola";
  } else {
    tasksList.push({
      name: taskName,
      pricePLN: taskPrice,
      priceEUR: calcToEuro(taskPrice),
    });
    addError.classList.remove("shown");
  }
  drawTasksList(tasksList);
  document.getElementById("task-name").value = "";
  document.getElementById("task-price").value = "";
  const taskNameInput = document.getElementById("task-name");
  const taskLabel = document.getElementById("task-label");
  const taskNameError = document.getElementById("e3");

  taskNameInput.classList.remove("error");
  taskLabel.classList.remove("error");
  taskNameError.classList.remove("shown");
  sumTasksPrice();
};

document.getElementById("task-add").addEventListener("click", handleTaskAdd);

const handleTaskDelete = (index) => {
  tasksList.splice(index, 1);
  drawTasksList(tasksList);
  sumTasksPrice();
};
drawTasksList(tasksList);

const errorMessage = (key) => {
  switch (key) {
    case "company": {
      const companyInput = document.getElementById("company-input");
      const errorCompanyInput = document.getElementById("e1");
      if (companyInput.value == "") {
        companyInput.classList.add("error");
        errorCompanyInput.classList.add("shown");
      } else {
        companyInput.classList.remove("error");
        errorCompanyInput.classList.remove("shown");
      }
      break;
    }
    case "employee": {
      const employeeInput = document.getElementById("employee-input");

      if (employeeInput.value == "") {
        employeeInput.classList.add("error");
      } else {
        employeeInput.classList.remove("error");
      }
      break;
    }
    case "task-name": {
      const taskLabel = document.getElementById("task-label");
      const taskInput = document.getElementById("task-name");
      const errorTaskInput = document.getElementById("e3");

      if (taskInput.value.length < 5) {
        taskInput.classList.add("error");
        errorTaskInput.classList.add("shown");
        taskLabel.classList.add("error");
      } else {
        taskInput.classList.remove("error");
        errorTaskInput.classList.remove("shown");
        taskLabel.classList.remove("error");
      }
      break;
    }
    case "price": {
      const priceInput = document.getElementById("task-price");
      const errorPriceInput = document.getElementById("e4");

      if (parseInt(priceInput.value) < 0 || priceInput.value == "") {
        priceInput.classList.add("error");
        errorPriceInput.classList.add("shown");
      } else {
        priceInput.classList.remove("error");
        errorPriceInput.classList.remove("shown");
      }
      break;
    }
    default:
      break;
  }
};

const initInputsLabels = () => {
  const inputs = document.querySelectorAll(".i-input");
  const label = document.getElementById("task-label");
  inputs.forEach((input) => {
    input.addEventListener("focus", (event) => {
      label.classList.add("active");
    });
    input.addEventListener("focusout", (event) => {
      label.classList.remove("active");
    });
  });
};
initInputsLabels();

document
  .getElementById("search")
  .addEventListener("keyup", handleSearchQueryChange);
