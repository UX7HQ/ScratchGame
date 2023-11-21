document.addEventListener('DOMContentLoaded', function () {
    const scratchCard = document.getElementById('scratchCard');
    const scratchLayer = document.getElementById('scratchLayer');
    const ctx = scratchLayer.getContext('2d');
    let isDrawing = false;

    // 初始化刮刮乐图层
    ctx.fillStyle = '#808080'; // 设置底色，可以是刮刮乐图层的默认颜色
    ctx.fillRect(0, 0, scratchLayer.width, scratchLayer.height);

    // 监听鼠标或触摸事件
    scratchLayer.addEventListener('mousedown', startDrawing);
    scratchLayer.addEventListener('touchstart', startDrawing);

    scratchLayer.addEventListener('mousemove', draw);
    scratchLayer.addEventListener('touchmove', draw);

    scratchLayer.addEventListener('mouseup', stopDrawing);
    scratchLayer.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        const rect = scratchCard.getBoundingClientRect();
        const offsetX = x - rect.left;
        const offsetY = y - rect.top;

        ctx.globalCompositeOperation = 'destination-out'; // 设置为 destination-out 实现刮开效果
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
        ctx.fill();
    }

    function stopDrawing() {
        isDrawing = false;
    }
});
