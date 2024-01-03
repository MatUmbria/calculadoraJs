// obtendo os elementos da página html
const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

// array com as teclas permitidas
const allowedKeys = ["(", ")", "/", "-", "*", "+", ".", "%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"]

// obtendo as teclas pelo clique na tela e adicionando a calculadora
document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener('click', function () {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

// obtendo o clique no Clear e limpando a calculadora
document.getElementById('clear').addEventListener('click', function () {
  input.value = ''
  input.focus()
})

// obtendo os caracteres (somente os permitidos) pelo teclado, apagando pelo teclado e calcular com enter
input.addEventListener('keydown', function(ev) {
  ev.preventDefault()
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  if (ev.key === 'Backspace') {
    input.value = input.value.slice(0, -1)
  }
  if (ev.key === 'Enter') {
    calculate()
  }
})

// calcular clicando em =
document.getElementById('equal').addEventListener('click', calculate)

// função de cálculo
function calculate() {
  resultInput.value = "ERROR"
  resultInput.classList.add("error")
  const result = eval(input.value)
  resultInput.value = result
  resultInput.classList.remove("error")
}

document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
  const button = ev.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})

// funcionalidade do botão para trocar o tema
document.getElementById('themeSwitcher').addEventListener('click', function() {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#1b5668')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dd5ff')
    main.dataset.theme = 'dark'
  }
})