// Draggable Desktop Icons
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('mousedown', function (e) {
    let shiftX = e.clientX - icon.getBoundingClientRect().left;
    let shiftY = e.clientY - icon.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      icon.style.left = pageX - shiftX + 'px';
      icon.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    icon.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      icon.onmouseup = null;
    };
  });

  icon.ondragstart = () => false;
});

// Alert Box Functions
function showAlertBox() {
  document.getElementById('alertWindow').style.display = 'block';
}

function hideAlertBox() {
  document.getElementById('alertWindow').style.display = 'none';
}

// Draggable Alert Window
window.addEventListener('DOMContentLoaded', () => {
  const win = document.getElementById('alertWindow');
  const titleBar = win.querySelector('.title-bar');
  let isDragging = false, offsetX = 0, offsetY = 0;

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

// index.js

function toggleStartMenu() {
  const startMenu = document.getElementById('startDropdown');
  const isVisible = startMenu.style.display === 'block';

  document.querySelectorAll('.start-dropdown').forEach(drop => {
    drop.style.display = 'none';
  });

  startMenu.style.display = isVisible ? 'none' : 'block';
}

function hideAlertBox() {
  document.getElementById('alertWindow').style.display = 'none';
}

function showAlertBox() {
  document.getElementById('alertWindow').style.display = 'block';
}

window.addEventListener('click', function (e) {
  const startButton = document.querySelector('.start-button');
  const startDropdown = document.getElementById('startDropdown');
  if (!startDropdown.contains(e.target) && !startButton.contains(e.target)) {
    startDropdown.style.display = 'none';
  }
});

// Grid snap dragging for desktop icons
const gridSize = 80;
const icons = document.querySelectorAll('.icon');

icons.forEach(icon => {
  let offsetX, offsetY;

  icon.addEventListener('mousedown', e => {
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;

    function onMouseMove(e) {
      let newLeft = Math.round((e.clientX - offsetX) / gridSize) * gridSize;
      let newTop = Math.round((e.clientY - offsetY) / gridSize) * gridSize;
      icon.style.left = newLeft + 'px';
      icon.style.top = newTop + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});
