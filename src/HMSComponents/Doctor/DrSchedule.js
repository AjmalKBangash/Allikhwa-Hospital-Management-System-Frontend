import "./DrSchedule.css";
// import EventPopup from "./EventPopup";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
const localizer = momentLocalizer(moment);

function eventStyleGetter(event, start, end, isSelected) {
  const backgroundColor = isSelected ? "#fe4200" : "#013737"; // Change background color based on isSelected
  const style = {
    backgroundColor,
    borderRadius: "5px",
    color: "white",
    border: "1px solid #333",
    display: "block",
    padding: "5px",
    height: "fit-content",
    width: "fir-content",
    border: "1px solid #fe4200",
  };
  return {
    style,
  };
}
// Function to generate repetitive events for a specific day of the week
// function generateRepetitiveEvents(dayOfWeek) {
//   const events = [];
//   const currentDate = moment().startOf("year"); // Start from the beginning of the year
//   const endDate = moment().endOf("year");

//   while (currentDate.isSameOrBefore(endDate)) {
//     if (currentDate.day() === dayOfWeek) {
//       const event = {
//         title: "Employee Shift",
//         start: currentDate.toDate(),
//         end: currentDate.clone().add(1, "hour").toDate(),
//       };
//       events.push(event);
//     }
//     currentDate.add(1, "day"); // Move to the next day
//   }

//   return events;
// }
// For event Popup
function EventPopup({ event }) {
  return (
    <div
      className="event-popup"
      style={{ height: "fit-content", width: "fit-content" }}
    >
      <h3 style={{ fontSize: "14px" }}>{event.title}</h3>
      <p style={{ fontSize: "12px" }}>{event.Appointment_No}</p>
      <p style={{ fontSize: "12px" }}>{event.name}</p>
      <p style={{ fontSize: "12px" }}>{event.city}</p>
      <p style={{ fontSize: "12px" }}>Start: {event.start.toLocaleString()}</p>
      <p style={{ fontSize: "12px" }}>End: {event.end.toLocaleString()}</p>

      {/* Add more event details as needed */}
    </div>
  );
}
function DrSchedule() {
  const [events, setEvents] = useState([]);
  const [show_popup, setshow_popup] = useState(false);

  const events02 = [
    {
      title: "Event 1",
      start: new Date(2023, 8, 25, 10, 0), // Year, Month (0-based), Day, Hour, Minute
      end: new Date(2023, 8, 25, 12, 0),
      data: {
        PID: "s43535-ffsd454-5546dfdf",
        Name: "Jamal Ud Din",
        City: "Moscow",
      },
    },
    {
      title: "Dr. Smith - Checkup",
      start: new Date(2023, 8, 25, 10, 0), // Year, Month (0-based), Day, Hour, Minute
      end: new Date(2023, 8, 25, 11, 0),
    },
  ];

  useEffect(() => {
    let events_from_api = [];
    axios
      .get("http://localhost:3100/appointments?doctor=DrMaazKhanBangash")
      .then((res) => {
        let x_no = 0;
        res.data.map((item, id) => {
          x_no += 1;
          // Parse the original date string
          const originalDate = new Date(item.date);
          const year = originalDate.getFullYear();
          const month = originalDate.getMonth(); // Note: Months are 0-based (0 for January, 1 for February, ...)
          const day = originalDate.getDate();
          const hours = originalDate.getHours();
          const minutes = originalDate.getMinutes();
          // Create the transformed string
          // const transformedString = `${year}, ${month}, ${day}, ${hours}, ${minutes}`;
          // console.log(transformedDate);
          events_from_api.push({
            title: "Appointment",
            Appointment_No: "Appointment No: " + x_no,
            name: item.name,
            city: item.city,
            start: new Date(year, month, day, hours, minutes),
            end: new Date(year, month, day, hours, minutes),
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setEvents(events_from_api);
  }, []);
  // Define repetitive event data structure
  // const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // 0 for Sunday, 1 for Monday, and so on
  // const allEvents = [];

  // // Generate repetitive events for each day of the week
  // daysOfWeek.forEach((day) => {
  //   const eventsForDay = generateRepetitiveEvents(day);
  //   allEvents.push(...eventsForDay);
  // });
  // useEffect(() => {
  //   allEvents.push(...events);
  // }, []);
  return (
    <>
      {show_popup && (
        <div className="drschedule_popup_top">
          <div className="drschedule_popup_top_container">
            <div className="drschedule_popup_top_items">
              <h2
                className="fillfreebeds_h2"
                style={{ padding: "5px 5px", margin: "8px" }}
              >
                {show_popup.title}
              </h2>
              <p style={{ fontSize: "12px" }}>{show_popup.Appointment_No}</p>
              <p style={{ fontSize: "12px" }}>Name:{show_popup.name}</p>
              <p style={{ fontSize: "12px" }}>City:{show_popup.city}</p>
              <p style={{ fontSize: "12px" }}>
                Start: {show_popup.start.toLocaleString()}
              </p>
              <p style={{ fontSize: "12px" }}>
                End: {show_popup.end.toLocaleString()}
              </p>
              <span
                onClick={() => {
                  setshow_popup(false);
                }}
              >
                &#10060;
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="schedule_top">
        <h2 className="fillfreebeds_h2">My Schedule</h2>
        <div className="calender_top">
          <Calendar
            localizer={localizer}
            title
            events={events}
            // views={["agenda"]} // Set the view to 'agenda'
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            defaultView="week"
            components={{
              eventWrapper: ({ event, children }) => (
                <div style={{ position: "relative" }}>
                  {children}
                  <div
                    className="event-click-area"
                    onClick={() => {
                      setshow_popup(event);
                      console.log(event);
                    }}
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                      padding: "5px",
                      backgroundColor: "#fe4200",
                      cursor: "pointer",
                      width: "fit-content",
                      borderRadius: "4px",
                    }}
                  >
                    DETAILS
                  </div>
                </div>
              ),
              event: EventPopup, // Use the EventPopup component as the event view
            }}
          />
        </div>
      </div>
    </>
  );
}
export default DrSchedule;
