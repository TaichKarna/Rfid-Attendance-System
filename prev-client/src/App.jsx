import { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitAttendance from './components/SubmitAttendance';
import AttendanceList from './components/AttendanceList';
import './App.css'; // Import the CSS file

function App() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch attendance records from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/attendance')
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  }, []);

  // Function to handle new attendance submission
  const handleNewAttendance = (newRecord) => {
    setAttendanceRecords(prevRecords => [...prevRecords, newRecord]);
  };

  return (
    <div className="App">
      <h1>RFID Attendance System</h1>
      <SubmitAttendance onNewAttendance={handleNewAttendance} />
      <AttendanceList records={attendanceRecords} />
    </div>
  );
}

export default App;
