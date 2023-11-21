document.addEventListener('DOMContentLoaded', function () {
    const scratchCard = document.getElementById('scratchCard');
    const scratchLayer = document.getElementById('scratchLayer');
    const ctx = scratchLayer.getContext('2d');

    // 刮前的底图
    const backgroundImage = new Image();
    backgroundImage.src = 'https://raw.githubusercontent.com/UX7HQ/ScratchGame/main/780.jpg'; // 替换为刮前的完整图案路径

    backgroundImage.onload = function() {
        ctx.drawImage(backgroundImage, 0, 0, scratchLayer.width, scratchLayer.height);
    };

    // 刮后显示的图案
    const congratulationsImage = new Image();
    congratulationsImage.src = 'https://raw.githubusercontent.com/UX7HQ/ScratchGame/main/UX7TRY.png'; // 替换为刮后显示的 "恭喜中奖" 图案路径

    // 记录用户刮的次数
    let scratchCount = 0;

    // 添加刮开效果
    let isDrawing = false;

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

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
        ctx.fill();
    }

    function stopDrawing() {
        isDrawing = false;
        scratchCount++;

        if (scratchCount === 1) {
            // 第一次刮开，显示 "很遗憾，再试一次"
            alert('很遗憾，再试一次');
        } else if (scratchCount === 2) {
            // 第二次刮开，显示 "恭喜中奖"
            ctx.clearRect(0, 0, scratchLayer.width, scratchLayer.height);
            ctx.drawImage(congratulationsImage, 0, 0, scratchLayer.width, scratchLayer.height);
            alert('恭喜中奖');
        }
    }
});
