// const XMLHttpRequest = require('xhr2');

// const modify = {
//   modifyString: (currentDay, currentMonth, currentYear) => {
//     return `${("0" + currentDay.toString()).slice(-2)}/${("0" + currentMonth.toString()).slice(-2)}/${currentYear}`;
//   },

// }

// const ajax = {
//   openLoginModal : () => {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onLoad= function () {
//       document.getElementById("myLoginModal").innerHTML = "haha"
//     };

//     //method(get or post), file location
//     console.log("---->", "before open")
//     xhttp.open("GET", "http://localhost:3001/studios", true);
//     console.log("---->", "before send")
//     xhttp.send();
//   }

// }
const filterLesson = {
  value:""
  
  }
  

const dates = {
  getTodaysDate: () => {
    //get current date
    const dateObj = new Date();
    let date = ("0" + dateObj.getDate()).slice(-2); //gets the day today, get the last 2 elements (010 get 10, 05 get 05)
    // current month
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //gets the month today (0-11 so must plus 1), get the last 2 elements (010 get 10, 05 get 05)
    // current year
    let year = dateObj.getFullYear(); //get the year in 4 digits
    let todaysDate = `${date}/${month}/${year}`;
    console.log("the date is", todaysDate);

    return todaysDate;
  },
  getDateFromDateString: (dateString) => {
    const dateStringArray = dateString.split(" ");
    let dateStringDay, dateStringMonth, dateStringNum, dateStringYear;
    [dateStringDay, dateStringMonth, dateStringNum, dateStringYear] = [
      dateStringArray[0],
      dateStringArray[1],
      dateStringArray[2],
      dateStringArray[3],
    ];

    return `${dateStringDay} ${dateStringMonth} ${dateStringNum} ${dateStringYear}`;
  },
  getNextDay: (currentDate) => {
    const nextDay = new Date(currentDate); //get iso format
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  },

  getPreviousDay: (currentDate) => {
    const prevDay = new Date(currentDate); //get iso format
    prevDay.setDate(prevDay.getDate() - 1);
    return prevDay;
  },

  // getPreviousDay: (currentDate) => {
  //   const date = new Date();
  //   const currentDateArray =  currentDate.split("/")
  //   let currentDay, currentMonth, currentYear
  //   [currentDay, currentMonth, currentYear ] = [parseInt(currentDateArray[0]), parseInt(currentDateArray[1]), parseInt(currentDateArray[2])]

  //   //gets last day
  //   let lastDayOfPrevMonth = new Date(
  //     date.getFullYear(),
  //     date.getMonth(),
  //     0
  //   );
  //   let lastDay = lastDayOfPrevMonth.toDateString().split(" ")[2];

  //   //check if reach first day
  //   if (currentDay > 1) {
  //     //not yet reach last day
  //     currentDay -= 1;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }

  //   //reach last day, check if reach last month
  //   if (currentMonth > 1) {
  //     currentMonth -= 1;
  //     currentDay = lastDay;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }

  //   if (currentMonth === 1) {
  //     //reached last month, add 1 year
  //     currentYear -= 1;
  //     currentMonth = 12;
  //     currentDay = lastDay;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }
  // },

  // getNextDay: (currentDate) => {
  //   const date = new Date();
  //   const currentDateArray =  currentDate.split("/")
  //   let currentMonth, currentDay, currentYear
  //   [currentMonth,currentDay,currentYear ] = [parseInt(currentDateArray[0]), parseInt(currentDateArray[1]), parseInt(currentDateArray[2])]

  //   //gets last day
  //   let lastDayOfTheMonth = new Date(
  //     date.getFullYear(),
  //     date.getMonth() + 2,
  //     0
  //   );
  //   let lastDay = lastDayOfTheMonth.toDateString().split(" ")[2];

  //   //check if reach last day
  //   if (currentDay <= lastDay) {
  //     //not yet reach last day
  //     currentDay += 1;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }

  //   //reach last day, check if reach last month
  //   if (currentMonth < 12) {
  //     currentMonth += 1;
  //     currentDay = 1;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }

  //   if (currentMonth === 12) {
  //     //reached last month, add 1 year
  //     currentYear += 1;
  //     currentMonth = 1;
  //     currentDay = 1;
  //     return modify.modifyString(currentDay, currentMonth, currentYear)
  //   }
  // },
};

module.exports = {dates, filterLesson}

