const C_Slider = document.querySelector('#carousel-slider');
const arrowBtn = document.querySelectorAll('#d7 span');
const C_Item_Width = C_Slider.querySelector(".carousel-item").offsetWidth;
const CarouselChildrens = [...C_Slider.children];


let isDragging = false, startX, startScrollLeft;

// Get the number of the cards that can fit in the carousel at once
let cardPreView = Math.round(C_Slider.offsetWidth / C_Item_Width);
// console.log(cardPreView)

//insert copies of the last few cards to beginning of carousel for infite scrolling
CarouselChildrens.slice(-cardPreView).reverse().forEach(card => {
    C_Slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//insert copies of the last few cards to beginning of carousel for infite scrolling
CarouselChildrens.slice(0, cardPreView).forEach(card => {
    C_Slider.insertAdjacentHTML("beforeend", card.outerHTML);
});



// add event liseners for the arrow buttons to scroll the carousel left and right
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

const infiniteScroll = () => {

    if (C_Slider.scrollLeft === 0) {
        console.log("Reached the left end")
        C_Slider.scrollLeft = C_Slider.scrollWidth - (2 * C_Slider.offsetWidth);
    } else if (C_Slider.scrollLeft >= C_Slider.scrollWidth - C_Slider.offsetWidth) {
        console.log("Reached the Right end");
        C_Slider.scrollLeft = C_Slider.offsetWidth;
    };

}


C_Slider.addEventListener("mousedown", dragStart);
C_Slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
C_Slider.addEventListener("scroll", infiniteScroll);