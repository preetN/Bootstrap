var task_list = [];
var entryList = [];
var badList = [];
const handleOnSubmit = (e) => {
  const form = new FormData(e);
  const task = form.get("item");
  const time = form.get("time");
  const obj = { task, time, type: "entry", id: randomString() };
  task_list.push(obj);
  display(entryList);
  console.log(obj);
};
let taskListElm = document.getElementById("good-task");
let badtaskListElm = document.getElementById("bad-task");
const display = () => {
  let str = "";

  entryList = task_list.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += ` <tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.time}</td>
<td class="text-end">
  <button onclick="handleOnDelete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></i>
  </button>
  <button onclick="handleOnSwitch(${
    item.id
  }, 'bad')" class="btn btn-success"><i class="fa-solid fa-arrow-right"></i></i></i>
  </button>
</td>
</tr>`;
  });
  taskListElm.innerHTML = str;
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
  <button onclick="handleOnSwitch( ${
    item.id
  }, 'entry')" class="btn btn-warning"><i class="fa-solid fa-arrow-left"></i></i></i>
  </button>
    <button onclick="handleOnDelete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></i>
    </button>
    
  </td>
  </tr>`;
  });
  badtaskListElm.innerHTML = str;
};
const handleOnDelete = (index) => {
  if (window.confirm("Are you sure you want to delete this task")) {
    task_list.splice(index, 1);
    display(task_list);
    displayBad();
  }
};
const handleOnSwitch = (i, type) => {
  if (window.confirm("Are you sure you want to move this task")) {
    task_list[i].type = type;
    display();
    displayBad();
  }
};
const ranStr = ["qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"];
const randomString = () => {};
