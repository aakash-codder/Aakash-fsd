const express = require('express');
const router = express.Router();

// In-memory students array (module-local)
let students = [
  { id: 1, name: "Amit", marks: 85 }
];

// Helper to get next id
const nextId = () => (students.length ? Math.max(...students.map(s => s.id)) + 1 : 1);

// GET /students  -> return all students
router.get('/', (req, res) => {
  res.json(students);
});

// POST /students -> add a new student
// Expected body: { "name": "Rahul", "marks": 92 }
router.post('/', (req, res) => {
  const { name, marks } = req.body;

  // Basic validation
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Invalid or missing "name".' });
  }
  if (typeof marks !== 'number' || Number.isNaN(marks) || marks < 0 || marks > 100) {
    return res.status(400).json({ message: 'Invalid or missing "marks". Must be a number 0-100.' });
  }

  const newStudent = {
    id: nextId(),
    name: name.trim(),
    marks
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// GET /students/:id -> return student by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id parameter.' });

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: 'Student not found.' });

  res.json(student);
});

module.exports = router;
