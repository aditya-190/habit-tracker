import { useState } from "react";

const AddHabitDialog = ({ open, onClose, onAdd }) => {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

  const handleAdd = () => {
    if (habitName.trim()) {
      onAdd(habitName.trim(), habitDescription.trim());
      setHabitName("");
      setHabitDescription("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl z-50">
      <div
        className="flex flex-col rounded-2xl shadow-2xl px-4 py-4 w-full m-4 md:px-8 md:py-8 md:w-fit md:m-0"
        style={{
          background: "rgba(40,48,56,0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(139, 148, 158, 0.2)",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 0 rgba(255,255,255,0.10) inset",
        }}
      >
        <h2 className="font-extrabold text-white text-center tracking-tight text-md mb-2 md:text-3xl md:mb-8">
          Add New Habit
        </h2>
        <input
          className="text-white focus:outline-none px-4 py-2 mb-2 md:min-w-xl md:px-6 md:py-4 md:mb-4"
          type="text"
          placeholder="Habit name"
          value={habitName}
          onChange={(event) => setHabitName(event.target.value)}
          autoFocus
          style={{
            background: "rgb(28 32 36)",
            backdropFilter: "blur(24px) saturate(200%)",
            border: "1px solid rgba(139, 148, 158, 0.5)",
            borderRadius: "12px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
          }}
        />
        <input
          className="text-white focus:outline-none px-4 py-2 mb-2 md:min-w-xl md:px-6 md:py-4 md:mb-4"
          type="text"
          placeholder="Habit description (Optional)"
          value={habitDescription}
          onChange={(event) => setHabitDescription(event.target.value)}
          style={{
            background: "rgb(28 32 36)",
            backdropFilter: "blur(24px) saturate(200%)",
            border: "1px solid rgba(139, 148, 158, 0.5)",
            borderRadius: "12px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
          }}
        />
        <div className="flex justify-end gap-2">
          <div
            className="flex items-center justify-center text-white px-4 py-2 cursor-pointer md:px-8 md:py-3"
            style={{
              background: "transparent",
              border: "1px solid rgba(139, 148, 158, 0.7)",
              borderRadius: "12px",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
            }}
            onClick={onClose}
          >
            Cancel
          </div>
          <div
            className="flex items-center justify-center text-white px-4 py-2 cursor-pointer md:px-8 md:py-3"
            style={{
              background: "rgb(28 32 36)",
              backdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(139, 148, 158, 0.5)",
              borderRadius: "12px",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
            }}
            onClick={handleAdd}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabitDialog;
