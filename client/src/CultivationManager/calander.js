import React, { useState, useEffect } from 'react';
import MyCalendar from "./calander"; // Check if the file name and path are correct
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; // Import moment library

const localizer = momentLocalizer(moment);

const CalendarContainer = () => {
  const [taskDates, setTaskDates] = useState([]);
  const [scheduleDates, setScheduleDates] = useState([]);

  useEffect(() => {
    // Fetch task dates from backend
    fetch('/task-dates')
      .then(response => response.json())
      .then(data => setTaskDates(data))
      .catch(error => console.error('Error fetching task dates:', error));

    // Fetch schedule dates from backend
    fetch('/schedule-dates')
      .then(response => response.json())
      .then(data => setScheduleDates(data))
      .catch(error => console.error('Error fetching schedule dates:', error));
  }, []);

  return (
    <div>
      <h2>Task Dates</h2>
      <MyCalendar events={taskDates} />

      <h2>Schedule Dates</h2>
      <MyCalendar events={scheduleDates} />
    </div>
  );
};

export default CalendarContainer;
