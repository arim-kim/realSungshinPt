// join페이지랑 동일하게 작성했는데 오류가 납니다...흑...

function sendMailCheck() {

  let fEmail = document.getElementById("friendEmail").value
  let check = true;

  if(fEmail.includes('@')){
    let emailId = fEmail.split('@')[0]
    let emailServer = fEmail.split('@')[1]
    if(emailId === "" || emailServer === ""){
      document.getElementById("fEmailError").innerHTML="이메일이 올바르지 않습니다."
      check = false
    }
    else{
      document.getElementById("fEmailError").innerHTML=""
    }
  } else{
    document.getElementById("fEmailError").innerHTML="이메일이 올바르지 않습니다."
    check = false
  }

  if(check){
      document.getElementById("fEmailError").innerHTML=""

      //비동기 처리이벤트
      setTimeout(function() {
        alert("메일이 전송되었습니다.")
      },0);
  }
}
