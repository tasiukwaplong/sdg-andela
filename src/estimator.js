const covid19ImpactEstimator = (data) => {
  const { timeToElapse, reportedCases } = data;
  const roundNumber = (numb) => Math.floor(numb);
  return {
    data,
    estimate: {
      impact: {
        currentlyInfected: reportedCases * 10,
        infectionsByRequestedTime: (reportedCases * 10) * 2 ** roundNumber(timeToElapse / 3)
      },
      severeImpact: {
        currentlyInfected: reportedCases * 50,
        infectionsByRequestedTime: (reportedCases * 50) * 2 ** roundNumber(timeToElapse / 3)
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
