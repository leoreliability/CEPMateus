window.addEventListener('load',()=>{
    const button = document.getElementById('app__zipcode__button')
    
    button.addEventListener('click',handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    const cepInput = document.getElementById('cep-input')
    const cepValue = cepInput.value
    
    pesquisarEndereco(cepValue)
}

// new XMLHttpRequest()
// http.open(method,url)
// http.send()
// http.onerror = () => {}
// http.onload = () => {}
// http.response

function pesquisarEndereco(value){
    showLoad()
    return fetch('https://viacep.com.br/ws/'+value+'/json/')
    .then((response)=>response.json())
    .then(data => {
        renderResponse('[data-cep]',data.cep)
        renderResponse('[data-localidade]',data.localidade)
        renderResponse('[data-logradouro]',data.logradouro)
        renderResponse('[data-uf]',data.uf)
        renderResponse('[data-bairro]',data.bairro)
        renderResponse('[data-ddd]',data.ddd)
        showResult()

        if(data.erro){
            showError()
            return
        }
    }).catch((error)=>{
        showError()
        console.log(
          "There has been a problem with your fetch operation: " + error.message,
        );
        
    })
}

function showLoad(){
    hideElementByid('adress')
    hideElementByid('error')
    showElementByid('load')
}

function showResult(){
    hideElementByid('load')
    hideElementByid('error')
    showElementByid('adress')
}

function showError(){
    hideElementByid('load')
    hideElementByid('adress')
    showElementByid('error')
}

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
    
}