### realSungshinPt

### Description
realSungshinPt는 아르바이트 스케줄을 관리하고, 주휴수당과 야간수당을 포함한 월급을 계산하며 아르바이트 관련 여러기능을 효과적으로 관리할수있는 아르바이트에 관련된 종합 서비스를 제공하는 git이다.  
구현된 기능으로는 채팅, 급여계산, 아르바이트일정관리를 들수 있다.  

***

### Enviroment
MVC 뷰를 사용했습니다.  
클라이언트: JavaScript  
서버: Node.js, Socket.io, Sequlize, express, mysql, mysql2  
데이터베이스: MySQL  

***

### 사용방법

- 첫 화면에서 회원가입/로그인을 합니다.  
![login](https://user-images.githubusercontent.com/85981767/173534164-dc5c0073-db6f-48e7-9560-bc039b638ed3.png)
  -  회원가입시, 이메일, 이름, 비밀번호를 입력하고 가입합니다.
  ![signUp](https://user-images.githubusercontent.com/85981767/173534157-0889e1eb-b874-473c-b0d0-56f77aadebb6.png)
  


- 채팅기능 사용시)
    -  로그인후, 채팅 버튼을 누릅니다.  
    -  친구목록에 뜨는 친구를 눌러 채팅합니다.  
    -  친구가 없을 시, 친구 추가하기를 눌러 친구의 이메일로 친구(회원가입된 회원의 메일) 추가를 합니다.  
    ![chat](https://user-images.githubusercontent.com/85981767/173534130-44e79a1e-53b1-4d1b-893d-b114230cb68f.png)  
    
- 친구 캘랜더를 보고싶을 시)  

  - 친구 목록 밑 친구 캘린더 보기 리스트에서 보고싶은 친구의 캘린더를 클릭합니다.  
  - 보고싶은 친구 캘린더가 목록에 없을 시, 친구 추가를 해줍니다.  
 ![friendlist](https://user-images.githubusercontent.com/85981767/173534159-e92b42af-41b4-4816-a5bb-9a4511ab8fa9.png)
    - 친구추가 시)  
        - 친구 이메일이 user가 아닐 시, 해당 이메일이 회원이 아니라는 뷰가 뜹니다.  
        - 친구 이메일이 이미 친구일 시, 해당 이메일이 이미 친구라는 뷰가 뜹니다.  
        - 친구 추가 완료 시, 친구 추가가 완료되었다는 뷰가 뜹니다.  
        ![addFriend](https://user-images.githubusercontent.com/85981767/173534123-5a3214e1-a7ab-4264-90b3-e57adde0d7d3.png)
     - 친구 삭제 시)  
        - 친구 목록의 친구관리 버튼을 누릅니다.
        - 삭제하고싶은 친구를 list에서 선택합니다.
        - 제출 버튼 클릭 시, 친구가 삭제됩니다.
        ![deleteFriend](https://user-images.githubusercontent.com/85981767/173534135-aed2710b-4a72-47bd-8590-59fbf8bbba33.png)
        

- 아르바이트 추가시)  
    * 홈에서 아르바이트 추가 버튼을누릅니다.  
    * 추가 하고싶은 아르바이트의 이름, 주휴수당 유무, 적용된 세금, 아르바이트 표기 색상을 지정해줍니다  
    * 완료 버튼을 누르면 아르바이트가 추가 됩니다.
    ![addPt](https://user-images.githubusercontent.com/85981767/173536708-68809f35-ad4b-4f18-b72e-454b1574f3a1.png)

- 일정 추가 시)
    * 홈에서 일정추가 버튼을 누릅니다.
    * 근무지는 저장된 아르바이트들중 하나를 선택합니다.
    * 시급, 일일 근무 시간, 대타여부, 휴게시간, 각 수당들을 지정합니다
    * 추가 버튼을 누르면 해당 아르바이트의 일정이 추가됩니다.
    ![addsche](https://user-images.githubusercontent.com/85981767/173536709-aa01440f-83f3-45b6-a6d8-fecd622e31ce.png)
    
- 일정 삭제 시)
    * 홈의 캘린더에서 일정을 삭제하고싶은 날짜를 선택합니다.
    * 날짜 선택 시, 해당 날짜의 일정이 뜹니다. 
    * 일정 밑 delete 버튼을 누르면 삭제됩니다.
    ![deleteSCH](https://user-images.githubusercontent.com/85981767/173537568-9a32122a-461f-463b-acf4-553be1e99617.png)
    
- 아르바이트 삭제 시)
    * 홈에서 아르바이트 삭제 버튼을 누릅니다.
    * 삭제하고싶은 아르바이트를 선택합니다,
    * 제출 버튼 클릭 시 삭제됩니다.
    ![deletePT](https://user-images.githubusercontent.com/85981767/173536687-7c9cedc0-67fb-4767-ba19-071204768e56.png)
    
- 아르바이트 편집 시)  
  해당 편집은 주휴수당 유무, 세금, 아르바이트 색상을 편집할 수 있습니다.  
  - 편집하고싶은 아르바이트를 선택합니다,
  - 주휴수당, 세금, 색상 중 바꾸고싶은 사항을 변경합니다
  - 제출 시, 해당 아르바이트의 정보가 편집됩니다.
  ![editPT](https://user-images.githubusercontent.com/85981767/173536697-3cf2e28e-7f83-436a-a0fb-5a97e9089457.png)

- 로그아웃 시)
![homeIndex](https://user-images.githubusercontent.com/85981767/173534162-3dc80cce-c2c9-448c-8dfc-d536941b80ba.png)
  * 홈 화면 오른쪽의 Log out버튼을 누릅니다.  
  * 로그아웃 alert창이 뜹니다,  
  * 로그아웃 뷰가 뜹니다.   
  * 홈으로 버튼 클릭시, 로그인 뷰가 뜹니다.  

 
- 회원 탈퇴 시)
 ![memOUT](https://user-images.githubusercontent.com/85981767/173536704-bbca3fb7-993f-49c6-b503-f18bb515a9cf.png)
  * 홈 화면 맨 아래의 회원 탈퇴하기 버튼을 누릅니다.  
  * 회원 탈퇴 alert창이 뜹니다  
  * 확인 버튼을 부릅니다.  
  * 회원탈퇴 뷰가 뜹니다. 홈으로 버튼 클릭 시, 로그인 뷰가 뜹니다.  

- 월급을 보고싶을 때)
   * 홈 화면 알림창 밑 월급 보기 버튼을 누릅니다.  
   * 해당 아르바이트의 월급을 볼 수 있고, 총 월급을 볼수 있는 뷰가 뜹니다.  
![showM](https://user-images.githubusercontent.com/85981767/173536705-a1165464-64b3-403d-b450-27cf855b881e.png)


***

## MYSQL 프로시져 함수( 급여 계산 관련)
일급, 주급, 월급 table 생성  

일급 table 생성  
```sh
CREATE TABLE daily (
dailyMemId int NOT NULL,
dailyPtId int NOT NULL,
date date NOT NULL,
dailyTotal int NOT NULL,
dayCoveredTime int NOT NULL,
dailyWorkTime int NOT NULL,
PRIMARY KEY (dailyMemId,dailyPtId,date),
KEY dailyPtId_idx (dailyPtId),
CONSTRAINT dailyMemId FOREIGN KEY (dailyMemId) REFERENCES members (memberId),
CONSTRAINT dailyPtId FOREIGN KEY (dailyPtId) REFERENCES parttime (parttimeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
 
주급 table 생성  
```sh
CREATE TABLE weekly (
weeklyMemId int NOT NULL,
weeklyPtId int NOT NULL,
weekNum int NOT NULL,
weekMonth int NOT NULL,
weeklyTotal int NOT NULL,
weekWorkTime int NOT NULL,
coveredTime int NOT NULL,
weekPlusPay int NOT NULL,
PRIMARY KEY (weeklyMemId,weeklyPtId,weekNum),
KEY weeklyPtId_idx (weeklyPtId),
CONSTRAINT weeklyMemId FOREIGN KEY (weeklyMemId) REFERENCES members (memberId),
CONSTRAINT weeklyPtId FOREIGN KEY (weeklyPtId) REFERENCES parttime (parttimeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

월급 table 생성  
```sh
CREATE TABLE monthly (
monthlyMemId int NOT NULL,
month int NOT NULL,
monthlyTotal int NOT NULL DEFAULT '0',
monthlyPtId int NOT NULL,
PRIMARY KEY (monthlyMemId,month,monthlyPtId),
KEY monthlyPtId_idx (monthlyPtId),
CONSTRAINT monthlyMemId FOREIGN KEY (monthlyMemId) REFERENCES members (memberId),
CONSTRAINT monthlyPtId FOREIGN KEY (monthlyPtId) REFERENCES parttime (parttimeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

*** 

# 1. 일급

## 1.1 일급 계산 함수(프로시져)

```sh
drop procedure if exists dailyFunc;
delimiter $$
create procedure dailyFunc(in startTime datetime, in endTime datetime, in wage int, in holiday int, in overpay int, in rest int, in night int, in extra int, out dailyTotal int)
BEGIN
set dailyTotal = (TIMESTAMPDIFF(minute, startTime, endTime))/60 * wage + holiday + overpay - (rest / 60 * wage) + night + extra;
end $$
delimiter ;
```


## 1.2 일정 추가 → 일급 추가

```sh
drop trigger if exists schDailyInsert;
delimiter //
create trigger schDailyInsert
after insert on schedule for each row
Begin
declare dayCovered int;
call dailyFunc(new.startTime, new.endTime, new.wage, new.holiday, new.overpay, new.rest, new.night, new.extra, @dailyTotal);
if (new.isCovered = 1) then set dayCovered =  TIMESTAMPDIFF(minute, new.starttime, new.endtime)/60;
elseif (new.isCovered = 0) then set dayCovered = 0;
end if;
insert into daily(dailyMemId, dailyPtId, date, dailytotal, dayCoveredTime, dailyWorkTime)
values(new.scdlMemid, new.scdlPtId, new.startTime, @dailyTotal, dayCovered, (TIMESTAMPDIFF(minute, new.starttime, new.endtime) - new.rest) / 60)
on duplicate key update
dailytotal = dailytotal + @dailyTotal,
dayCoveredTime = dayCoveredTime + dayCovered,
dailyWorkTime = dailyWorkTime + TIMESTAMPDIFF(minute, new.starttime, new.endtime)/60;
end //
delimiter ;

```

# 2. 주급

## 2.1 일급 삽입 → 주급 삽입

```sh
drop trigger if exists dayWeekInsert;
delimiter //
create trigger dayWeekInsert
after insert on daily for each row
Begin
insert into weekly(weeklyMemid, weeklyPtId, weekNum, weekMonth, weeklyTotal, weekWorkTime, coveredTime, weekPlusPay)
values(new.dailymemid, new.dailyPtid, week(new.date), DATE_FORMAT(new.date, "%Y%m"), new.dailyTotal, new.dailyWorkTime, new.dayCoveredTime,
weekFunc(weekWorkTime, coveredTime, weeklyTotal, weekPlusPay))
on duplicate key update
weeklyTotal = weeklyTotal + new.dailyTotal,
weekWorkTime = weekWorkTime + new.dailyWorkTime,
coveredTime = coveredTime + new.dayCoveredTime,
weekPlusPay = weekFunc(weekWorkTime, coveredTime, weeklyTotal, weekPlusPay);
end //
delimiter ;
```

## 2.2 일급 업데이트 → 주급 업데이트

```sh
drop trigger if exists dayWeekUpdate;
delimiter //
create trigger dayWeekUpdate
after update on daily for each row
Begin
insert into weekly(weeklyMemid, weeklyPtId, weekNum, weekMonth, weeklyTotal, weekWorkTime, coveredTime, weekPlusPay)
values(new.dailymemid, new.dailyPtid, week(new.date), DATE_FORMAT(new.date, "%Y%m"), new.dailyTotal, new.dailyWorkTime, new.dayCoveredTime,
weekFunc(weekWorkTime, coveredTime, weeklyTotal, weekPlusPay))
on duplicate key update
weeklyTotal = weeklyTotal + new.dailyTotal - old.dailyTotal,
weekWorkTime = weekWorkTime + new.dailyWorkTime - old.dailyWorkTime,
coveredTime = coveredTime + new.dayCoveredTime - old.dayCoveredTime,
weekPlusPay = weekFunc(weekWorkTime, coveredTime, weeklyTotal, weekPlusPay);
end //
delimiter ;

```

## ※주휴수당 계산 함수

```sh
set global log_bin_trust_function_creators = 1;
drop function if exists weekFunc;
delimiter $$
create function weekFunc(weekWorktime int, coveredTime int, weeklyTotal int, weekPlusPay int)
returns int
BEGIN
if (weekWorktime - coveredTime >= 15) then
return ((weekWorktime - coveredTime) / 40) * 8  * (weeklyTotal / weekWorkTime);
elseif (weekWorktime - coveredTime < 15) then return weekPlusPay;
end if;
end $$
delimiter ;
```
## 3. 월급 (주급 추가 → 월급 추가)

```sh
drop trigger if exists weekMonthInsert;
delimiter //
create trigger weekMonthInsert
after insert on weekly for each row
Begin
insert into monthly(monthlyMemId, month, monthlyTotal, monthlyPtId)
values(new.weeklymemid, new.weekMonth, new.weeklyTotal + new.weekPlusPay, new.weeklyPtid)
on duplicate key update
monthlyTotal = monthlyTotal + new.weeklyTotal + new.weekPlusPay;
end //
delimiter ;
```

## 3.1 <<세금 반영>> 주급 추가 → 월급 추가

```sh
drop trigger if exists weekMonthInsert;
delimiter //
create trigger weekMonthInsert
after insert on weekly for each row
Begin
DECLARE monthTax INTEGER;
set monthTax = (SELECT tax from parttime WHERE parttimeId = new.weeklyPtid);
insert into monthly(monthlyMemId, month, monthlyTotal, monthlyPtId)
values(new.weeklymemid, new.weekMonth, (100 - monthTax) / 100 * (new.weeklyTotal + new.weekPlusPay), new.weeklyPtid)
on duplicate key update
monthlyTotal = monthlyTotal + (100 - monthTax) / 100 * (new.weeklyTotal + new.weekPlusPay);
end //
delimiter ;
```


### 3.2 주급 업데이트 → 월급 업데이트

```sh
drop trigger if exists weekMonthUpdate;
delimiter //
create trigger weekMonthUpdate
after update on weekly for each row
Begin
insert into monthly(monthlyMemid, month, monthlyTotal, monthlyPtId)
values(new.weeklymemId, new.weekMonth, new.weeklyTotal + new.weekPlusPay, new.weeklyPtid)
on duplicate key update
month = new.weekMonth,
monthlyTotal = monthlyTotal + new.weeklyTotal + new.weekPlusPay - (old.weeklyTotal + old.weekPlusPay);
end //
delimiter ;
```

### 3.3 <<세금 반영>> 주급 업데이트 → 월급 업데이트

```sh
drop trigger if exists weekMonthUpdate;
delimiter //
create trigger weekMonthUpdate
after update on weekly for each row
Begin
DECLARE monthTax INTEGER;
set monthTax = (SELECT tax from parttime WHERE parttimeId = new.weeklyPtid);
insert into monthly(monthlyMemid, month, monthlyTotal, monthlyPtId)
values(new.weeklymemId, new.weekMonth, (100 - monthTax) / 100 * (new.weeklyTotal + new.weekPlusPay), new.weeklyPtid)
on duplicate key update
month = new.weekMonth,
monthlyTotal = monthlyTotal  + (100 - monthTax) / 100 * (new.weeklyTotal + new.weekPlusPay - (old.weeklyTotal + old.weekPlusPay));
end //
delimiter ;
```
 
 ***  

## 삭제

### 1. 일정 삭제 → 일급 삭제  

```sh
drop trigger if exists schDailyDelete;
delimiter //
create trigger schDailyDelete
after delete on schedule for each row
Begin
call dailyFunc(old.startTime, old.endTime, old.wage, old.holiday, old.overpay, old.rest, old.night, old.extra, @dailySum);
update daily set
dailytotal = dailytotal - @dailySum,
dailyWorktime = dailyWorktime - (TIMESTAMPDIFF(minute, old.startTime, old.endtime)/60),
dayCoveredTIme = coverTimeDelete(dayCoveredTime, old.startTime, old.endtime, old.isCovered)
where dailyMemid = old.scdlMemId and dailyptid = old.scdlPtId and date = date(old.startTime);
delete from daily where dailyTotal = 0;
end //
delimiter ;
```

### 2. 일정 삭제 → 업데이트된 대타시간 구하기

```sh
set global log_bin_trust_function_creators = 1;
drop function if exists coverTimeDelete;
delimiter $$
create function coverTimeDelete(dayCoveredTime int, startTime datetime, endtime datetime, isCovered tinyint(1))
returns int
BEGIN
if (isCovered = 1) then
return dayCoveredTime - TIMESTAMPDIFF(minute, startTime, endtime)/60;
elseif (isCovered = 0) then return dayCoveredTime;
end if;
end $$
delimiter ;
```

### 3. 일급 삭제 → 주급 삭제
```sh
drop trigger if exists DailyWeeklyDelete;
delimiter //
create trigger DailyWeeklyDelete
after delete on daily for each row
Begin
delete from weekly where weeklyTotal = 0;
end //
delimiter ;
```

### 4.일급 삭제 → 월급 삭제  


```sh
drop trigger if exists WeeklymonthlyDelete;
delimiter //
create trigger WeeklymonthlyDelete
after delete on weekly for each row
Begin
delete from monthly where monthlyTotal = 0;
end //
delimiter ;
```
***  


## 프로젝트 설명

- ejs 코드 위치: /views
- css, js 코드 위치: /public
- controller 코드 위치: /controllers
- sequlize 관련 각 model 코드 위치: /models

## 실행 방법 (development 모드) IN SSH(GCP)

1. 클론

    ```sh
    $ git clone https://github.com/arim-kim/realSungshinPt.git
    ```
2. 패키지 설치
    ```sh
    $ npm install
    ```

3. 프론트엔드 서버 실행
    ```sh
    $ node main.js
    ```
4. 해당 GCP 외부 IP 주소 접속


