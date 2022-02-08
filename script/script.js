const DEFAULT_COLOR = 'black'
const DEFAULT_SIZE = 16*16
let color = DEFAULT_COLOR
let container = document.querySelector('.container')
let contWidth = container.clientWidth
let btn = document.querySelector('#clear')
let slider = document.querySelector('#slider')
let sizing = document.querySelector('#sizing')
let eraserBtn = document.querySelector('#eraser')
let colorBtn = document.querySelector('#color')
let rainbow = document.querySelector('#rainbow')
let colorPicker = document.querySelector('#picker')
let currentColor = DEFAULT_COLOR
let mouseDown = false
let rain = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
createGrid()

function clearGrid(){
    let grid = document.querySelectorAll('.grid-element')
    grid.forEach(element => {
        element.remove()
    });
}

function createGrid(size = DEFAULT_SIZE) {
    for(let i = 1;i < size+1; i++){
        let div = document.createElement('div')
        div.classList.add('grid-element')
        div.style.width = `${contWidth / Math.sqrt(size)}px`
        div.style.height = `${contWidth / Math.sqrt(size)}px`
        div.addEventListener('mouseover', paint)
        div.addEventListener('mousedown', paint)
        container.appendChild(div)
    }
}

function setColor(setCol = DEFAULT_COLOR){
    color = setCol
}

eraserBtn.addEventListener('click', () => {
    rain = false
    setColor('white')
})

colorBtn.addEventListener('click', () => {
    rain = false
    setColor(colorPicker.value)
})

function rainbowMode(){
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    setColor(`rgb(${r}, ${g}, ${b})`)
}

rainbow.addEventListener('click', () => {
    rain = true
})

function renderGrid(size){
    clearGrid()
    createGrid(size)
}

function paint(e){
    if(e.type === 'mouseover' && !mouseDown){
        return
    } else if(mouseDown || e.type === 'mousedown'){
        if(rain){
            rainbowMode()
            e.target.style.background = color
        }
        e.target.style.background = color
    }
}

function clear(){
    let divGrid = document.querySelectorAll('.grid-element')
    divGrid.forEach(div => {
        div.style.background = 'white'
    });
}

btn.addEventListener('click', clear)

sizing.textContent = `Value: ${slider.value}x${slider.value}`
slider.addEventListener('input', () => {
    sizing.textContent = `Value: ${slider.value}x${slider.value}`
})

slider.addEventListener('change', () => {
    size = slider.value
    size = size * size
    renderGrid(size)
})

colorPicker.addEventListener('change', (e) =>{
    setColor(e.target.value)
})