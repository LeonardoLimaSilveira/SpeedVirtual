const priceItens = document.querySelectorAll('.price-items')

function callback(event) {
  priceItens.forEach(item => {
    item.classList.remove('ativo')
  })
  event.currentTarget.classList.add('ativo')
}

priceItens.forEach(item => {
  item.addEventListener('click', callback)
})

const titleFaq = document.querySelectorAll('.faq-text h4')

function activeFaq(event) {
  this.classList.toggle('active')
  this.nextElementSibling.classList.toggle('active')
}

titleFaq.forEach(item => {
  item.addEventListener('click', activeFaq)
})

const linksInternos = document.querySelectorAll('a[href^="#"]')

function scrollSuave(event) {
  event.preventDefault()
  const href = event.currentTarget.getAttribute('href')
  const link = document.querySelector(href)
  link.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
linksInternos.forEach(item => {
  item.addEventListener('click', scrollSuave)
})

function subirTela() {
  window.scrollTo({
    top: top,
    behavior: 'smooth'
  })
}
function noButton() {
  if (window.scrollY <= 100) {
    document.querySelector('.scrollButton').style.display = 'none'
  } else {
    document.querySelector('.scrollButton').style.display = 'block '
  }
}

window.addEventListener('scroll', noButton)

function initModal() {
  const openButton = document.querySelector('[data-modal="open"]')

  const closeButton = document.querySelector('[data-modal="close"]')

  const modalContainer = document.querySelector('[data-modal="container"]')

  if (openButton && closeButton && modalContainer) {
    function openModal(event) {
      event.preventDefault()
      modalContainer.classList.toggle('ativo')
    }

    function closeModal(event) {
      event.preventDefault()
      if (event.target === this) {
        modalContainer.classList.remove('ativo')
      }
    }
    openButton.addEventListener('click', openModal)
    closeButton.addEventListener('click', openModal)
    modalContainer.addEventListener('click', closeModal)
  }
}
initModal()

const dropdownMenus = document.querySelectorAll('[data-dropdown]')
dropdownMenus.forEach(menu => {
  ;['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick)
  })
})

function handleClick(event) {
  event.preventDefault()
  this.classList.toggle('active')
  outsideClick(this, ['touchstart', 'click'], () => {
    this.classList.remove('active')
  })
}
function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      html.addEventListener(userEvent, handleOutsideClick)
    })
    element.setAttribute(outside, '')
  }
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside)
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOutsideClick)
      })
      callback()
    }
  }
}

const menuButton = document.querySelector('[data-menu="button"]')

const menuList = document.querySelector('[data-menu="list"]')

function openMobile(event) {
  menuList.classList.toggle('active')
}

menuButton.addEventListener('click', openMobile)

const agora = new Date()

const funcionamento = document.querySelector('[data-semana]')

const diasSemana = funcionamento.dataset.semana.split(',').map(Number)
const horarioSemana = funcionamento.dataset.horario.split(',').map(Number)

const dataAgora = new Date()
const diaAgora = dataAgora.getDay()
const horarioAgora = dataAgora.getHours()

const semanaAberto = diasSemana.indexOf(diaAgora) !== -1

const horarioAberto =
  horarioAgora >= horarioSemana[0] && horarioAgora < horarioSemana[1]

if (semanaAberto && horarioAberto) {
  funcionameneto.classList.add('aberto')
}

const login = document.querySelector('.login')
const password = document.querySelector('.password')
function handleChange(event) {
  const target = event.target

  if (!target.checkValidity()) {
    target.classList.add('invalid')
    password.setAttribute('disabled', 'disabled')
  } else {
    password.removeAttribute('disabled')
  }
}

login.addEventListener('change', handleChange)

const url = 'https://blockchain.info/ticker'
const spanBTC = document.querySelector('.btc')

fetch(url).then(r => {
  r.json().then(btc => {
    spanBTC.innerText = (100 / btc.BRL.buy).toFixed(5)
  })
})
