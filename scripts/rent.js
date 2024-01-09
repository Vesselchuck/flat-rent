// Set up default variables
const year2021 = [];
const year2022 = [];
const year2023 = [];
const year2024 = [];
const electricityArray = [];
const coldWaterArray = [];
const hotWaterArray = [];
let electricityAverageDifference;
let coldWaterAverageDifference;
let hotWaterAverageDifference;
let electricityLast;
let coldWaterLast;
let hotWaterLast;
let electricityAverage;
let coldWaterAverage;
let hotWaterAverage;
let electricityKwh = 5.38;
let coldWaterM3 = 33.02;
let hotWaterM3 = 33.02;
let rent = 27000;

// Create month objects using the factory function
function createMonthObj(name) {
  const monthObj = {
    name,
    electricityKwh,
    coldWaterM3,
    hotWaterM3,
    rent
  };
  return monthObj;
};

// Define a function to calculate and display rent for a given month
function calculateAndDisplayRent(monthObj, electricity, coldWater, hotWater) {
  const realIndex = (element) => element.name === monthObj;
  const usedYear = parseInt(monthObj.replace(/[^0-9]/g,""));

  electricityLast = electricity;
  coldWaterLast = coldWater;
  hotWaterLast = hotWater;

  let currentMonthIndex;
  let currentMonthElement;
  let previousMonthIndex;
  let previousMonthElement;

  if (usedYear === 2021) {
    currentMonthIndex = year2021.findIndex(realIndex);
    previousMonthIndex = year2021.findIndex(realIndex) - 1;
    currentMonthElement = year2021[currentMonthIndex];
    previousMonthElement = year2021[previousMonthIndex];
  } else if (usedYear === 2022) {
    currentMonthIndex = year2022.findIndex(realIndex);
    previousMonthIndex = year2022.findIndex(realIndex) - 1;
    currentMonthElement = year2022[currentMonthIndex];
    previousMonthElement = year2022[previousMonthIndex];
    if (previousMonthIndex === -1) {
      previousMonthIndex = 6;
      previousMonthElement = year2021[previousMonthIndex];
    };
  } else if (usedYear === 2023) {
    currentMonthIndex = year2023.findIndex(realIndex);
    previousMonthIndex = year2023.findIndex(realIndex) - 1;
    currentMonthElement = year2023[currentMonthIndex];
    previousMonthElement = year2023[previousMonthIndex];
    if (previousMonthIndex === -1) {
      previousMonthIndex = 11;
      previousMonthElement = year2022[previousMonthIndex];
    };
  } else if (usedYear === 2024) {
    currentMonthIndex = year2024.findIndex(realIndex);
    previousMonthIndex = year2024.findIndex(realIndex) - 1;
    currentMonthElement = year2024[currentMonthIndex];
    previousMonthElement = year2024[previousMonthIndex];
    if (previousMonthIndex === -1) {
      previousMonthIndex = 11;
      previousMonthElement = year2023[previousMonthIndex];
    };
  };
  
  currentMonthElement.electricityMeter = electricity;
  currentMonthElement.coldWaterMeter = coldWater;
  currentMonthElement.hotWaterMeter = hotWater;

  let previousElectricityMeter;
  if (previousMonthIndex === -1) {
    previousElectricityMeter = 24894;
  } else {
    previousElectricityMeter = previousMonthElement.electricityMeter;
  };
  const electricityDifference = electricity - previousElectricityMeter;
  electricityArray.push(electricityDifference);
  const electricityCost = electricityDifference * currentMonthElement.electricityKwh;

  let previousColdWaterMeter;
  if (previousMonthIndex === -1) {
    previousColdWaterMeter = 215;
  } else {
    previousColdWaterMeter = previousMonthElement.coldWaterMeter;
  };
  const coldWaterDifference = coldWater - previousColdWaterMeter;
  coldWaterArray.push(coldWaterDifference);
  const coldWaterCost = coldWaterDifference * currentMonthElement.coldWaterM3;

  let previousHotWaterMeter;
  if (previousMonthIndex === -1) {
    previousHotWaterMeter = 132;
  } else {
    previousHotWaterMeter = previousMonthElement.hotWaterMeter;
  };
  const hotWaterDifference = hotWater - previousHotWaterMeter;
  hotWaterArray.push(hotWaterDifference);
  const hotWaterCost = hotWaterDifference * currentMonthElement.hotWaterM3;

  const metersCost = electricityCost + coldWaterCost + hotWaterCost;
  const totalCost = metersCost + currentMonthElement.rent;

  // Mark the current localization
  if (isRussian) {
    currentLanguage = "ru";
  } else {
    currentLanguage = "en";
  };

  // Update the copy button's appearance to indicate successful copying
  fetch(`lang/${currentLanguage}.json`)
    .then(response => response.json())
    .then(data => {
      const electricityName = data.container.electricity;
      const kWh = data.container.kWh;
      const difference = data.container.difference;
      const tariff = data.container.tariff;
      const coldWaterName = data.container.coldWater;
      const hotWaterName = data.container.hotWater;
      const cubicMeters = data.container.cubicMeters;
      const total = data.container.total;
      const transferToLandlord = data.container.transferToLandlord;

      return document.getElementById(monthObj).innerHTML = `<h3>${electricityName}</h3>
<p>${electricity}${kWh} <em>(${difference} ${electricityDifference}${kWh})</em> = ${electricityCost.toFixed(2)}₽ <em>(${tariff} ${currentMonthElement.electricityKwh}₽/${kWh})</em></p>
<h3>${coldWaterName}</h3>
<p>${coldWater}${cubicMeters} <em>(${difference} ${coldWaterDifference}${cubicMeters})</em> = ${coldWaterCost.toFixed(2)}₽ <em>(${tariff} ${currentMonthElement.coldWaterM3}₽/${cubicMeters})</em></p>
<h3>${hotWaterName}</h3>
<p>${hotWater}${cubicMeters} <em>(${difference} ${hotWaterDifference}${cubicMeters})</em> = ${hotWaterCost.toFixed(2)}₽ <em>(${tariff} ${currentMonthElement.hotWaterM3}₽/${cubicMeters})</em></p>
<h3>${total}</h3>
<p>${metersCost.toFixed(2)}₽</p>
<hr>
<section class="transfer">
  <h3>${transferToLandlord}</h3>
  <p>${totalCost.toFixed(2)}₽</p>
</section>`
    });
};

