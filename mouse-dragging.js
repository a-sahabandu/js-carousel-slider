<script>
    const C_Slider = document.querySelector('#carousel-slider');

    let isDragging = false, startX, startScrollLeft;

const dragStart = (e) => {
        isDragging = true;
    C_Slider.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = C_Slider.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    C_Slider.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragStop = () => {
        isDragging = false;
    C_Slider.classList.remove("dragging");
}
    C_Slider.addEventListener("mousedown", dragStart);
    C_Slider.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
</script>