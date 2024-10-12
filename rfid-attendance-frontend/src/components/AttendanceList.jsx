import React from 'react';

const AttendanceList = ({ records }) => {
  return (
    <div className="attendance-list"> {/* Apply the CSS class */}
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>RFID</th>
            <th>User</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.rfid}</td>
              <td>{record.user}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
