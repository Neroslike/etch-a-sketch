let container = document.querySelector('.container')
let contWidth = container.clientWidth
let btn = document.querySelector('#clear')
let slider = document.querySelector('#slider')
let sizing = document.querySelector('#sizing')
const DEFAULT_SIZE = 16*16
let mouseDown = false
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
        div.addEventListener('click', paint)
        container.appendChild(div)
    }
}

function renderGrid(size){
    clearGrid()
    createGrid(size)
}

function paint(e){
    if(e.type === 'mouseover' && !mouseDown){
        return
    } else if(mouseDown || e.type === 'click'){
        e.target.style.background  = 'black'
    }
}

function clear(){
    let divGrid = document.querySelectorAll('.grid-element')
    divGrid.forEach(div => {
        div.style.background = ('white')
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