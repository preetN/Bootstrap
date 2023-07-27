var task_list = [];
var entryList = [];
var badList = [];
let taskListElm = document.getElementById("good-task");
let badtaskListElm = document.getElementById("bad-task");
let good_hourElm = document.getElementById("good_hour");
let bad_hourElm = document.getElementById("bad_hour");
var ttl_good_hour = 0;
var ttl_bad_hour = 0;
const handleOnSubmit = (e) => {
  const form = new FormData(e);
  const task = form.get("item");
  const time = form.get("time");
  const obj = { task, time, type: "entry", id: randomString() };
  if (Number(obj.time) <= 0) {
    alert("Bad value for time");
  } else {
    if (168 - (Number(obj.time) + totalhour(task_list)) < 0) {
      alert("Time cannot exceed 168 hours");
    } else {
      task_list.push(obj);
      display();
    }
  }
};

const display = () => {
  let str = "";

  entryList = task_list.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += ` <tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.time}</td>
<td class="text-end">
  <button onclick="handleOnDelete('${
    item.id
  }')" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></i>
  </button>
  <button onclick="handleOnSwitch('${
    item.id
  }', 'bad')" class="btn btn-success"><i class="fa-solid fa-arrow-right"></i></i></i>
  </button>
</td>
</tr>`;
  });
  taskListElm.innerHTML = str;
  ttl_good_hour = totalhour(entryList);
  good_hourElm.innerHTML = ttl_good_hour;
};
const displayBad = () => {
  let str = "";
  badList = task_list.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += ` <tr>
  <td>${i + 1}</td>
  <td>${item.task}</td>
  <td>${item.time}</td>
  <td class="text-end">
  <button onclick="handleOnSwitch( '${
    item.id
  }', 'entry')" class="btn btn-warning"><i class="fa-solid fa-arrow-left"></i></i></i>
  </button>
    <button onclick="handleOnDelete('${
      item.id
    }')" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></i>
    </button>
    
  </td>
  </tr>`;
  });
  badtaskListElm.innerHTML = str;
  ttl_bad_hour = totalhour(badList);
  bad_hourElm.innerHTML = ttl_bad_hour;
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this task")) {
    task_list = task_list.filter((item) => item.id !== id);
    display();
    displayBad();
  }
};
const handleOnSwitch = (id, type) => {
  if (window.confirm("Are you sure you want to move this task")) {
    task_list.forEach((item) => {
      if (item.id == id) {
        item.type = type;
      }
    });
    display();
    displayBad();
  }
};
const ranStr = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const randomString = () => {
  const strlength = 6;
  let str = "";
  for (let i = 0; i < strlength; i++) {
    str += ranStr[Math.floor(Math.random() * ranStr.length)];
  }
  return str;
};

const totalhour = (list) => {
  var sum = list.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.time);
  }, 0);
  return sum;
};
