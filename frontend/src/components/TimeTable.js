import React from "react";

export default function TimeTable({
  timestamps,
  handleTimestampClick,
  formatTime,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {timestamps.map((ele) => {
            return (
              <tr
                style={{ cursor: "pointer", borderBottom: "1px gray solid" }}
                onClick={(event) => handleTimestampClick(ele.time, event)}
              >
                <td>{formatTime(ele.time)}</td>
                <td>{ele.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
