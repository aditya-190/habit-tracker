const TodayHabits = ({ habits }) => {
    const todaysDate = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const totalCount = habits.length;
    const completedCount = (habits).reduce((sum, single) => {
        return sum + (single.days[new Date().getDate() - 1] ? 1 : 0);
    }, 0);

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (!habits || habits.length === 0) return null;
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
            <div className="w-full py-2 px-4 flex flex-row items-center justify-center">
                <div className="flex flex-col flex-1">
                    <div className="text-sm text-white/70">Today</div>
                    <div className="text-2xl font-extrabold tracking-tight">
                        {todaysDate}
                    </div>
                    <div className="text-white/70 mt-1">
                        {completedCount}/{totalCount} habits completed
                    </div>
                </div>
                <div className="flex flex-col flex-2">
                    <div className="h-3 w-full rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                            style={{
                                width: `${percentage}%`,
                            }}
                        />
                    </div>
                    <div className="mt-1 text-right text-xs text-white/70">{percentage}%</div>
                </div>
            </div>
        </div>
    );
};

export default TodayHabits;
