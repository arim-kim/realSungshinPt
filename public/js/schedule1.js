var infoOption = document.querySelector("#minWage");
//체크된 경우 -> 최저시급 값을 wage input에 넣기
if (infoOption.checked == true) {
    var price = document.querySelector("#minWage").value;
    document.querySelector("#wage").value = price;
}
//체크해제한 경우 -> 시급 칸 비워주기
else { 
    document.querySelector("#wage").value = "";
}


<% for (var i = 0; i < 49; i++) { %>
    <% var hour = ''; %>
    <% var min = '00'; %>

    <% if ((Math.ceil(<%= i %> / 2)) < 13) { %>
        <% hour = (Math.floor(<%= i %> / 2)); %>
    <% } else { %>
        <% hour = (Math.floor(<%= i %> / 2)); %>
    <% } %>

    <% hour = (Math.floor(<%= i %> / 2)); %>

    <% if (<%= hour %> < 10) { %>
        <% hour = '0' + <%= hour %>; %>
    <% } %>

    <% if (<%= i %> % 2 != 0) { %>
        <% min = '30'; %>
    <% } %>
    <script>
    document
        .write('<option value=' + <%= hour %> + <%= min %> + '>'
            + <%= hour %>
            + "시간 "
            + <%= min %>
            + "분"
            + '</option>');
            </script>
<% } %>