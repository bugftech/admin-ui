function getLast7Days(): string[] {
  const today = new Date();
  const last7Days: string[] = [];

  for (let i = 1; i <= 7; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    last7Days.push(pastDate.toISOString().split("T")[0]);
  }

  return last7Days;
}


function calculateTotal(data: number[]): number {
  return data.reduce((total, num) => total + num, 0);
}

function calculateGrowthRate(currentTotal: number, previousTotal: number): number {
  return ((currentTotal - previousTotal) / previousTotal) * 100;
}

// 近7天和上个周期的数据
const currentPeriodData = [3, 4, 1, 5, 2, 8, 3];
const previousPeriodData = [4, 3, 1, 4, 3, 5, 4];

// 计算总和
const currentPeriodTotal = calculateTotal(currentPeriodData);
const previousPeriodTotal = calculateTotal(previousPeriodData);

// 计算增长率
 export const growthRate = calculateGrowthRate(currentPeriodTotal, previousPeriodTotal);

export const data = {
  labels: getLast7Days().reverse(),
  datasets: [
    {
      label: "近7天订单",
      backgroundColor: "#3F51B5",
      borderColor: "#3F51B5",
      borderWidth: 3,
      data: currentPeriodData,
      fill: true,
    },
    {
      label: "上个周期",
      backgroundColor: "#C5CAE9",
      data: previousPeriodData,
      fill: true,
      borderColor: "#C5CAE9",
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: true, // 隐藏X轴的网格线
      },
    },
    y: {
      grid: {
        display: false, // 隐藏Y轴的网格线
      },
    },
  },
};
