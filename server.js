const express = require("express");
const app = express();
app.use(express.json());

// In-memory array
let students = [
  { id: 1, name: "Amit", marks: 85 }
];

// -------------------------
// 1. GET /students
// -------------------------
app.get("/students", (req, res) => {
  res.json(students);
});

// -------------------------
// 2. POST /students
// -------------------------
app.post("/students", (req, res) => {
  const { name, marks } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    marks
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// -------------------------
// 3. GET /students/:id
// -------------------------
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// Server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
