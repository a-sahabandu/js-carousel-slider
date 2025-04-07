class Carousel {
  constructor(
    containerSelector,
    carouselSelector,
    cardSelector,
    buttonSelectors,
    options = {}
  ) {
    this.carousel = document.querySelector(carouselSelector);
    this.container = document.querySelector(containerSelector);
    this.card = this.carousel.querySelector(cardSelector); // Get the card element
    this.buttons = document.querySelectorAll(buttonSelectors);
    this.isDragging = false;
    this.startX = 0;
    this.startScrollLeft = 0;
    this.timeoutId = null;
    this.cardWidth = this.card ? this.card.offsetWidth : 0; // Get card width dynamically
    this.cardPerView = Math.round(this.carousel.offsetWidth / this.cardWidth);

    // Options
    this.enableDragging = options.enableDragging ?? true;
    this.enableInfinityScroll = options.enableInfinityScroll ?? true;
    this.enableArrowButtons = options.enableArrowButtons ?? true;
    this.enableAutoPlay = options.enableAutoPlay ?? true;
    this.autoPlayInterval = options.autoPlayInterval ?? 2000;
    this.disableAutoPlayWidth = options.disableAutoPlayWidth ?? 320;

    this.init();
  }

  init() {
    if (this.enableInfinityScroll) this.cloneCards();
    this.addEventListeners();
    if (this.enableAutoPlay) this.autoPlay();
  }

  cloneCards() {
    const children = [...this.carousel.children];

    children
      .slice(-this.cardPerView)
      .reverse()
      .forEach((card) => {
        this.carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

    children.slice(0, this.cardPerView).forEach((card) => {
      this.carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
  }

  dragStart(e) {
    if (!this.enableDragging) return;
    this.isDragging = true;
    this.carousel.classList.add("dragging");
    this.startX = e.pageX;
    this.startScrollLeft = this.carousel.scrollLeft;
  }

  dragging(e) {
    if (!this.isDragging || !this.enableDragging) return;
    this.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
  }

  dragStop() {
    if (!this.enableDragging) return;
    this.isDragging = false;
    this.carousel.classList.remove("dragging");
  }

  infinityScroll() {
    if (!this.enableInfinityScroll) return;

    if (this.carousel.scrollLeft <= 0) {
      this.carousel.classList.add("no-transitions");
      this.carousel.scrollLeft =
        this.carousel.scrollWidth - 2 * this.carousel.offsetWidth;
      this.carousel.classList.remove("no-transitions");
    } else if (
      Math.abs(
        this.carousel.scrollLeft -
          (this.carousel.scrollWidth - this.carousel.offsetWidth)
      ) < 1
    ) {
      this.carousel.classList.add("no-transitions");
      this.carousel.scrollLeft = this.carousel.offsetWidth;
      this.carousel.classList.remove("no-transitions");
    }
    clearTimeout(this.timeoutId);
    if (!this.container.matches(":hover")) this.autoPlay();
  }

  autoPlay() {
    if (!this.enableAutoPlay || window.innerWidth < this.disableAutoPlayWidth)
      return;
    this.timeoutId = setTimeout(
      () => (this.carousel.scrollLeft += this.cardWidth),
      this.autoPlayInterval
    );
  }

  addEventListeners() {
    if (this.enableDragging) {
      this.carousel.addEventListener("mousedown", (e) => this.dragStart(e));
      this.carousel.addEventListener("mousemove", (e) => this.dragging(e));
      this.carousel.addEventListener("mouseup", () => this.dragStop());
    }
    if (this.enableInfinityScroll) {
      this.carousel.addEventListener("scroll", () => this.infinityScroll());
    }
    if (this.enableAutoPlay) {
      this.container.addEventListener("mouseenter", () =>
        clearTimeout(this.timeoutId)
      );
      this.container.addEventListener("mouseleave", () => this.autoPlay());
    }
    if (this.enableArrowButtons) {
      this.buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.carousel.scrollLeft +=
            btn.id === "left" ? -this.cardWidth : this.cardWidth;
        });
      });
    }
  }
}

// Initialize the carousel with feature toggles
// new Carousel(".carousel-slider", ".carousel-container", "button", {
//     enableDragging: true,
//     enableInfinityScroll: true,
//     enableArrowButtons: true,
//     enableAutoPlay: true,
//     autoPlayInterval: 3000, // Set autoplay interval in milliseconds
//     disableAutoPlayWidth: 480 // Disable autoplay for screens smaller than this width
// });
