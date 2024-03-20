<script>
    const C_Slider = document.querySelector('#carousel-slider');
    const arrowBtn = document.querySelectorAll('#d7 span');
    const C_Item_Width = C_Slider.querySelector(".carousel-item").offsetWidth;

    let isDragging = false, startX, startScrollLeft;

        arrowBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.id);
            C_Slider.scrollLeft += btn.id === "next" ? -C_Item_Width : C_Item_Width;
        });
        });

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