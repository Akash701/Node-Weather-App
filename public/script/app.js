// console.log("Server is loaded");
// fetch('https://puzzle.mead.io/puzzle').then((Response)=>{
//     Response.json().then((data)=>{
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//         console.log(data.location);
//     console.log(data.forecast);}
//     })
// })

const weatherSearch = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'JS'
 
weatherSearch.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(messageOne.textContent = data.error);
        }
        else{
        console.log(messageOne.textContent = data.location);
    console.log(messageTwo.textContent = data.forecast);}
    })
})
})