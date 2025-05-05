// DRAGGABLE ICON GRID SETUP
const gridSize = 88;
const gridTop = 16;
const gridLeft = 20;
const icons = document.querySelectorAll('.icon');

// Snap icons to grid on load
icons.forEach(icon => {
  const top = parseInt(icon.style.top, 10);
  const left = parseInt(icon.style.left, 10);
  const snappedTop = Math.round((top - gridTop) / gridSize) * gridSize + gridTop;
  const snappedLeft = Math.round((left - gridLeft) / gridSize) * gridSize + gridLeft;
  icon.style.top = `${snappedTop}px`;
  icon.style.left = `${snappedLeft}px`;
});

icons.forEach(icon => {
  let offsetX, offsetY;
  let dragging = false;
  let moved = false;

  icon.addEventListener('pointerdown', e => {
    e.preventDefault();
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;
    dragging = true;
    moved = false;
    icon.style.cursor = 'move';

    const onPointerMove = e => {
      if (!dragging) return;
      const rawX = e.clientX - offsetX;
      const rawY = e.clientY - offsetY;
      const snappedX = Math.round((rawX - gridLeft) / gridSize) * gridSize + gridLeft;
      const snappedY = Math.round((rawY - gridTop) / gridSize) * gridSize + gridTop;

      const isOccupied = Array.from(icons).some(other => {
        if (other === icon) return false;
        return other.style.left === `${snappedX}px` && other.style.top === `${snappedY}px`;
      });

      if (!isOccupied) {
        icon.style.left = `${snappedX}px`;
        icon.style.top = `${snappedY}px`;
      }

      moved = true;
    };

    const onPointerUp = () => {
      dragging = false;
      icon.style.cursor = 'default';
      if (moved) {
        icon.dataset.preventClick = 'true';
        setTimeout(() => {
          icon.dataset.preventClick = 'false';
        }, 100);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  });

  icon.addEventListener('click', e => {
    if (icon.dataset.preventClick === 'true') {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});

// START MENU LOGIC
function toggleStartMenu() {
  const menu = document.getElementById('startDropdown');
  const visible = menu.style.display === 'block';
  document.querySelectorAll('.start-dropdown').forEach(el => el.style.display = 'none');
  menu.style.display = visible ? 'none' : 'block';
}

window.addEventListener('click', e => {
  const button = document.querySelector('.start-button');
  const dropdown = document.getElementById('startDropdown');
  if (!dropdown.contains(e.target) && !button.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// ALERT WINDOW FUNCTIONS
function showAlertBox() {
  document.getElementById('alertWindow').style.display = 'block';
}

function hideAlertBox() {
  document.getElementById('alertWindow').style.display = 'none';
}

// DRAGGABLE ALERT WINDOW
window.addEventListener('DOMContentLoaded', () => {
  const win = document.getElementById('alertWindow');
  const titleBar = win.querySelector('.title-bar');
  let isDragging = false, offsetX = 0, offsetY = 0;

  titleBar.addEventListener('pointerdown', e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  const onMove = e => {
    if (!isDragging) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  };

  const onUp = () => {
    isDragging = false;
  };

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
});
