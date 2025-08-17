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
        className="flex flex-col px-8 py-8 rounded-2xl shadow-2xl"
        style={{
          background: "rgba(40,48,56,0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(139, 148, 158, 0.2)",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 0 rgba(255,255,255,0.10) inset",
        }}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-white text-center tracking-tight">
          Add New Habit
        </h2>
        <input
          className="min-w-xl px-6 py-4 mb-4 text-white focus:outline-none"
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
          className="min-w-xl px-6 py-4 mb-8 text-white focus:outline-none"
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
            className="flex items-center justify-center text-white px-8 py-3 cursor-pointer"
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
            className="flex items-center justify-center text-white px-8 py-3 cursor-pointer"
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
