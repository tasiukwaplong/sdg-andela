// dummy data for input
// const dummyData = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };


const covid19ImpactEstimator = (data) => {
  const { timeToElapse, reportedCases } = data;
  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime: this.currentlyInfected * (2 ** timeToElapse)
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: this.currentlyInfected * (2 ** timeToElapse)
    }
  };
};

// console.log(covid19ImpactEstimator(dummyData));

export default covid19ImpactEstimator;
