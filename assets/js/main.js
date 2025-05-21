const images = document.querySelectorAll('.carousel__images');
const about__images = document.querySelectorAll('.carousel__images-about');
const production__item = document.querySelectorAll('.production__item');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const about__prev = document.getElementById('about__prev');
const about__next = document.getElementById('about__next');
const production__prev = document.getElementById('production__prev');
const production__next = document.getElementById('production__next');
let currentIndex = 0;

function updateCarousel(index) {
  images.forEach((img, i) => {
    if (i === index) {
      img.classList.add('carousel__images--active'); // Добавляем класс active
    } else {
      img.classList.remove('carousel__images--active'); // Убираем класс active
    }
  });
}
function updateCarouselAbout(index) {
  about__images.forEach((img, i) => {
    if (i === index) {
      img.classList.add('carousel__images--active'); // Добавляем класс active
    } else {
      img.classList.remove('carousel__images--active'); // Убираем класс active
    }
  });
}
function updateCarouselProduction(index) {
  production__item.forEach((img, i) => {
    if (i === index) {
      img.classList.add('production__item--active'); // Добавляем класс active
    } else {
      img.classList.remove('production__item--active'); // Убираем класс active
    }
  });
}

// Обработчики для кнопок переключения
prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel(currentIndex);
});

next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel(currentIndex);
});

about__prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + about__images.length) % about__images.length;
  updateCarouselAbout(currentIndex);
});

about__next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % about__images.length;
  updateCarouselAbout(currentIndex);
});
production__prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + about__images.length) % about__images.length;
  updateCarouselProduction(currentIndex);
});
production__next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % about__images.length;
  updateCarouselProduction(currentIndex);
});

// Добавляем возможность клика по изображению
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel(currentIndex);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.querySelector(".side-menu");

  // Устанавливаем текст "☰" в элемент гамбургера при загрузке
  hamburger.innerText = "☰";

  // Обработчик события клика на гамбургер
  hamburger.addEventListener("click", () => {
    sideMenu.classList.toggle("active"); // Добавляем или убираем активный класс для меню

    // Переключаем текст кнопки и класс активности
    if (sideMenu.classList.contains("active")) {
      hamburger.classList.add("hamburger--active"); // Добавляем активный класс
      hamburger.innerText = "✖"; // Меняем текст на крестик
    } else {
      hamburger.classList.remove("hamburger--active"); // Убираем активный класс
      hamburger.innerText = "☰"; // Возвращаем текст "☰"
    }
  });
});
