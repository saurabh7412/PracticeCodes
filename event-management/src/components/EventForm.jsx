import React, { useState } from 'react';

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const formattedDate = new Date(date).toDateString();
      const newEvent = {
        date: formattedDate,
        title: title
      };
      addEvent(newEvent);
      setTitle('');
    }
  };


  return (
    <div className="form-container">
      <h2>Add Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Event</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
