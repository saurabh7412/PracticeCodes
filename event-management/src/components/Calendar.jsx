import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
} from "date-fns";
import Modal from "./Modal"; // Import your Modal component

const Calendar = ({ events, setEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const monthFormat = "MMMM yyyy";

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderDay = (day) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    );
    const isCurrentDay = isSameDay(day, new Date()); // Check if the day is the current date
    return (
      <div
        key={day.getTime()}
        className={`day ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${
          isCurrentDay ? "current-day" : ""
        }`}
        onClick={() => handleDateClick(day)}
      >
        <div className="date">{format(day, dateFormat)}</div>
        <div className={`event-count ${dayEvents.length > 0 && 'event-exist'}`}>
          {dayEvents.length > 0 &&
            `${dayEvents.length} ${dayEvents.length == 1 ? "Event" : "Events"}`}
        </div>
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = (newEvent) => {
    setSelectedDate(null);
    newEvent.id =
      events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEditEvent = (updatedEvent) => {
    const index = events.findIndex((event) => event.id === updatedEvent.id);
    if (index !== -1) {
      const updatedEvents = [...events];
      updatedEvents[index] = updatedEvent;
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  // const displayWeek =({el,ind})=>{
  //   return()
  // }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>Previous</button>
        {format(currentDate, monthFormat)}
        <button onClick={handleNextMonth}>Next</button>
        <button onClick={handleCurrentMonth}>Go to Current Month</button>
      </div>
      <div className="days">
        <div className="div-1">
          {["Su","M", "T", "W", "Th", "F", "Sa"].map((el, ind) => (
            <div key={ind}>{el}</div>
          ))}
        </div>
        <div className="div-2">{days.map((day) => renderDay(day))}</div>
      </div>
      {selectedDate && (
        <Modal
          date={selectedDate}
          events={events.filter((event) =>
            isSameDay(new Date(event.date), selectedDate)
          )}
          onClose={() => setSelectedDate(null)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onEditEvent={handleEditEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
