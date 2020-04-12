const roundNumber = (numb) => {
  const stringNum = numb.toString().split('.')[0];
  return Number(stringNum);
};

const nomaliseToDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return null;
  }
};

const covid19ImpactEstimator = (data) => {
  const {
    timeToElapse, reportedCases, totalHospitalBeds, region, periodType
  } = data;
  // impact estimation
  const currentlyInfected = (i) => reportedCases * i;
  const infectionsByRequestedTime = (i) => {
    return currentlyInfected(i) * 2 ** roundNumber(timeToElapse / 3);
  };
  const severeCasesByRequestedTime = (i) => 0.15 * infectionsByRequestedTime(i);
  const hospitalBedsByRequestedTime = (i) => {
    return roundNumber(totalHospitalBeds * 0.35 - severeCasesByRequestedTime(i));
  };
  const casesForICUByRequestedTime = (i) => 0.05 * infectionsByRequestedTime(i);
  const casesForVentilatorsByRequestedTime = (i) => {
    return roundNumber(0.02 * infectionsByRequestedTime(i));
  };
  const dollarsInFlight = (i) => {
    return roundNumber((infectionsByRequestedTime(i) * region.avgDailyIncomeInUSD
      * region.avgDailyIncomePopulation) / nomaliseToDays(periodType, timeToElapse));
  };
  // output
  return {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfected(10),
        infectionsByRequestedTime: infectionsByRequestedTime(10),
        severeCasesByRequestedTime: severeCasesByRequestedTime(10),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(10),
        casesForICUByRequestedTime: casesForICUByRequestedTime(10),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(10),
        dollarsInFlight: dollarsInFlight(10)
      },
      severeImpact: {
        currentlyInfected: currentlyInfected(50),
        infectionsByRequestedTime: infectionsByRequestedTime(50),
        severeCasesByRequestedTime: severeCasesByRequestedTime(50),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(50),
        casesForICUByRequestedTime: casesForICUByRequestedTime(50),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(50),
        dollarsInFlight: dollarsInFlight(50)
      }
    }
  };
};


// const dummyData = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };

// console.log(covid19ImpactEstimator(dummyData));
export default covid19ImpactEstimator;
