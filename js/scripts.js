window.addEventListener('load',()=>{
    const $zipcodeButton = document.getElementById('app__zipcode__button')
    $zipcodeButton.addEventListener('click',handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    
}

// new XMLHttpRequest()
// http.open(method,url)
// http.send()
// http.onerror = () => {}
// http.onload = () => {}

function renderResponse(tagSelector, value){
    const $cep = document.querySelector(tagSelector)
    $cep.innerHTML=value
}

function showElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','true')
}

function hideElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','false')
}

function handleError(){
    hideElementByid('load')
    showElementByid('error')
}