for (let i = 0; i < 5; i++) {

  for (let k = 5; k < monthsArray.length; k++) {
    let month = monthsArray[k].toLowerCase();
    switch (true) {
      case year2021[6] === undefined && k < 7:
        month = month+2021;
        month = createMonthObj(month);
        year2021.push(month);
        break;
      case year2021[6] === undefined && k >= 7:
        electricityKwh = 5.93;
        coldWaterM3 = 38;
        month = month+2021;
        month = createMonthObj(month);
        year2021.push(month);
        break;
    
      default:
        break;
    };
  };

  for (let j = 0; j < monthsArray.length; j++) {
    let month = monthsArray[j].toLowerCase();
    switch (true) {
      case year2022[11] === undefined:
        month = month+2022;
        month = createMonthObj(month);
        year2022.push(month);
        break;
      case year2023[11] === undefined && j < 7:
        month = month+2023;
        month = createMonthObj(month);
        year2023.push(month);
        break;
      // Update the tariff values for electricity, cold water, and hot water
      case year2023[11] === undefined && j === 7:
        electricityKwh = 6.73;
        coldWaterM3 = 55.64;
        hotWaterM3 = 55.64;
        month = month+2023;
        month = createMonthObj(month);
        year2023.push(month);
        break;
      // Update the tariff values for rent itself
      case year2023[11] === undefined && j >= 8:
        rent = 29000;
        month = month+2023;
        month = createMonthObj(month);
        year2023.push(month);
        break;
      case year2024[11] === undefined:
        month = month+2024;
        month = createMonthObj(month);
        year2024.push(month);
        break;
    
      default:
        break;
    };
  };
};

