const getStudents = 'SELECT * FROM students';
const getStudentById = 'SELECT * FROM students WHERE id = $1';
const checkEmailExists = 'SELECT s FROM students s WHERE s.email = $1';
const addStudent = 'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)';
const removeStudent = 'DELETE FROM students WHERE id = $1';
const updateStudent = 'UPDATE students SET name = $1 WHERE id = $2';
const existsById = "SELECT count(*) FROM students s WHERE s.id = $1";

module.exports = {
   getStudents,
   getStudentById,
   checkEmailExists,
   addStudent,
   removeStudent,
   updateStudent,
   existsById
}