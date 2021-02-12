//git console.log("clent side file is loaded")





const weather_form=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.getElementById('message-1')
const message2=document.getElementById('message-2')
weather_form.addEventListener('submit',(e)=>
{
   e.preventDefault()
   const location=search.value
   const url='/weather?address='+location//change
   message1.textContent='Loading.....'
   message2.textContent=''

   fetch(url).then((response)=>
{
    
    
        response.json().then((data)=>
    {
        if(data.error)
        {
            console.log(data.error)
            message1.textContent=data.error
        }
        else{
            console.log(data.forecast)
            console.log(data.location)
            message1.textContent=data.forecast
            message2.textContent=data.location
        }
    })
    

})
})