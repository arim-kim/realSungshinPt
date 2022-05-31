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

var noOverPayOption = document.querySelector("#noOverPay");

noOverPayOption.addEventListener("click", function () { //checkbox에 이벤트 리스너 등록
    if (noOverPayOption.checked == true) { //체크된 경우 -> 최저시급 값을 wage input에 넣기

        var price = document.querySelector("#noOverPay").value;  //최저시급

        document.querySelector("#overPay").value = price;
    }
    else { //체크해제한 경우 -> 시급 칸 비워주기
        document.querySelector("#overPay").value = "";
    }
});

var noNightOption = document.querySelector("#noNight");

noNightOption.addEventListener("click", function () { //checkbox에 이벤트 리스너 등록
    if (noNightOption.checked == true) { //체크된 경우 -> 최저시급 값을 wage input에 넣기

        var price = document.querySelector("#noNight").value;  //최저시급

        document.querySelector("#night").value = price;
    }
    else { //체크해제한 경우 -> 시급 칸 비워주기
        document.querySelector("#night").value = "";
    }
});

var noHolidayOption = document.querySelector("#noHoliday");

noHolidayOption.addEventListener("click", function () { //checkbox에 이벤트 리스너 등록
    if (noHolidayOption.checked == true) { //체크된 경우 -> 최저시급 값을 wage input에 넣기

        var price = document.querySelector("#noHoliday").value;  //최저시급

        document.querySelector("#holiday").value = price;
    }
    else { //체크해제한 경우 -> 시급 칸 비워주기
        document.querySelector("#holiday").value = "";
    }
});

var noExtraOption = document.querySelector("#noExtra");

noExtraOption.addEventListener("click", function () { //checkbox에 이벤트 리스너 등록
    if (noExtraOption.checked == true) { //체크된 경우 -> 최저시급 값을 wage input에 넣기

        var price = document.querySelector("#noExtra").value;  //최저시급

        document.querySelector("#extra").value = price;
    }
    else { //체크해제한 경우 -> 시급 칸 비워주기
        document.querySelector("#extra").value = "";
    }
});