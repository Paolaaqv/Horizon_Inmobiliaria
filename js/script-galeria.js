// progamamos las funciones de la galería
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

//añadimos eventos para dinamizar
next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1])
})
