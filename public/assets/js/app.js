const addTaskForm = document.getElementById("addTaskForm");

async function getUsername() {
  try {
    const username = await fetch("./../../api/users/user.php")
      .then((res) => res.json())
      .then((data) => data.name);

    document.getElementById("username-greeting").innerText = username;
  } catch (err) {
    console.log(err);
  }
}

getUsername();
cargarTareas();

addTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(addTaskForm);
  document.getElementById("new-task-input").value = "";

  await fetch("./../../api/tasks/create.php", {
    method: "POST",
    body: datos,
  });
  cargarTareas();
  console.log("Tarea agregada");
});

async function cargarTareas() {
  const response = await fetch("./../../api/tasks/read.php");
  const tareas = await response.json();

  renderList(tareas);

}

function renderList(list) {
  ul = document.getElementById("task-list");

  ul.innerHTML = "";
  list.forEach((i) => {
    ul.appendChild(listItem(i));
  });
}

function listItem(item) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const div = document.createElement("div");
  const completedButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  li.classList.add("task-item");

  p.innerText = item.titulo;
  completedButton.innerText = "✅";
  editButton.innerText = "✏️";
  deleteButton.innerText = "❌";

  if (item.completada === "t") {
    li.classList.add("completed");
  }

  completedButton.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleCompleted(item.id);
  });

  editButton.addEventListener("click", () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const submit = document.createElement("button");

    form.append(input, submit);
    form.classList.add("task-editing");

    input.placeholder = item.titulo;
    submit.type = "submit";
    submit.innerText = "Guardar";

    li.innerHTML = "";
    li.appendChild(form);

    submit.addEventListener("click", (e) => {
      e.preventDefault();

      if (input.value !== "") {
        updateTask(item.id, input.value);
      } else {
        li.replaceWith(listItem(item));
        return;
      }
      const newListItem = listItem({ ...item, titulo: input.value });
      li.replaceWith(newListItem);
    });
  });
  deleteButton.addEventListener("click", () => {
    ul = document.getElementById("task-list");
    ul.removeChild(li);
    deleteTask(item.id);
  });

  div.classList.add("task-buttons");
  div.append(completedButton, editButton, deleteButton);
  li.append(p, div);

  return li;
}

function toggleCompleted(id) {
  const datos = new FormData();
  datos.append("id", id);

  fetch("./../../api/tasks/toggle_completed.php", {
    method: "POST",
    body: datos,
  });
}

async function updateTask(id, titulo) {
  const datos = new FormData();
  datos.append("id", id);
  datos.append("titulo", titulo);

  await fetch("./../../api/tasks/update.php", {
    method: "POST",
    body: datos,
  });
}

function deleteTask(item_id) {
  const datos = new FormData();
  datos.append("id", item_id);

  fetch("./../../api/tasks/delete.php", {
    method: "POST",
    body: datos,
  });
}
