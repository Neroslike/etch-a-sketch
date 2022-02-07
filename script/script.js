let container = document.querySelector('.container')
let contWidth = container.clientWidth
let btn = document.querySelector('#clear')
createGrid()

function createGrid(size = 16*16){
    let grid = document.querySelectorAll('.grid-element')
    grid.forEach(element => {
        element.remove()
    });
    for(let i = 1;i < size+1; i++){
        let div = document.createElement('div')
        div.classList.add('grid-element')
        div.style.width = `${contWidth / Math.sqrt(size)}px`
        div.style.height = `${contWidth / Math.sqrt(size)}px`
        div.addEventListener('mouseover', () => {
            div.style.background = 'black'
        })
        container.appendChild(div)
    }
}

btn.addEventListener('click', () => {
    let divGrid = document.querySelectorAll('.grid-element')
    divGrid.forEach(div => {
        div.style.background = ('white')
    });
})
let slider = document.querySelector('#slider')
function showSliderVal(){
}

let sizing = document.querySelector('#sizing')
sizing.textContent = `Value: ${slider.value}x${slider.value}`

slider.addEventListener('input', () => {
    sizing.textContent = `Value: ${slider.value}x${slider.value}`
})

slider.addEventListener('change', () => {
    size = slider.value
    size = size * size
    createGrid(size)
})