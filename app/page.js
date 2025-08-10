"use client";

import { useEffect, useState } from "react";
import TopHeader from "./components/TopHeader";
import CustomTable from "./components/CustomTable";
import CustomGraph from "./components/CustomGraph";
import AddHabitDialog from "./components/HabitDialog";

const Home = () => {
  const HABITS_KEY = "habits_key";
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [habits, setHabits] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getMonths = (year) => [
    { name: "January", days: "31" },
    { name: "February", days: isLeapYear(year) ? 29 : 28 },
    { name: "March", days: "31" },
    { name: "April", days: "30" },
    { name: "May", days: "31" },
    { name: "June", days: "30" },
    { name: "July", days: "31" },
    { name: "August", days: "31" },
    { name: "September", days: "30" },
    { name: "October", days: "31" },
    { name: "November", days: "30" },
    { name: "December", days: "31" },
  ];

  const getHabitsFromStorage = (year, monthIndex) => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(HABITS_KEY);
    if (!data) return [];
    const allHabits = JSON.parse(data);
    const key = `${year}_${monthIndex}`;
    return allHabits[key] || [];
  };

  const saveHabitsToStorage = (year, monthIndex, habits) => {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem(HABITS_KEY);
    let allHabits = {};
    if (data) {
      allHabits = JSON.parse(data);
    }
    const key = `${year}_${monthIndex}`;
    allHabits[key] = habits;
    localStorage.setItem(HABITS_KEY, JSON.stringify(allHabits));
  };

  const getFirstHabitMonth = () => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(HABITS_KEY);
    if (!data) return null;
    const allHabits = JSON.parse(data);
    const monthsWithHabits = Object.keys(allHabits)
      .filter(
        (key) => Array.isArray(allHabits[key]) && allHabits[key].length > 0
      )
      .map((key) => {
        const [year, month] = key.split("_").map(Number);
        return { year, month };
      });

    if (monthsWithHabits.length === 0) return null;
    monthsWithHabits.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
    return monthsWithHabits[0];
  };

  const handlePreviousClicked = () => {
    const first = getFirstHabitMonth();
    if (first === null) return;
    if (
      first &&
      currentYear === first.year &&
      currentMonthIndex === first.month
    ) {
      return;
    }
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextClicked = () => {
    const today = new Date();
    if (
      currentYear === today.getFullYear() &&
      currentMonthIndex === today.getMonth()
    ) {
      return;
    }

    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const handleHabitChange = (habitIndex, dayIndex) => {
    const updatedHabits = habits.map((habit, hIdx) => {
      if (hIdx !== habitIndex) return habit;
      const updatedDays = habit.days.map((done, dIdx) =>
        dIdx === dayIndex ? !done : done
      );
      return { ...habit, days: updatedDays };
    });
    setHabits(updatedHabits);
    saveHabitsToStorage(currentYear, currentMonthIndex, updatedHabits);
  };

  const handleHabitAdd = (name) => {
    const daysCount = Number(months[currentMonthIndex].days);
    const newHabit = {
      name,
      days: Array(daysCount).fill(false),
    };
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabitsToStorage(currentYear, currentMonthIndex, updatedHabits);
    setShowDialog(false);
  };

  const handleCopyHabits = () => {
    const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    const prevMonth = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const prevHabits = getHabitsFromStorage(prevYear, prevMonth);
    const daysCount = Number(months[currentMonthIndex].days);
    const copiedHabits = prevHabits.map((h) => ({
      name: h.name,
      days: Array(daysCount).fill(false),
    }));
    setHabits(copiedHabits);
    saveHabitsToStorage(currentYear, currentMonthIndex, copiedHabits);
    setShowCopyButton(false);
  };

  const months = getMonths(currentYear);

  useEffect(() => {
    const loadedHabits = getHabitsFromStorage(currentYear, currentMonthIndex);
    setHabits(loadedHabits);

    if (!loadedHabits.length) {
      const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
      const prevMonth = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
      const prevHabits = getHabitsFromStorage(prevYear, prevMonth);
      setShowCopyButton(prevHabits.length > 0);
    } else {
      setShowCopyButton(false);
    }
  }, [currentYear, currentMonthIndex]);

  return (
    <div
      className="home w-screen h-full min-h-screen p-4 flex flex-col overflow-y-scroll"
      style={{
        background: "#0D1117",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        overflowX: "hidden",
      }}
    >
      <TopHeader
        currentMonth={`${months[currentMonthIndex].name} ${currentYear}`}
        onPreviousClicked={handlePreviousClicked}
        onNextClicked={handleNextClicked}
        onAddHabitClicked={() => setShowDialog(true)}
      />
      {showCopyButton && (
        <div className="flex absolute w-screen h-screen justify-center items-center">
          <div
            className="px-6 py-3 font-bold text-xl text-white cursor-pointer"
            style={{
              background: "rgba(40, 48, 56, 1)",
              backdropFilter: "blur(32px) saturate(220%)",
              border: "1.5px solid rgba(139, 148, 158, 0.2)",
              borderRadius: "16px",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.3) inset 0 2px 1px rgba(255, 255, 255, 0,1)",
            }}
            onClick={handleCopyHabits}
          >
            Copy Habits from Previous Month
          </div>
        </div>
      )}
      <CustomTable
        habits={habits}
        daysCount={months[currentMonthIndex].days}
        onHabitChange={handleHabitChange}
      />
      <CustomGraph habits={habits} daysCount={months[currentMonthIndex].days} />
      <AddHabitDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onAdd={handleHabitAdd}
      />
    </div>
  );
};

export default Home;
