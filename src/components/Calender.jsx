import { useState, useEffect } from "react";
import EventModal from "./EventModal";

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = date.toLocaleString("default", { month: "long" });

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
      from-indigo-900/40 via-slate-900 to-black">

      <div className="w-full max-w-5xl 
        bg-white/10 backdrop-blur-2xl 
        rounded-3xl shadow-2xl 
        p-8 text-slate-100">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setDate(new Date(year, month - 1, 1))}
            className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-indigo-500/20 text-indigo-300 
            hover:bg-indigo-500 hover:text-white 
            transition-all duration-300 shadow-lg"
          >
            ◀
          </button>

          <h2 className="text-3xl font-bold tracking-wide text-indigo-200">
            {monthName} {year}
          </h2>

          <button
            onClick={() => setDate(new Date(year, month + 1, 1))}
            className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-indigo-500/20 text-indigo-300 
            hover:bg-indigo-500 hover:text-white 
            transition-all duration-300 shadow-lg"
          >
            ▶
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 mb-3 text-center text-sm font-semibold text-indigo-300">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid (FIXED HEIGHT – NO SHRINKING) */}
        <div className="grid grid-cols-7 grid-rows-6 gap-4">
          {days.map((day, index) => {
            const isToday =
              day &&
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            const dateKey = `${year}-${month + 1}-${day}`;
            const hasEvent = events[dateKey];

            return (
              <div
                key={index}
                onClick={() => day && setSelectedDate(dateKey)}
                className={`
                  h-28 rounded-2xl p-3 cursor-pointer relative
                  border border-white/10
                  transition-all duration-300
                  hover:scale-[1.05] hover:bg-indigo-500/10 hover:border-indigo-400
                  ${isToday ? "ring-2 ring-indigo-450 bg-indigo-500/10 text-indigo-300 font-semibold" : ""}
                `}
              >
                <span className="text-sm">{day}</span>

                {/* Event preview */}
                {hasEvent && (
                  <div className="mt-2 text-xs text-indigo-350 truncate">
                    • {events[dateKey][0].title}
                  </div>
                )}

                {/* Event dot */}
                {hasEvent && (
                  <span className="absolute bottom-3 right-3 w-2.5 h-2.5 
                  bg-indigo-400 rounded-full animate-pulse"></span>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedDate && (
          <EventModal
            date={selectedDate}
            events={events}
            setEvents={setEvents}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Calendar;
