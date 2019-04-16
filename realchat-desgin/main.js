var name = prompt("plz enter the name")
var message = document.getElementById("message");
var sendButton = document.getElementById("send");
var sockit = io.connect("http://localhost:5000");
var msgs = document.getElementById("msgs")
var state = document.getElementById("sho")
console.log(sockit)
sendButton.addEventListener("click",()=>{
    sockit.emit("message",{
        usernmae:name,
        message:message.value
    })
})
message.addEventListener("keypress",()=>{
    // console.log("sa")
    sockit.emit("broadCast",{
        usernmae:name
    })
})
sockit.on("new_mesg",(data)=>{
    state.innerHTML = ""
   let time =  new Date()
    msgs.innerHTML += `
        <div class="container darker">
    <span class="userName right">${data.usernmae}</span>
    <p>${data.message}</p>
    <span class="time-left">${time.getHours() }:${ time.getMinutes() }</span>
    </div>
    `
})
sockit.on("brodaResp",(data)=>{
    state.innerHTML = ` <strong id="name" >${data.usernmae}</strong> write  Message <img src="write.gif" width="25">`
})