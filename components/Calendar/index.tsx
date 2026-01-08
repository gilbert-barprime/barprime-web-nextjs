"use client";

import { FormEvent, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { customFetch } from "../../lib/helper";
import { StudyPlanner } from "../../types";
import { useSearchParams } from "next/navigation";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};

const addHour = (dateTime: Date, hour: number) => {
  const d = dateTime;
  d.setHours(d.getHours() + hour);
  return d;
};

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const query_event_id = searchParams.get("event");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState({
    add: false,
    update: false,
    delete: false,
  });

  // modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allDay, setAllDay] = useState(false);

  // form fields
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // 🟢 Add new event
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const startValue = selectInfo.start;

    setIsEdit(false);
    setSelectedId(null);
    setAllDay(false);

    setTitle("");
    setStart(getFormattedDate(startValue));
    setEnd(getFormattedDate(addHour(startValue, 1)));
    setIsOpen(true);
  };

  // 🔵 Edit existing event
  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const _start = event.start;
    const _end = event.allDay ? event.start : event.end;

    setIsEdit(true);
    setSelectedId(event.id);

    setTitle(event.title);

    if (!_start || !_end) {
      toast.warning("Missing Start or End Date!");
      return;
    }

    setStart(getFormattedDate(_start));
    setEnd(getFormattedDate(_end));
    setAllDay(event.allDay);
    setIsOpen(true);
  };

  const getStudyPlannerData = async () => {
    const result = await customFetch({
      url: `/study-planner`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    const new_events: CalendarEvent[] = result.data.map((ele: StudyPlanner) => {
      return {
        id: ele._id,
        title: ele.plan,
        start: getFormattedDate(new Date(ele.start_date)),
        end: getFormattedDate(new Date(ele.end_date)),
        allDay: ele.all_day,
      };
    });

    setEvents(new_events);
    if (query_event_id) {
      const event = new_events.find((ele) => ele.id === query_event_id);
      if (!event) {
        toast.error("Cannot find event ID!");
        return;
      }

      setIsEdit(true);
      setSelectedId(event.id);
      setTitle(event.title);
      setStart(getFormattedDate(new Date(event.start)));
      setEnd(getFormattedDate(new Date(event.end)));
      setAllDay(event.allDay);
      setIsOpen(true);
    }
  };

  const handleDeleteData = async (props: { id: string }) => {
    const result = await customFetch({
      url: `/study-planner/${props.id}`,
      method: "DELETE",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Event successfully deleted!");
    await getStudyPlannerData();
  };

  const handleUpdateData = async (props: {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    all_day: "1" | "0";
  }) => {
    const result = await customFetch({
      url: `/study-planner/${props.id}`,
      method: "PUT",
      data: JSON.stringify({
        plan: props.title,
        start_date: new Date(props.start_date),
        end_date: new Date(props.end_date),
        all_day: props.all_day,
      }),
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Event successfully updated!");
    await getStudyPlannerData();
  };

  const handleSaveData = async (props: {
    title: string;
    start_date: string;
    end_date: string;
    all_day: "1" | "0";
  }) => {
    const result = await customFetch({
      url: `/study-planner`,
      method: "POST",
      data: JSON.stringify({
        plan: props.title,
        start_date: new Date(props.start_date),
        end_date: new Date(props.end_date),
        all_day: props.all_day,
      }),
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Event successfully added!");
    await getStudyPlannerData();
  };

  // 💾 Save (add or update)
  const handleOnSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit && selectedId) {
      setLoading((prev) => {
        return { ...prev, update: true };
      });

      // UPDATE
      await handleUpdateData({
        id: selectedId,
        title: title,
        start_date: start,
        end_date: end,
        all_day: allDay ? "1" : "0",
      });

      setLoading((prev) => {
        return { ...prev, update: false };
      });
    } else {
      // ADD
      setLoading((prev) => {
        return { ...prev, add: true };
      });

      await handleSaveData({
        title: title,
        start_date: start,
        end_date: end,
        all_day: allDay ? "1" : "0",
      });

      setLoading((prev) => {
        return { ...prev, add: false };
      });
    }

    closeModal();
  };

  // 🗑 Delete
  const handleDelete = async () => {
    if (!selectedId) return;

    setLoading((prev) => {
      return { ...prev, delete: true };
    });

    await handleDeleteData({ id: selectedId });
    closeModal();

    setLoading((prev) => {
      return { ...prev, delete: false };
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedId(null);
    setTitle("");
    setStart("");
    setEnd("");
  };

  useEffect(() => {
    if (status === "authenticated") {
      getStudyPlannerData();
    }
  }, [status]);

  return (
    <div className="p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable
        editable
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short", // displays 'am/pm'
          hour12: true, // set to false for 24-hour clock
        }}
        displayEventTime={true} // ensure time is visible
        displayEventEnd={true} // show the end time too (e.g., 9a - 10a)
        // eventContent={(arg) => (
        //   <div className="truncate text-sm font-medium px-1">
        //     {arg.event.title}
        //   </div>
        // )}
      />

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <form onSubmit={handleOnSave}>
              <h2 className="mb-4 text-xl font-semibold">
                {isEdit ? "Edit Event" : "Add Event"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    What&apos;s your plan?
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allDay}
                    onChange={(e) => {
                      setAllDay(e.target.checked);
                      if (!e.target.checked) {
                        const _s = new Date(start);
                        setStart(getFormattedDate(_s));
                        setEnd(getFormattedDate(addHour(_s, 1)));
                      }
                    }}
                  />
                  <label className="text-sm font-medium">All day</label>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Start Date & Time
                  </label>
                  <input
                    type={allDay ? "date" : "datetime-local"}
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={allDay ? start.slice(0, 10) : start}
                    onChange={(e) => {
                      const curr_date = e.target.valueAsDate;
                      const value = allDay
                        ? `${e.target.value}T00:00`
                        : e.target.value;

                      setStart(value);

                      // 🔥 AUTO-SET END (+1 hour)
                      if (!allDay && curr_date) {
                        setEnd(getFormattedDate(addHour(curr_date, 1)));
                      }
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    End Date & Time
                  </label>
                  <input
                    type={allDay ? "date" : "datetime-local"}
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={allDay ? end.slice(0, 10) : end}
                    min={start}
                    disabled={allDay} // end auto-handled for all-day
                    onChange={(e) =>
                      setEnd(
                        allDay ? `${e.target.value}T23:59` : e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                {isEdit && (
                  <button
                    className="btn btn-error"
                    onClick={handleDelete}
                    disabled={loading.delete}
                    type="button"
                  >
                    Delete
                  </button>
                )}

                <div className="flex gap-2 ml-auto">
                  <button className="btn " onClick={closeModal} type="button">
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading.add || loading.update}
                  >
                    {loading.add || loading.update ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
