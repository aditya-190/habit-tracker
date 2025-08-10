const CustomTable = ({ habits, daysCount, onHabitChange }) => {
  if (!habits || habits.length === 0) return null;
  const headers = [
    <th key="habit" className="px-4 py-3 text-left font-extrabold text-md">
      Habit
    </th>,
    ...Array.from({ length: daysCount }, (_, dayIndex) => {
      const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        dayIndex + 1
      );
      const dayShort = date.toLocaleDateString("en-US", { weekday: "short" });
      return (
        <th
          key={dayIndex}
          className="px-3 py-3 text-center text-sm font-semibold"
        >
          {dayShort}
          <br />
          {String(dayIndex + 1).padStart(2, "0")}
        </th>
      );
    }),
  ];

  const totals = Array.from({ length: daysCount }, (_, dayIndex) =>
    habits.reduce((sum, habit) => sum + (habit.days[dayIndex] ? 1 : 0), 0)
  );

  return (
    <div
      className="mb-10 p-2 overflow-x-scroll flex h-full w-full text-white"
      style={{
        background: "rgba(40, 48, 56, 1)",
        backdropFilter: "blur(32px) saturate(220%)",
        border: "1.5px solid rgba(139, 148, 158, 0.2)",
        borderRadius: "16px",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
      }}
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habitIndex}>
              <td className="px-4 py-3 font-extrabold text-md whitespace-nowrap max-w-42 overflow-ellipsis overflow-hidden">
                {habit.name}
              </td>
              {habit.days.map((done, dayIndex) => (
                <td
                  key={dayIndex}
                  className="px-3 py-3 text-center align-middle"
                >
                  <div
                    className={`w-5 h-5 rounded-xs focus:outline-none border-1
                      ${done ? "bg-white" : "border-white"}
                      `}
                    onClick={() => onHabitChange(habitIndex, dayIndex)}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
          <tr className="day-count text-white">
            <td className="px-4 py-3 text-left text-md font-extrabold">
              Total
            </td>
            {totals.map((count, i) => (
              <td
                key={i}
                className="px-3 py-3 text-center text-md font-light align-middle"
              >
                {count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
