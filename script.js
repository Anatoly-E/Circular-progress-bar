const progressbar = document.querySelector(".progressbar");
let progress = 0;

const enableProgressBar = () => {
  progressbar.setAttribute("role", "progressbar");
  progressbar.setAttribute("aria-valuenow", progress);
  progressbar.setAttribute("aria-live", "polite");
};

enableProgressBar();

// Симуляция ввода значения в progress bar при нажатии на кнопки
const testingGround = document.querySelector(".testing-ground");
let interval = null;

function simulateProgress(newProgressValue) {
  clearInterval(interval);
  if (newProgressValue == "fake-upload") {
    simulateUpload();
  } else {
    updateProgress(newProgressValue);
  }
}

testingGround.addEventListener("click", e => {
  if (!e.target.closest("button")) return;

  progress = e.target.dataset.progress;
  simulateProgress(progress);
});

function updateProgress(progress) {
  progressbar.setAttribute("aria-valuenow", progress);
  progressbar.style.setProperty("--progress", progress + "%");
}

function simulateUpload() {
  progressbar.setAttribute("aria-busy", "true");
  let progress = 0;
  updateProgress(progress);

  intervalTimer = setInterval(() => {
    progress += 1;
    updateProgress(progress);
    if (progress == 100) {
      progressbar.setAttribute("aria-busy", "false");
      clearInterval(intervalTimer);
    }
  }, 100);
}
