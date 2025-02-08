document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector('.cursor');

    if (!cursor) {
        console.error("❌ '.cursor' 요소를 찾을 수 없습니다!");
        return;
    }

    console.log("✅ .cursor 요소 찾음:", cursor);

    document.addEventListener('mousemove', (event) => {
        cursor.style.left = `${event.pageX}px`;
        cursor.style.top = `${event.pageY}px`;
    });
});
