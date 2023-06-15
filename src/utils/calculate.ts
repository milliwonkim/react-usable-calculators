export const getTranslate = (name: string) => {
  const dicts: { [key: string]: string } = {
    contributionLimit: "매월 내가 납입할 금액",
    matchingRatio: "매월 기여금 매칭비율",
    matchingLimit: "매월 기여금 한도",
    monthlyMatchingAmount: "매월 실질 기여금",
    monthlyTotalPayment: "매월 금리반영 만기액",
    matchingAmount: "* 만기 때 내가 받는 기여금",
    totalPayment: "* 만기 때 내가 받는 돈",
  };

  return dicts[name] || name;
};

// 연간 납입한도를 계산하는 함수
function calculateContributionLimit(input: number, monthly: number) {
  const income = input * 10000;
  let returnIncome: number;
  if (income <= 24_000_000) {
    returnIncome = 700_000;
  } else if (income <= 36_000_000) {
    returnIncome = 500_000;
  } else if (income <= 48_000_000) {
    returnIncome = 600_000;
  } else if (income <= 60_000_000) {
    returnIncome = 700_000;
  } else if (income <= 75_000_000) {
    returnIncome = 700_000;
  } else {
    returnIncome = 0; // 7,500만 원 이상의 소득일 경우 납입한도 없음
  }

  return Math.min(monthly, returnIncome);
}

const calculateMatching = (input: number, monthly: number) => {
  const income = input * 10000;
  let matchingRatio, matchingLimit;

  if (income <= 24_000_000) {
    matchingRatio = 0.06;
    matchingLimit = 400_000;
  } else if (income <= 36_000_000) {
    matchingRatio = 0.046;
    matchingLimit = 500_000;
  } else if (income <= 48_000_000) {
    matchingRatio = 0.037;
    matchingLimit = 600_000;
  } else if (income <= 60_000_000) {
    matchingRatio = 0.03;
    matchingLimit = 700_000;
  } else {
    matchingRatio = 0; // 7,500만 원 이상의 소득일 경우 매칭비율 없음
    matchingLimit = 0;
  }

  return {
    matchingRatio,
    matchingLimit,
    monthlyMatchingAmount: Math.min(monthly, matchingLimit) * matchingRatio,
    matchingAmount: Math.min(monthly, matchingLimit) * matchingRatio * 60,
  };
};

// 5년 만기 적금의 만기액을 계산하는 함수
function calculateSimpleInterest(
  monthlyDeposit: number,
  interestRate: number,
  years: number
) {
  // 이자율을 연 이자율로 변환
  var annualInterestRate = interestRate / 100;

  // 월 이자율 계산
  var monthlyInterestRate = annualInterestRate / 12;

  // 총 예치 금액
  var totalDeposit = monthlyDeposit * 12 * years;

  // 이자 합계 계산
  var totalInterest = 0;
  var currentPrincipal = 0;

  for (var i = 1; i <= years * 12; i++) {
    currentPrincipal = currentPrincipal + monthlyDeposit;
    totalInterest = totalInterest + currentPrincipal * monthlyInterestRate;
  }

  // 최종 금액 계산
  var totalAmount = totalDeposit + totalInterest;

  return totalAmount;
}

// 정보1과 정보2를 합치는 함수
export function combineInfo(
  income: number,
  monthlyPayment: number,
  interestRate: number
) {
  const contributionLimit = calculateContributionLimit(
    income,
    monthlyPayment * 10000
  );
  const {
    matchingRatio,
    matchingLimit,
    matchingAmount,
    monthlyMatchingAmount,
  } = calculateMatching(income, monthlyPayment * 10000);
  // const matchingLimit = calculateMatchingLimit(income);

  return {
    contributionLimit: contributionLimit,
    matchingRatio: matchingRatio,
    matchingLimit: matchingLimit,
    monthlyMatchingAmount,
    matchingAmount,
    totalPayment: calculateSimpleInterest(
      contributionLimit,
      interestRate,
      interestRate
    ),
  };
}

export const formatCurrency = (value: number, unit: string) => {
  const curr = value.toLocaleString("en-US");
  if (!unit) return curr;
  return `${curr}${unit}`;
};
