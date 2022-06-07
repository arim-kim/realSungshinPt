document.getElementById('friend-form').onsubmit = function() {
  let fEmail = this.friendEmail.value
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
  } 
  else {
    document.getElementById("fEmailError").innerHTML="이메일이 올바르지 않습니다."
    check = false
  }
  return check;
}