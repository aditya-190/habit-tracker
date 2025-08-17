import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CustomGraph = ({ habits, daysCount }) => {
  if (!habits || habits.length === 0) return null;
  const dailyPercentages = Array.from({ length: daysCount }, (_, dayIdx) => {
    const completed = habits.reduce(
      (sum, habit) => sum + (habit.days[dayIdx] ? 1 : 0),
      0
    );
    return habits.length > 0
      ? Math.round((completed / habits.length) * 100)
      : 0;
  });

  const habitPercentages = habits.map((habit) => {
    const completed = habit.days.filter(Boolean).length;
    return daysCount > 0 ? Math.round((completed / daysCount) * 100) : 0;
  });

  const dailyOptions = {
    chart: {
      type: "bar",
      height: "100%",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    xaxis: {
      categories: Array.from({ length: daysCount }, (_, i) => String(i + 1)),
      labels: {
        style: { colors: "#FFFFFF", fontWeight: 400 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      max: 100,
      min: 0,
      labels: {
        style: { colors: "#FFFFFF", fontWeight: 400, fontSize: "1rem" },
      },
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    colors: ["#FFFFFF"],
  };

  const habitOptions = {
    chart: {
      type: "bar",
      height: "100%",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "50%", borderRadius: 2 },
    },
    xaxis: {
      categories: habits.map((h) => h.name),
      max: 100,
      labels: {
        style: { colors: "#FFFFFF", fontWeight: 400 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#FFFFFF", fontWeight: 400 },
      },
    },
    grid: { show: false },
    dataLabels: {
      enabled: true,
      formatter: (val) => (val === 0 ? "" : `${val}%`),
      style: { colors: ["#000"] },
    },
    colors: ["#FFFFFF"],
  };

  const calculateHeightOfGraphs = () => {
    const clampedHeight = Math.min(Math.max(habits.length, 1), 15);
    const height = 20 + (clampedHeight - 1) * 5;
    return `${height}vh`;
  };

  return (
    <div className="w-full flex flex-row gap-8 mb-24">
      <div
        className="flex-2 p-4"
        style={{
          height: calculateHeightOfGraphs(),
          background: "rgba(40, 48, 56, 1)",
          backdropFilter: "blur(32px) saturate(220%)",
          border: "1.5px solid rgba(139, 148, 158, 0.2)",
          borderRadius: "16px",
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
        }}
      >
        <Chart
          options={dailyOptions}
          series={[{ name: "Daily %", data: dailyPercentages }]}
          type="bar"
          height="100%"
        />
      </div>
      <div
        className="flex-1 p-4"
        style={{
          height: calculateHeightOfGraphs(),
          background: "rgba(40, 48, 56, 1)",
          backdropFilter: "blur(32px) saturate(220%)",
          border: "1.5px solid rgba(139, 148, 158, 0.2)",
          borderRadius: "16px",
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
        }}
      >
        <Chart
          options={habitOptions}
          series={[{ name: "Habit %", data: habitPercentages }]}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CustomGraph;
