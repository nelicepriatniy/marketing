const selectColor = document.querySelectorAll('.hero .wrapper .item')
let currentColor = 'perpl'
const colorElems = document.querySelectorAll('.color-el')
const colorTarifs = document.querySelectorAll('.tarifs .wrapper')
const swiperTabs = document.querySelectorAll('.portfolio .tabs-wrapper .item');
const seti = document.querySelectorAll('.contacts .item')


selectColor.forEach((el) => {
  el.onclick = () => {

    seti.forEach((el) => {

      el.classList.remove(currentColor)
    })
    swiperTabs.forEach((el) => {

      el.classList.remove(currentColor)
    })
    document.querySelector('.plusses').classList.remove(currentColor)
    selectColor.forEach((el) => { el.classList.remove('active') })
    el.classList.add('active')
    currentColor = el.getAttribute('data-color')
    colorElems.forEach((el) => {
      if (el.classList.contains(currentColor)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
    colorTarifs.forEach((el) => {
      if (el.getAttribute('data-color') === currentColor) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
    swiperTabs.forEach((el) => {

      el.classList.add(currentColor)
    })
    seti.forEach((el) => {

      el.classList.add(currentColor)
    })
    document.querySelector('.plusses').classList.add(currentColor)
    console.log(currentColor)
  }
  el.addEventListener('mouseover', () => {
    if (!el.classList.contains('active')) document.querySelector('.hero .hero-balloon').classList.add('no-animation')
  })
  el.addEventListener('mouseleave', () => {
    document.querySelector('.hero .hero-balloon').classList.remove('no-animation')
  })
})




const portfolioSlider = new Swiper('.portfolio-slider', {
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,

  on: {
    click(swiper, event) {
      const clickedSlide = event.target.closest('.swiper-slide');
      if (!clickedSlide) return;

      // Получаем реальный индекс слайда (Swiper сам проставляет data-swiper-slide-index)
      const clickedRealIndex = +clickedSlide.getAttribute('data-swiper-slide-index');
      const activeRealIndex = swiper.realIndex;

      // Если клик по активному — ничего не делаем
      if (clickedRealIndex === activeRealIndex) return;

      // Перелистываем к кликнутому слайду
      swiper.slideToLoop(clickedRealIndex);
    },
  },
});





const swiperSlidesTabs = document.querySelectorAll('.portfolio .portfolio-slides')
const swiperWrapper = document.querySelector('.portfolio .swiper-wrapper')


function createPortfolioSlider() {
  return new Swiper('.portfolio-slider', {
    spaceBetween: 20,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,

    on: {
      click(swiper, event) {
        const clickedSlide = event.target.closest('.swiper-slide')
        if (!clickedSlide) return

        const clickedRealIndex = +clickedSlide.getAttribute('data-swiper-slide-index')
        const activeRealIndex = swiper.realIndex
        if (clickedRealIndex === activeRealIndex) return

        swiper.slideToLoop(clickedRealIndex)
      },
    },
  })
}

swiperTabs.forEach((tab) => {
  tab.onclick = () => {
    // Уничтожаем текущий слайдер
    if (portfolioSlider) {
      portfolioSlider.destroy(true, true)
    }

    // Определяем текущую вкладку
    const currentTab = tab.getAttribute('data-p')

    // Убираем active со всех и добавляем текущему
    swiperTabs.forEach((t) => t.classList.remove('active'))
    tab.classList.add('active')

    // Находим соответствующий список слайдов
    let slidesList = []
    swiperSlidesTabs.forEach((slidesBlock) => {
      if (slidesBlock.getAttribute('data-p') === currentTab) {
        slidesList = Array.from(slidesBlock.children).map((child) =>
          child.cloneNode(true)
        )
      }
    })

    // Очищаем обёртку и вставляем новые слайды
    swiperWrapper.innerHTML = ''
    slidesList.forEach((child) => swiperWrapper.append(child))

    // Переинициализируем слайдер заново
    portfolioSlider = createPortfolioSlider()
  }
})

const paymentModal = document.querySelector('.payment-modal')
const paymentOpen = document.querySelectorAll('.payment-open')
const popups = document.querySelectorAll('.popup')
const closePopups = document.querySelector('.closePopups')
const paymentClose = document.querySelectorAll('.payment-close')

paymentOpen.forEach((el) => {
  el.onclick = () => {
    paymentModal.classList.add('active')
    closePopups.classList.add('active')
  }
})
paymentClose.forEach((el) => {
  el.onclick = () => {
    paymentModal.classList.remove('active')
    closePopups.classList.remove('active')
  }
})


closePopups.onclick = () => {
  closePopups.classList.remove('active')
  popups.forEach((el) => {
    el.classList.remove('active')
  })
}
