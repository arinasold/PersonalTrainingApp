import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {addMinutes} from "date-fns";



const localizer = momentLocalizer(moment);

function CalendarForTrainings() {
  const [trainings, setTrainings] = useState([]);

  const getTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const formattedEvents = trainings.map((training) => ({
    title: training.activity,
    start: new Date(training.date),
    end: addMinutes(new Date(training.date), training.duration),
  }));
  
  const formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(
        end,
        "HH:mm",
        culture
      )}`,
    dayRangeHeaderFormat: ({ start }, culture, localizer) =>
      localizer.format(start, "dddd, D. MMMM", culture),
    dayHeaderFormat: ({ start }, culture, localizer) =>
      localizer.format(start, "dddd, D. MMMM", culture),
    monthHeaderFormat: ({ start }, culture, localizer) =>
      localizer.format(start, "MMMM YYYY", culture ),
  }


  return (
    <div>
      <h1>All reserved trainings in calendar</h1>
      <Calendar
      style={{ height: 500, margin: "10px" }}
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        views={{
          month: true,
          week: true,
          day: true,
          agenda:true
        }}
        
        formats={formats}
       
      />
    </div>
  );
}

export default CalendarForTrainings;
