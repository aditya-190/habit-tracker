const TopHeader = ({
  currentMonth,
  onPreviousClicked,
  onNextClicked,
  onAddHabitClicked,
  onEditHabitClicked,
}) => {
  return (
    <header className="top mb-10 flex justify-between items-center flex-col lg:flex-row">
      <h1 className="habit-tracker flex-1 font-bold leading-tight text-3xl lg:text-4xl">
        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Rewire Habituality
        </span>
      </h1>
      <div className="w-full flex flex-2 flex-col justify-between mt-4 sm:flex-row sm:mt-4 lg:mt-0">
      <div className="flex flex-1 h-full flex-row items-center justify-center">
        <div
          className="previous-button h-full flex items-center justify-center px-3 py-2 font-bold text-white cursor-pointer select-none text-md lg:text-xl xl:text-2xl"
          style={{
            background: "#283038cc",
            backdropFilter: "blur(32px) saturate(220%)",
            border: "1.5px solid rgba(139, 148, 158, 0.2)",
            borderRadius: "16px",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
          }}
          onClick={onPreviousClicked}
        >
          ←
        </div>
        <div
          className="current-month h-full flex items-center justify-center px-3 py-2 text-white mx-4 font-extrabold select-none text-md lg:text-2xl xl:text-3xl"
          style={{
            background: "#283038cc",
            backdropFilter: "blur(32px) saturate(220%)",
            border: "1.5px solid rgba(139, 148, 158, 0.2)",
            borderRadius: "16px",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
          }}
        >
          {currentMonth}
        </div>
        <div
          className="next-button px-3 py-2 font-bold text-white cursor-pointer select-none text-md lg:text-xl xl:text-2xl"
          style={{
            background: "#283038cc",
            backdropFilter: "blur(32px) saturate(220%)",
            border: "1.5px solid rgba(139, 148, 158, 0.2)",
            borderRadius: "16px",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
          }}
          onClick={onNextClicked}
        >
          →
        </div>
      </div>
      <div className="h-full flex flex-1 items-center justify-center mt-4 sm:mt-0 lg:justify-end">
        <div
          className="edit-habit px-4 py-2 me-4 text-white font-semibold cursor-pointer select-none text-md lg:text-lg xl:text-xl"
          style={{
            background: "#283038cc",
            backdropFilter: "blur(32px) saturate(220%)",
            border: "1.5px solid rgba(139, 148, 158, 0.2)",
            borderRadius: "16px",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
          }}
          onClick={onEditHabitClicked}
        >
          Edit Habit
        </div>

        <div
          className="add-habit px-4 py-2 text-white font-semibold cursor-pointer select-none text-md lg:text-lg xl:text-xl"
          style={{
            background: "#283038cc",
            backdropFilter: "blur(32px) saturate(220%)",
            border: "1.5px solid rgba(139, 148, 158, 0.2)",
            borderRadius: "16px",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
          }}
          onClick={onAddHabitClicked}
        >
          + Add Habit
        </div>
      </div>
      </div>
    </header>
  );
};

export default TopHeader;
