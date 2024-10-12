import  { useState } from 'react';
import axios from 'axios';

const SubmitAttendance = ({ onNewAttendance }) => {
  const [rfid, setRfid] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send RFID and user data to the backend
    axios.post('http://localhost:3000/attendance', { rfid, user })
      .then(response => {
        onNewAttendance(response.data.attendance);
        setRfid('');
        setUser('');
      })
      .catch(error => {
        console.error('Error submitting attendance:', error);
      });
  };

  return (
    <div>
      <h2>Submit Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RFID:</label>
          <input
            type="text"
            value={rfid}
            onChange={(e) => setRfid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitAttendance;
