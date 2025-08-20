import { useEffect, useState } from "react";

const EditHabitDialog = ({ open, onClose, habits = [], onEdit }) => {
  const [localHabits, setLocalHabits] = useState([]);

  useEffect(() => {
    if (open) {
      setLocalHabits((habits || []).map((data) => ({ ...data })));
    }
  }, [open, habits]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

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
        className="dialog flex flex-col rounded-2xl shadow-2xl ps-4 py-4 w-full m-4 md:min-w-2xl md:ps-8 md:py-8 md:w-fit md:m-0"
        style={{
          background: "rgba(40,48,56,0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 8px 40px 0 rgba(255, 255, 225, 0.1), 0 1.5px 0 rgba(255,255,255,0.1) inset",
        }}
      >
        <h2 className="heading font-extrabold text-white text-center tracking-tight text-md mb-2 md:text-3xl md:mb-8">
          Edit Habits
        </h2>

        <div className="habit-list flex flex-col max-h-[50vh] overflow-y-scroll pr-4 md:pr-8">
          {localHabits.length === 0 && (
            <div className="text-white/60 p-2 md:p-4">No habits for this month.</div>
          )}

          {localHabits.map((single, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-1 mb-1 w-full md:gap-2 md:mb-2"
            >
              <div className="flex flex-col gap-1 hidden md:gap-2 md:flex">
                <div
                  onClick={() => moveUp(index)}
                  className="flex items-center justify-center text-white rounded-md cursor-pointer px-2 py-0 md:px-4 md:py-2 md:rounded-xl"
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                >
                  ▲
                </div>
                <div
                  onClick={() => moveDown(index)}
                  className="flex items-center justify-center text-white rounded-md cursor-pointer px-2 py-0 md:px-4 md:py-2 md:rounded-xl"
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                >
                  ▼
                </div>
              </div>
              <div className="flex flex-col w-full">
                <input
                  className="text-white focus:outline-none px-2 py-1 mt-1 rounded-md text-xs md:min-w-md md:px-4 md:py-3 md:mt-2 md:rounded-xl md:text-md"
                  type="text"
                  placeholder="Habit name"
                  value={single.name}
                  onChange={(event) => rename(index, event.target.value)}
                  autoFocus
                  style={{
                    background: "rgb(28 32 36)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(139, 148, 158, 0.5)",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                />
                <input
                  className="text-white focus:outline-none px-2 py-1 mt-1 rounded-md text-xs md:min-w-md md:px-4 md:py-3 md:mt-2 md:rounded-xl md:text-md"
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
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.3) inset 0 1px 1px rgba(255, 255, 255, 0,1)",
                  }}
                />
              </div>
              <div
                className="flex items-center justify-center text-white px-4 py-2 cursor-pointer hidden md:px-8 md:py-3 md:flex"
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

        <div className="flex justify-end gap-2 mt-4 pr-4 md:mt-6 md:pr-8">
          <div
            className="flex items-center justify-center text-white px-4 py-2 cursor-pointer text-xs md:px-8 md:py-3 md:text-md"
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
            className="flex items-center justify-center text-white px-4 py-2 cursor-pointer text-xs md:px-8 md:py-3 md:text-md"
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
