import { useEffect, useRef } from "react";

const CustomTable = ({ habits, daysCount, onHabitChange }) => {
  const todayDate = new Date().getDate();
  const tableContainerRef = useRef(null);

  const headers = [
    <th
      key="habit"
      className="px-4 py-3 text-left font-extrabold text-md sticky left-0 z-20"
      style={{ background: "rgba(40, 48, 56, 1)" }}
    >
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
          className={`px-3 py-3 text-center text-sm font-semibold ${dayIndex + 1 === todayDate ? "bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" : ""}`}
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

  useEffect(() => {
    if (tableContainerRef.current) {
      const ths = tableContainerRef.current.querySelectorAll("th");
      if (ths && ths.length > todayDate) {
        const todayTh = ths[todayDate];
        if (todayTh && todayTh.scrollIntoView) {
          todayTh.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      }
    }
  }, [daysCount]);

  return (
    <div
      ref={tableContainerRef}
      className="mb-10 py-2 pe-2 overflow-x-scroll flex h-full w-full text-white"
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
              <td
                className="px-4 py-3 font-extrabold text-md whitespace-nowrap max-w-[120px] relative group sticky left-0 z-20"
                style={{ background: "rgba(40, 48, 56, 1)" }}
              >
                <div className="truncate cursor-pointer">{habit.name}</div>
                <div
                  className="absolute left-full top-1/2 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto whitespace-nowrap rounded-xl px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-200 min-w-[180px] -translate-y-1/2 ml-2"
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                >
                  <div className="font-extrabold">{habit.name}</div>
                  {habit.description && (
                    <div className="font-extralight mb-1">
                      {habit.description}
                    </div>
                  )}
                </div>
              </td>
              {habit.days.map((done, dayIndex) => (
                <td
                  key={dayIndex}
                  className="px-3 py-3 text-center align-middle"
                >
                  <div
                    className={`w-5 h-5 rounded-xs focus:outline-none border-1
                      ${done ? "bg-white" : "border-white"}
                      ${dayIndex + 1 === todayDate ? "border-8 border-double border-white" : ""}
                      `}
                    onClick={() => onHabitChange(habitIndex, dayIndex)}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
          <tr className="day-count text-white">
            <td
              className="px-4 py-3 text-left text-md font-extrabold sticky left-0 z-20"
              style={{ background: "rgba(40, 48, 56, 1)" }}
            >
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
