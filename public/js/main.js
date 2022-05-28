


let date = new Date(); // 날짜 객체 

const renderCalender = () => {
  const viewYear = date.getFullYear(); // 연도 
  const viewMonth = date.getMonth(); // 달 가져옴 

  document.querySelector('.year-month').textContent = `${viewYear} - ${viewMonth + 1}`; // text에 표시 

  const prevLast = new Date(viewYear, viewMonth, 0); // 지난달 
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // 다음달 

  const PLDate = prevLast.getDate(); // 지난달의 날짜
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate(); // 이번달의 날짜 
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i); // unshift 새로운 요소를 맨 앞에 추가 
    }
  }


  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }



};

renderCalender();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

const goToday = () => {
  date = new Date();
  renderCalender();
};


// <% let date = new Date(); %> 

// <% const renderCalender = () => {%>
// <%  const viewYear = date.getFullYear(); // 연도 %>
// <%  const viewMonth = date.getMonth(); // 달 가져옴 %>

// <% document.querySelector('.year-month').textContent = `${viewYear} - ${viewMonth + 1}`; // text에 표시 %>

// <% const prevLast = new Date(viewYear, viewMonth, 0); // 지난달 %>
// <% const thisLast = new Date(viewYear, viewMonth + 1, 0); // 다음달 %>

// <% const PLDate = prevLast.getDate(); // 지난달의 날짜%>
// <% const PLDay = prevLast.getDay();%>

// <% const TLDate = thisLast.getDate(); // 이번달의 날짜 %>
// <% const TLDay = thisLast.getDay();%>

// <% const prevDates = [];%>
// <%  const thisDates = [...Array(TLDate + 1).keys()].slice(1);%>
// <%  const nextDates = [];%>

// <%  if (PLDay !== 6) {%>
// <%  for (let i = 0; i < PLDay + 1; i++) {%>
//     <% prevDates.unshift(PLDate - i); // unshift 새로운 요소를 맨 앞에 추가 %>
//   <% }%>
// <%  }%>


// <% for (let i = 1; i < 7 - TLDay; i++) {%>
// <% nextDates.push(i);%>
// <% }%>

// <% const dates = prevDates.concat(thisDates, nextDates);%>
// <% const firstDateIndex = dates.indexOf(1);%>
// <% const lastDateIndex = dates.lastIndexOf(TLDate);%>

// <% dates.forEach((date, i) => {%>
// <% const condition = i >= firstDateIndex && i < lastDateIndex + 1%>
// <% ? 'this'%>
//                   <%  : 'other';%>
//                   <% dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;%>
// <% });%>

// <% document.querySelector('.dates').innerHTML = dates.join('');%>

// <% const today = new Date();%>
// <% if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {%>
// <% for (let date of document.querySelectorAll('.this')) {%>
//     <% if (+date.innerText === today.getDate()) {%>
//     <% date.classList.add('today');%>
//     <% break;}}}};%>

// <% renderCalender(); %>

// <% const prevMonth = () => {%>
// <% date.setMonth(date.getMonth() - 1);%>
// <% renderCalender();
// <% };%>

// <% const nextMonth = () => {%>
// <% date.setMonth(date.getMonth() + 1);%>
// <% renderCalender();};%>

// <% const goToday = () => { %>
// <%date = new Date(); %>
// <%renderCalender();}; %>
