document.addEventListener("DOMContentLoaded", () => {

  // ===== АВАТАР =====
  const avatar = document.getElementById("avatar");
  const savedAvatar = localStorage.getItem("studentPhoto");

  if (avatar) {
    if (savedAvatar && savedAvatar.startsWith("data:image")) {
      avatar.src = savedAvatar;
    } else {
      avatar.src = "https://via.placeholder.com/40";
    }
  }

  // твой код
  showDay("mon");

});
function addTask() {

  const input = document.getElementById("taskInput");
  const day = document.getElementById("daySelect").value;
  const category = document.getElementById("categorySelect").value;
  const deadlineInput = document.getElementById("deadlineInput");

  const text = input.value.trim();
  const deadline = deadlineInput.value;

  if (!text || !deadline) {
    alert("Введите задачу и дату");
    return;
  }

  // ===== СОХРАНЯЕМ В РАСПИСАНИЕ =====
  let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

  schedule.push({
    text: text,
    day: day,
    category: category,
    deadline: deadline
  });

  localStorage.setItem("schedule", JSON.stringify(schedule));

  // ===== СОХРАНЯЕМ В ПЛАНЕР =====
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    subject: text,
    deadline: deadline,
    done: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // очистка
  input.value = "";
  deadlineInput.value = "";

  showDay(day);
}

// ===== ПОКАЗ ДНЯ =====
function showDay(day) {

  const container = document.getElementById("scheduleContent");

  let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

  const filtered = schedule.filter(t => t.day === day);

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No tasks</p>";
    return;
  }

  filtered.forEach((task, index) => {

    let color = "";

    if (task.category === "study") color = "#2F80ED";
    if (task.category === "exam") color = "#EB5757";
    if (task.category === "project") color = "#27AE60";
    if (task.category === "personal") color = "#F2C94C";

    const div = document.createElement("div");

    div.style.padding = "12px";
    div.style.margin = "10px 0";
    div.style.background = color;
    div.style.color = "#fff";
    div.style.borderRadius = "10px";
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";

    div.innerHTML = `
      <span>${task.text} (${task.category})</span>
      <span>${formatDate(task.deadline)}</span>
      <button onclick="deleteTask(${index})" style="border:none; background:none; color:white; cursor:pointer;">❌</button>
    `;

    container.appendChild(div);
  });
}


// ===== УДАЛЕНИЕ =====
function deleteTask(index) {

  let schedule = JSON.parse(localStorage.getItem("schedule")) || [];
  let plannerTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const deleted = schedule[index];

  schedule.splice(index, 1);

  // удаляем и из planner
  plannerTasks = plannerTasks.filter(t => t.subject !== deleted.text);

  localStorage.setItem("schedule", JSON.stringify(schedule));
  localStorage.setItem("tasks", JSON.stringify(plannerTasks));

  showDay("mon");
}


// ===== ФОРМАТ ДАТЫ =====
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}


// ===== ЕСЛИ НЕТ ДАТЫ =====
function getFakeDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split("T")[0];
}


// ===== ACTIVE LINK =====
const links = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split("/").pop() || "planner.html";

links.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (currentPage.includes(linkPage)) {
    link.classList.add("active");
  }
});


// ===== AVATAR SMALL =====
const avatarSmall = document.getElementById("avatarSmall");
let photo = localStorage.getItem("studentPhoto");

if (avatarSmall) {
  if (photo && photo !== "default") {
    avatarSmall.src = photo;
  } else {
    avatarSmall.removeAttribute("src");
    avatarSmall.style.background = "#8B5E2E";
    avatarSmall.textContent = "👤";
  }
}



