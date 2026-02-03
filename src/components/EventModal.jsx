import { useState } from "react";

export default function EventModal({ date, events, setEvents, onClose }) {
  const [title, setTitle] = useState("");

  const saveEvent = () => {
    if (!title) return;

    setEvents({
      ...events,
      [date]: [...(events[date] || []), { title }],
    });

    onClose(); // ✅ CLOSE MODAL PROPERLY
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Add Reminder</h2>
        <p className="text-sm text-gray-400 mb-4">{date}</p>

        <input
          className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            onClick={saveEvent}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500"
          >
            Save
          </button>
        </div>

        {/* Show existing events */}
        <div className="mt-4">
          {events[date]?.map((e, i) => (
            <p key={i} className="text-sm text-gray-300">
              • {e.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