function findAverages() {
  function electricityArrayAverageDifference() {
    const sum = electricityArray.reduce((acc, curr) => acc + curr, 0);
    const average = sum / electricityArray.length;
    electricityAverageDifference = parseInt(average.toFixed(0));
    return electricityAverageDifference;
  };

  function coldWaterArrayAverageDifference() {
    const sum = coldWaterArray.reduce((acc, curr) => acc + curr, 0);
    const average = sum / coldWaterArray.length;
    coldWaterAverageDifference = parseInt(average.toFixed(0));
    return coldWaterAverageDifference;
  };

  function hotWaterArrayAverageDifference() {
    const sum = hotWaterArray.reduce((acc, curr) => acc + curr, 0);
    const average = sum / hotWaterArray.length;
    hotWaterAverageDifference = parseInt(average.toFixed(0));
    return hotWaterAverageDifference;
  };

  electricityArrayAverageDifference();
  coldWaterArrayAverageDifference();
  hotWaterArrayAverageDifference();

  function electricityArrayAverage() {
    const sum = electricityLast + electricityAverageDifference;
    electricityAverage = sum;
    return electricityAverage;
  };

  function coldWaterArrayAverage() {
    const sum = coldWaterLast + coldWaterAverageDifference;
    coldWaterAverage = sum;
    return coldWaterAverage;
  };

  function hotWaterArrayAverage() {
    const sum = hotWaterLast + hotWaterAverageDifference;
    hotWaterAverage = sum;
    return hotWaterAverage;
  };

  electricityArrayAverage();
  coldWaterArrayAverage();
  hotWaterArrayAverage();
};

function calculations() {
  calculateAndDisplayRent(year2021[0].name, 25075, 230, 135);
  calculateAndDisplayRent(year2021[1].name, 25237, 239, 138);
  calculateAndDisplayRent(year2021[2].name, 25412, 246, 140);
  calculateAndDisplayRent(year2021[3].name, 25589, 253, 143);
  calculateAndDisplayRent(year2021[4].name, 25729, 260, 147);
  calculateAndDisplayRent(year2021[5].name, 25872, 264, 150);
  calculateAndDisplayRent(year2021[6].name, 26042, 270, 158);

  calculateAndDisplayRent(year2022[0].name, 26234, 277, 164);
  calculateAndDisplayRent(year2022[1].name, 26432, 283, 169);
  calculateAndDisplayRent(year2022[2].name, 26600, 288, 174);
  calculateAndDisplayRent(year2022[3].name, 26784, 294, 179);
  calculateAndDisplayRent(year2022[4].name, 26934, 301, 184);
  calculateAndDisplayRent(year2022[5].name, 27038, 312, 189);
  calculateAndDisplayRent(year2022[6].name, 27150, 325, 195);
  calculateAndDisplayRent(year2022[7].name, 27260, 334, 200);
  calculateAndDisplayRent(year2022[8].name, 27374, 343, 207);
  calculateAndDisplayRent(year2022[9].name, 27504, 351, 214);
  calculateAndDisplayRent(year2022[10].name, 27641, 359, 223);
  calculateAndDisplayRent(year2022[11].name, 27766, 366, 229);

  calculateAndDisplayRent(year2023[0].name, 27908, 375, 237);
  calculateAndDisplayRent(year2023[1].name, 28042, 383, 243);
  calculateAndDisplayRent(year2023[2].name, 28149, 389, 249);
  calculateAndDisplayRent(year2023[3].name, 28271, 397, 255);
  calculateAndDisplayRent(year2023[4].name, 28384, 406, 262);
  calculateAndDisplayRent(year2023[5].name, 28509, 416, 268);
  calculateAndDisplayRent(year2023[6].name, 28603, 425, 271);
  calculateAndDisplayRent(year2023[7].name, 28703, 436, 275);
  calculateAndDisplayRent(year2023[8].name, 28797, 446, 279);
  calculateAndDisplayRent(year2023[9].name, 28901, 455, 284);
  calculateAndDisplayRent(year2023[10].name, 29025, 464, 291);
  calculateAndDisplayRent(year2023[11].name, 29135, 473, 299);

  findAverages();

  // calculateAndDisplayRent(year2024[0].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[1].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[2].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[3].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[4].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[5].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[6].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[7].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[8].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[9].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[10].name, electricityAverage, coldWaterAverage, hotWaterAverage);
  // calculateAndDisplayRent(year2024[11].name, electricityAverage, coldWaterAverage, hotWaterAverage);
};

calculations();