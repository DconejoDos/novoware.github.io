const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;
//Cantidad de cards que caben en el carrusel a la vez
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insertar copias de las últimas cards al comienzo del carrusel para dar un desplazamiento infinito
carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
// Insertar copias de las primeras cards hasta el final del carrusel para un desplazamiento infinito
carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Desplazarse por el carrusel hasta la osición adecuada para ocultar las cards
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Agregando eventos para los botones de las flechas para desplazar el carrusel hacia la izquierda o derecha
arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft +=
            btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Registrando el cursor inicial y la posición de desplazamiento del carrusel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
    if (!isDragging) return; // si dragging es falso regresar desde aquí
    // Actualiza la posición de deplazamiento del carrusel según el movimiento del cursor
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
    // Si el carrusel esta al principio se desplaza al final
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Si el carrusel esta al final se desplaza al principio
    else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
    ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Limpiar el tiempo de espera existente e iniciar la reproducción automatica si el mouse no se encuentra sobre el carrusel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Retorna si la ventana es menor que 800 o si autoplay es falso
    // Reproducción automatica del carrusel cada 2500 ms
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
