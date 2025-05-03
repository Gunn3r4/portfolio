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

// Make alertWindow draggable
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