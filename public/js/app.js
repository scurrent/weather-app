console.log('Client side javascript file is loaded!')

/*
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
*/



const weatherForm = document.querySelector('form')
const searchBox = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

msg1.textContent = ""
msg2.textContent = ""
  

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchBox.value

    msg1.textContent = "Loading " + location
    msg2.textContent = ""

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                console.log(data.location)
                console.log(data.forcastData)
                msg1.textContent = data.location
                msg2.textContent = data.forcastData
            }
        })
    })
})





