const roundNumber = (numb) => {
  const stringNum = numb.toString().split('.')[0];
  return Number(stringNum);
};

const covid19ImpactEstimator = (data) => {
  const { timeToElapse, reportedCases, totalHospitalBeds } = data;
  // impact estimation
  const currentlyInfected = (multiples) => reportedCases * multiples;
  const infectionsByRequestedTime = (multiples) => {
    return currentlyInfected(multiples) * 2 ** roundNumber(timeToElapse / 3);
  };
  const severeCasesByRequestedTime = (multiples) => 0.15 * infectionsByRequestedTime(multiples);
  const hospitalBedsByRequestedTime = (multiples) => {
    return roundNumber(totalHospitalBeds * 0.35 - severeCasesByRequestedTime(multiples));
  };
  // output
  return {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfected(10),
        infectionsByRequestedTime: infectionsByRequestedTime(10),
        severeCasesByRequestedTime: severeCasesByRequestedTime(10),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(10)
      },
      severeImpact: {
        currentlyInfected: currentlyInfected(50),
        infectionsByRequestedTime: infectionsByRequestedTime(50),
        severeCasesByRequestedTime: severeCasesByRequestedTime(50),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(50)
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
