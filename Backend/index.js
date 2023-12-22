const express = require('express')
const cors = require('cors')
const mongoose  = require("mongoose")
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser.json());

app.get('/', async (req, res,next) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    next();
  });



// MongoDB Atlas connection string
const uri = 'mongodb+srv://Omkore:Omkore@cluster0.5ytva.gcp.mongodb.net/?retryWrites=true&w=majority';

// Options to pass to MongoDB driver during connect
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB Atlas
mongoose.connect(uri, options);

// Get the default connection
const db = mongoose.connection;

// Event listeners for the MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas successfully');
  // You can now perform database operations here
});

const studentSchema = mongoose.Schema({
    Name:String,
    Course:String,
    Phone:Number,
    Batch:String,
},{
    timeStamps:true
})

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['present', 'absent'], default: 'absent' },
  });

const Student = mongoose.model('Student', studentSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);


// Create a new student
app.post('/add', async (req, res) => {
    try {
    const {Name,Course,Phone,Batch} = req.body;

    if(!Name || !Course || !Phone || !Batch){
        res.status(422).json({Error:"all fields are required !"});
    }else{
        const newStudent = new Student({Name,Course,Phone,Batch});
        await newStudent.save();
        res.status(201).json({Message:"user registered ! successfully... ",Data:newStudent});
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a specific student by ID
  app.get('/student/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.json(student);
      res.status(201).json({message:"User data Added successfully..."});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  // Update a student by ID
app.put('/student/:id', async (req, res) => {
    try {
        const {Name,Course,Phone,Batch} = req.body;

        if(!Name || !Course || !Phone || !Batch){
            res.status(422).json({Error:"all fields are required !"});
        }else{
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedStudent);
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a student by ID
  app.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      res.json(deletedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Mark attendance for a student
app.post('/attendances', async (req, res) => {
  try {
      const { studentId, status } = req.body;

      const student = await Student.findById(studentId);
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }

      const attendance = new Attendance({ student: student._id, status });
      await attendance.save();

      res.status(201).json(attendance);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get attendance records for a student
app.get('/attendances/:studentId', async (req, res) => {
  try {
      const studentId = req.params.studentId;

      const student = await Student.findById(studentId);
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }

      const attendances = await Attendance.find({ student: student._id });
      res.json(attendances);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Inside your server's index.js
app.post('/mark-present', async (req, res) => {
  try {
    const { studentId } = req.body;
    // Your logic to mark the student as present with the provided studentId
    res.status(200).json({ success: true, message: 'Attendance marked as present.' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port no ${PORT}`);
})
