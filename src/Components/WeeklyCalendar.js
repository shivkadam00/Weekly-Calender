import React, { useState, useEffect } from "react";
import moment from "moment";
import "./style.css";

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [weekStart, setWeekStart] = useState(
    currentDate.clone().startOf("week")
  );
  const [weekDays, setWeekDays] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = weekStart.clone().add(i, "days");
      days.push(day);
    }
    setWeekDays(days);
  }, [currentDate, weekStart]);

  const goToPreviousWeek = () => {
    setWeekStart(weekStart.clone().subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setWeekStart(weekStart.clone().add(1, "week"));
  };

  const handleCheckboxChange = (date, time) => {
    const id = Date.now(); // Generate a unique ID (timestamp)
    const newData = {
      Id: id,
      Name: "Test", // You can replace this with the actual name
      Date: date.format("YYYY-MM-DD"),
      Time: time.format("HH:mm"),
    };

    setSelectedData((prevData) => [...prevData, newData]);
  };

  const renderHalfHourBlocks = (date) => {
    const blocks = [];
    for (let i = 8; i <= 23; i++) {
      const time = moment().hours(i).minutes(0).seconds(0);
      const isChecked = selectedData.some(
        (data) =>
          data.Date === date.format("YYYY-MM-DD") &&
          data.Time === time.format("HH:mm")
      );

      blocks.push(
        <div className="innerTime" key={time.format("HH:mm")}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(date, time)}
          />
          {time.format("h:mm A")}
        </div>
      );

      const halfHour = time.clone().add(30, "minutes");
      const isHalfHourChecked = selectedData.some(
        (data) =>
          data.Date === date.format("YYYY-MM-DD") &&
          data.Time === halfHour.format("HH:mm")
      );

      blocks.push(
        <div className="innerTime" key={halfHour.format("HH:mm")}>
          <input
            type="checkbox"
            checked={isHalfHourChecked}
            onChange={() => handleCheckboxChange(date, halfHour)}
          />
          {halfHour.format("h:mm A")}
        </div>
      );
    }
    return blocks;
  };

  return (
    <div>
      <div className="main_header">
        <div>
          <button onClick={goToPreviousWeek}>Previous Week</button>
          {weekStart.format("MMMM D, YYYY")} -{" "}
        </div>

        <span>
          {currentDate.format("dddd, MMMM D, YYYY")} -{" "}
          {currentDate.format("h:mm A")}
        </span>

        <div>
          {weekStart.clone().add(6, "days").format("MMMM D, YYYY")}
          <button onClick={goToNextWeek}>Next Week</button>
        </div>
      </div>
  
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto auto auto auto auto auto auto",
        }}
      >
        {weekDays.map((day) => (
          <div className="TableWrapper" key={day.format("YYYY-MM-DD")}>
            <div className="tableDate">
              <h4>{day.format("ddd")}</h4>
              <h5>
                {day.format("D")}/{day.format("M")}
              </h5>
            </div>
            <div className="time_slots">{renderHalfHourBlocks(day)}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Selected Data:</h3>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
