const roundNumber = (numb) => Math.floor(numb);

const covid19ImpactEstimator = (data) => {
  const { timeToElapse, reportedCases } = data;
  // impact estimation
  const currentlyInfected = (multiples) => reportedCases * multiples;
  const infectionsByRequestedTime = (multiples) => {
    return currentlyInfected(multiples) * 2 ** roundNumber(timeToElapse / 3);
  };
  const severeCasesByRequestedTime = (multiples) => 0.15 * infectionsByRequestedTime(multiples);
  // output
  return {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfected(10),
        infectionsByRequestedTime: infectionsByRequestedTime(10),
        severeCasesByRequestedTime: severeCasesByRequestedTime(10)
      },
      severeImpact: {
        currentlyInfected: currentlyInfected(50),
        infectionsByRequestedTime: infectionsByRequestedTime(50),
        severeCasesByRequestedTime: severeCasesByRequestedTime(50)
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
