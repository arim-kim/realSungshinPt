var infoOption = document.querySelector("#minWage");

infoOption.addEventListener("click", function () { //checkbox에 이벤트 리스너 등록
    if (infoOption.checked == true) { //체크된 경우 -> 최저시급 값을 wage input에 넣기

        var price = document.querySelector("#minWage").value;  //최저시급

        document.querySelector("#wage").value = price;
    }
    else { //체크해제한 경우 -> 시급 칸 비워주기
        document.querySelector("#wage").value = "";
    }
});