
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

  getOneWeekLater: (currentDate) => {
    const nextWeek = new Date(currentDate); //get iso format
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  },
};

module.exports = {dates}

