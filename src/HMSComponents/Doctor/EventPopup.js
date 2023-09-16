function EventPopup({ event }) {
  return (
    <div className="event-popup">
      <h3 style={{ fontSize: "14px" }}>{event.title}</h3>
      <p style={{ fontSize: "12px" }}>Start: {event.start.toLocaleString()}</p>
      <p style={{ fontSize: "12px" }}>End: {event.end.toLocaleString()}</p>
      {/* Add more event details as needed */}
    </div>
  );
}
// export default EventPopup;
