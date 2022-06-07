document.getElementById('job-form').onsubmit = function() {
    let job = this.parttimeName.value
    let check = true;

    if(job===""){
        document.getElementById("jobError").innerHTML="아르바이트 이름을 입력하세요."
        check = false
    } else{
        document.getElementById("jobError").innerHTML=""
    }

    return check;
}