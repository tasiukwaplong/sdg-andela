const roundNumber = (numb) => {
  const stringNum = numb.toString().split('.')[0];
  return Number(stringNum);
};
const IMPACT_MULTIPLES = 10;
const SEVERER_IMPACT_MULTIPLES = 50;
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
  const infectionsByRequestedTime = (i) => currentlyInfected(i)
    * 2 ** roundNumber(nomaliseToDays(periodType, timeToElapse) / 3); // infectionsByRequestedTime
  const severeCasesByRequestedTime = (i) => 0.15 * infectionsByRequestedTime(i);
  const hospitalBedsByRequestedTime = (i) => roundNumber(totalHospitalBeds
    * 0.35 - severeCasesByRequestedTime(i)); // hospitalBedsByRequestedTime
  const casesForICUByRequestedTime = (i) => 0.05 * infectionsByRequestedTime(i);
  const casesForVentilatorsByRequestedTime = (i) => roundNumber(0.02
    * infectionsByRequestedTime(i)); // casesForVentilatorsByRequestedTime
  const dollarsInFlight = (i) => roundNumber((infectionsByRequestedTime(i)
    * region.avgDailyIncomeInUSD
    * region.avgDailyIncomePopulation) / nomaliseToDays(periodType, timeToElapse));
  // output
  return {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfected(IMPACT_MULTIPLES),
        infectionsByRequestedTime: infectionsByRequestedTime(IMPACT_MULTIPLES),
        severeCasesByRequestedTime: severeCasesByRequestedTime(IMPACT_MULTIPLES),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(IMPACT_MULTIPLES),
        casesForICUByRequestedTime: casesForICUByRequestedTime(IMPACT_MULTIPLES),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(IMPACT_MULTIPLES),
        dollarsInFlight: dollarsInFlight(IMPACT_MULTIPLES)
      },
      severeImpact: {
        currentlyInfected: currentlyInfected(SEVERER_IMPACT_MULTIPLES),
        infectionsByRequestedTime: infectionsByRequestedTime(SEVERER_IMPACT_MULTIPLES),
        severeCasesByRequestedTime: severeCasesByRequestedTime(SEVERER_IMPACT_MULTIPLES),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(SEVERER_IMPACT_MULTIPLES),
        casesForICUByRequestedTime: casesForICUByRequestedTime(SEVERER_IMPACT_MULTIPLES),
        casesForVentilatorsByRequestedTime:
          casesForVentilatorsByRequestedTime(SEVERER_IMPACT_MULTIPLES),
        dollarsInFlight: dollarsInFlight(SEVERER_IMPACT_MULTIPLES)
      }
    }
  };
};

// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
