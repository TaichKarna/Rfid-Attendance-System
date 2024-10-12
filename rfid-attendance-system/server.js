const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Attendance = require('./models/Attendance');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect('mongodb+srv://taichi:28012003@cluster0.ignfpnx.mongodb.net/rfid?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Basic health check route
app.get('/', (req, res) => {
  res.send('RFID Attendance System Backend Running!');
});

// Fetch all attendance records
app.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

// Fetch attendance records for a specific RFID
app.get('/attendance/:rfid', async (req, res) => {
  const { rfid } = req.params;

  try {
    const records = await Attendance.find({ rfid });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance for RFID' });
  }
});

app.post('/attendance/check', async (req, res) => {
  const { rfid } = req.body;  
console.log(rfid)
  try {
    // Check if the RFID already exists
    const existingRecord = await Attendance.findOne({ rfid });
    console.log(existingRecord)
      const attendance = new Attendance({
        rfid,
        user: existingRecord.user 
      });

      const newRecord = await attendance.save();
      return res.status(201).json({ message: 'New attendance record created', attendance: newRecord });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/attendance', async (req, res) => {
  const { rfid, user } = req.body;

  try {
    // Save the attendance record
    const newAttendance = new Attendance({ rfid, user });
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance recorded', attendance: newAttendance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
