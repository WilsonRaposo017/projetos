document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".fraction-box");
    boxes.forEach((box, index) => {
        box.style.opacity = 0;
        box.style.transform = "translateY(20px)";
        setTimeout(() => {
            box.style.transition = "all 0.5s ease";
            box.style.opacity = 1;
            box.style.transform = "translateY(0)";
        }, index * 100);
    });
});
