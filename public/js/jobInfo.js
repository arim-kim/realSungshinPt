function submit() {

    let job = document.getElementById("jobName").value
    let check = true;

    if(job===""){
        document.getElementById("jobError").innerHTML="아르바이트 이름을 입력하세요."
        check = false
    } else{
        document.getElementById("jobError").innerHTML=""
    }

    if(check){
        document.getElementById("jobError").innerHTML=""

        //비동기 처리이벤트
        setTimeout(function() {
          alert("아르바이트 정보가 추가되었습니다.")
        },0);
    }
}