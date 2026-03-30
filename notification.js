// элементы
const okBtn = document.getElementById("okBtn");
const closeBtn = document.getElementById("closeBtn");

// одна функция для обеих кнопок
function goBack() {
  if (document.referrer) {
    window.location.href = document.referrer;
  } else {
    window.history.back();
  }
}

// одинаковое поведение
okBtn.addEventListener("click", goBack);
closeBtn.addEventListener("click", goBack);

