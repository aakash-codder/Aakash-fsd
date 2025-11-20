// In-memory students array
let students = [
  { id: 1, name: "Amit", marks: 85 }
];

// Generate next student ID
function getNextId() {
  return students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
}

module.exports = {
  students,
  getNextId
};
