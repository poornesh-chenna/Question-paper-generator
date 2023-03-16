function Date() {
  return (
    <div>
      <input
        style={{
          margin: "0.4rem 0",
          borderRadius: "4px",
          border: "1px solid #C4C4C4",
          padding: "8px",
          height: "50px",
        }}
        type="date"
        id="start"
        name="trip-start"
        value="2018-07-22"
        min="2018-01-01"
        max="2030-12-31"
      />
    </div>
  );
}
export default Date;
