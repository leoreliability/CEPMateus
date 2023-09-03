window.addEventListener('load',()=>{
    const $zipcodeButton = document.getElementById('app__zipcode__button')
    $zipcodeButton.addEventListener('click',handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    const cepInput = document.getElementById('cep-input')
    const cepValue = cepInput.value
    searchAdress(cepValue)
}

function searchAdress(cepValue) {
 
    const http = new XMLHttpRequest();
    
    http.open('GET', 'https://viacep.com.br/ws/'+cepValue+'/json/')
    showElementByid('load')
    hideElementByid('error')
    hideElementByid('adress')
    http.send()

    http.onload = ()=>{
        const data = JSON.parse(http.response)
        renderResponse('[data-cep]', data.cep)
        renderResponse('[data-logradouro]', data.logradouro)
        renderResponse('[data-bairro]', data.bairro)
        renderResponse('[data-uf]', data.uf)
        renderResponse('[data-localidade]', data.localidade)
        renderResponse('[data-ddd]', data.ddd)
        
        if(!data.cep){
            handleError()
            return
        }

        hideElementByid('load')
        hideElementByid('error')
        showElementByid('adress')
    }

    http.onerror = ()=>{
        handleError()
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
        hideElementByid('load')
        showElementByid('error')
    }

    
    // const data = fetch('https://viacep.com.br/ws/60510065/json/')

    


    // const parameters ={
    //     method:'GET',
    //     mode:'cors',
    //     cache:'default'
    // }
    // const url = `https://viacep.com.br/ws/${getZipcode()}/json/`
    // return fetch(url, parameters)
    // .then(response => response.json()
    // ).then((data) => {
    //     setError(false)
    //     console.log(data)
    // })
    // .catch((error) => {
    //     setError(true)
    //     setcep(null)
    // })
}