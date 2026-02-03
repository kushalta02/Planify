import { useState } from "react";

export default function EventModal({ date, events, setEvents, onClose }) {
  const [title, setTitle] = useState("");

  const saveEvent = () => {
    if (!title) return;

    setEvents({
      ...events,
      [date]: [...(events[date] || []), { title }],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 
      bg-black/70 backdrop-blur-sm 
      flex items-center justify-center">

      <div className="w-96 bg-gradient-to-br from-slate-900 to-black 
        text-slate-100 rounded-2xl p-6 shadow-2xl 
        animate-scaleIn">

        <h2 className="text-xl font-bold text-indigo-300 mb-1">
          Add Reminder
        </h2>
        <p className="text-sm text-slate-400 mb-4">{date}</p>

        <input
          className="w-full px-4 py-2 rounded-lg 
          bg-slate-800 border border-slate-700 
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg 
            bg-slate-700 hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={saveEvent}
            className="px-4 py-2 rounded-lg 
            bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Save
          </button>
        </div>

        {/* Existing events */}
        <div className="mt-4 space-y-1">
          {events[date]?.map((e, i) => (
            <p key={i} className="text-sm text-slate-300">
              • {e.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
