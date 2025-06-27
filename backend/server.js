const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const bodyParser = require('body-parser')
const doctorsRouter = require('./routes/doctors')
const patientsRouter = require('./routes/patients')
const appointmentsRouter = require('./routes/appointments')


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(
    'mongodb://localhost:27017/hospital',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/patients', patientsRouter)
app.use('/doctors', doctorsRouter)
app.use('/appointments', appointmentsRouter)

app.get('/appointments', async (req, res) => {
    try {
        const data = await Appointment.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/appointments', async (req, res) => {
    const newAppointment = new Appointment(req.body);
    try {
        const saved = await newAppointment.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})