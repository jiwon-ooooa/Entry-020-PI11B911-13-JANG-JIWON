window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0); // 새로고침 시 스크롤을 맨 위로 이동
});

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.pageX}px`;
    cursor.style.top = `${event.pageY}px`;
});

document.addEventListener("scroll", () => {
    const hiddenSection = document.querySelector(".entrancehidden");
    const entrancemain = document.querySelector(".entrancemain");
    const scrollY = window.scrollY;

    // 스크롤 위치에 따라 투명도 조정
    if (scrollY > 0) {
        hiddenSection.classList.add("active");
    } else {
        hiddenSection.classList.remove("active");
    }
});