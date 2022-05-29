const socket=io();

const nickname=document.querySelector("#nickname")
const chatList=document.querySelector(".chatting-list")
const chatInput=document.querySelector(".chatting-input");
const sendButton=document.querySelector(".send-button");
const displayContainer=document.querySelector(".display-container");

//엔터치면 전송되고 전송되면 Input창이 비워지는
chatInput.addEventListener("keypress", (event) => {
    if(event.keycode===13){
        send()
        chatInput.value=""
    }
})

//obj형태로 채팅보내는 send()함수
function send(){
    const param={
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click",send) //btn누르면 send함수 호출

socket.on("chatting", (data)=>{
    console.log(data)
    const {name, msg, time}=data;
    const item=new LiModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)

}) //채팅보낸내용 ul의 li로 뜨게함 이름, 메세지, 시간

function LiModel(name, msg, time){
    this.name=name;
    this.msg=msg;
    this.time=time;

    this.makeLi=()=>{
        const li=document.createElement("li");
        li.classList.add(nickname.value===this.name? "sent":"receive")
        const dom=` <span class="profile">
        <span class="user"> ${this.name} </span>
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML=dom;
    chatList.appendChild(li);
    }
}
//Li모델로 뜨게하는 형식