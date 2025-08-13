// 获取DOM元素
const windowElement = document.getElementById('window');
const titleBar = document.getElementById('titleBar');
const minimizeBtn = document.getElementById('minimizeBtn');
const maximizeBtn = document.getElementById('maximizeBtn');
const closeBtn = document.getElementById('closeBtn');

// 窗口拖动功能
let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    windowElement.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    
    // 计算新位置
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    // 限制窗口不超出视口
    const maxX = window.innerWidth - windowElement.offsetWidth;
    const maxY = window.innerHeight - windowElement.offsetHeight;
    
    windowElement.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    windowElement.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
}

function stopDrag() {
    isDragging = false;
    windowElement.style.cursor = 'grab';
}

// 窗口控制按钮功能
minimizeBtn.addEventListener('click', () => {
    windowElement.classList.toggle('minimized');
});

maximizeBtn.addEventListener('click', () => {
    windowElement.classList.toggle('maximized');
    if (windowElement.classList.contains('maximized')) {
        maximizeBtn.innerHTML = '<i class="fa fa-window-restore text-sm"></i>';
    } else {
        maximizeBtn.innerHTML = '<i class="fa fa-window-maximize text-sm"></i>';
    }
});

closeBtn.addEventListener('click', () => {
    if (confirm('确定要关闭窗口吗？')) {
        windowElement.style.opacity = '0';
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300);
    }
});

// 初始样式设置
windowElement.style.position = 'absolute';
windowElement.style.cursor = 'grab';
windowElement.style.maxWidth = '600px';
windowElement.style.width = '100%';