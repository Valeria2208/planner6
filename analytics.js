document.addEventListener("DOMContentLoaded", () => {

  // ===== CANVAS =====
  const donutCanvas = document.getElementById("donutChart")
  const barCanvas = document.getElementById("barChart")

  const donut = donutCanvas ? donutCanvas.getContext("2d") : null
  const bar = barCanvas ? barCanvas.getContext("2d") : null

  let progressMode = "deadlines"

  // ===== AVATAR =====
  const avatar = document.getElementById("avatar")
  const photo = localStorage.getItem("studentPhoto")

  if (avatar) {
    if (photo && photo.startsWith("data:image")) {
      avatar.src = photo
    } else {
      avatar.src = "https://via.placeholder.com/40"
    }
  }

  // ===== ДАННЫЕ =====
  function getRealStats() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []

    if (tasks.length === 0) {
      return [40, 20, 20, 20]
    }

    let study = 0, exam = 0, project = 0, personal = 0

    tasks.forEach(t => {
      const cat = t.category ? t.category.toLowerCase() : ""

      if (cat.includes("study")) study++
      else if (cat.includes("exam")) exam++
      else if (cat.includes("project")) project++
      else personal++
    })

    let total = tasks.length

    return [
      Math.round(study / total * 100),
      Math.round(exam / total * 100),
      Math.round(project / total * 100),
      Math.round(personal / total * 100)
    ]
  }

  // ===== ЛЕГЕНДА =====
  function updateLegend(data) {
    const s = document.getElementById("studyText")
    const e = document.getElementById("examText")
    const p = document.getElementById("projectText")
    const pe = document.getElementById("personalText")

    if (s) s.textContent = "Study " + data[0] + "%"
    if (e) e.textContent = "Exam " + data[1] + "%"
    if (p) p.textContent = "Project " + data[2] + "%"
    if (pe) pe.textContent = "Personal " + data[3] + "%"
  }

  // ===== DONUT =====
  function drawDonut(data) {
    if (!donut) return

    let progress = 0

    function animate() {
      donut.clearRect(0, 0, 220, 220)

      let colors = ["#2F80ED", "#EB5757", "#27AE60", "#F2C94C"]
      let start = -Math.PI / 2

      data.forEach((value, i) => {
        let angle = (value / 100) * 2 * Math.PI * progress

        donut.beginPath()
        donut.arc(110, 110, 80, start, start + angle)
        donut.strokeStyle = colors[i]
        donut.lineWidth = 40
        donut.lineCap = "round"
        donut.stroke()

        start += (value / 100) * 2 * Math.PI
      })

      progress += 0.04

      if (progress <= 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
    updateLegend(data)
  }

  // ===== BAR =====
  function drawBars(data) {
    if (!bar) return

    let progress = 0

    function animate() {
      bar.clearRect(0, 0, 500, 220)

      data.forEach((value, i) => {
        let x = i * 90 + 40
        let height = value * 30 * progress
        let y = 200 - height

        bar.fillStyle = "#7a5524"
        bar.fillRect(x, y, 50, height)
      })

      progress += 0.04

      if (progress <= 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // ===== ОБНОВЛЕНИЕ =====
  function updateCharts() {

    let stats

    if (progressMode === "deadlines") {
      stats = getRealStats()
    } else {
      stats = [
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100)
      ]
    }

    drawDonut(stats)

    drawBars([
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6)
    ])
  }

  // ===== RADIO =====
  document.querySelectorAll("input[name='progress']").forEach(radio => {
    radio.addEventListener("change", e => {
      progressMode = e.target.value
      updateCharts()
    })
  })

  // ===== СТАРТ =====
  updateCharts()

})


// ===== ACTIVE LINK =====
const links = document.querySelectorAll('nav a')
const currentPage = window.location.pathname.split('/').pop()

links.forEach(link => {
  const linkPage = link.getAttribute('href')
  if (linkPage === currentPage) {
    link.classList.add('active')
  }
})