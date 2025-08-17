import { useEffect, useState } from "react";

const EditHabitDialog = ({ open, onClose, habits = [], onEdit }) => {
  const [localHabits, setLocalHabits] = useState([]);

  useEffect(() => {
    if (open) {
      setLocalHabits((habits || []).map((data) => ({ ...data })));
    }
  }, [open, habits]);

  const updateField = (index, field, value) => {
    const copy = [...localHabits];
    copy[index] = { ...copy[index], [field]: value };
    setLocalHabits(copy);
  };

  const rename = (index, value) => updateField(index, "name", value);
  const updateDescription = (index, value) =>
    updateField(index, "description", value);

  const moveUp = (index) => {
    if (index === 0) return;
    const copy = [...localHabits];
    [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
    setLocalHabits(copy);
  };

  const moveDown = (index) => {
    if (index === localHabits.length - 1) return;
    const copy = [...localHabits];
    [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
    setLocalHabits(copy);
  };

  const deleteHabit = (index) => {
    if (!window.confirm("Delete this habit?")) return;
    const copy = [...localHabits];
    copy.splice(index, 1);
    setLocalHabits(copy);
  };

  const handleSave = () => {
    onEdit(localHabits);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay fixed inset-0 flex items-center justify-center backdrop-blur-3xl z-50">
      <div
        className="dialog flex flex-col px-8 py-8 rounded-2xl shadow-2xl min-w-2xl"
        style={{
          background: "rgba(40,48,56,0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 8px 40px 0 rgba(255, 255, 225, 0.1), 0 1.5px 0 rgba(255,255,255,0.1) inset",
        }}
      >
        <h2 className="heading text-2xl font-extrabold mb-4 text-white text-center tracking-tight">
          Edit Habits
        </h2>

        <div className="habit-list flex flex-col">
          {localHabits.length === 0 && (
            <div className="text-white/60 p-4">No habits for this month.</div>
          )}

          {localHabits.map((single, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-2 mb-2"
            >
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => moveUp(index)}
                  className="flex items-center justify-center px-4 py-2 text-white rounded-md cursor-pointer"
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                >
                  ▲
                </div>
                <div
                  onClick={() => moveDown(index)}
                  className="flex items-center justify-center px-4 py-2 text-white rounded-md cursor-pointer"
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                >
                  ▼
                </div>
              </div>
              <div className="flex flex-col">
                <input
                  className="min-w-md px-4 py-3 text-white focus:outline-none"
                  type="text"
                  placeholder="Habit name"
                  value={single.name}
                  onChange={(event) => rename(index, event.target.value)}
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
                  className="min-w-md mt-2 px-4 py-3 text-white focus:outline-none"
                  type="text"
                  placeholder="Habit Description (Optional)"
                  value={single.description}
                  onChange={(event) =>
                    updateDescription(index, event.target.value)
                  }
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                />
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
                onClick={() => deleteHabit(index)}
              >
                Remove
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-2">
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
            onClick={handleSave}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHabitDialog;
