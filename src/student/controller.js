const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
   pool.query(queries.getStudents, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
   })
}


const getStudentById = (req, res) => {
   const id = parseInt(req.params.id);
   pool.query(queries.existsById, [id], (error, result)=> {
      if(result.rows[0].count > 0) {
         console.log("Executing search");
         getStudentByIdMethod(res, id);
         return;
      }
      console.log("Sending 400");
      res.status(400).send();
   });
  
}


const getStudentByIdMethod = (res, ...arr) => {
   pool.query(queries.getStudentById, arr, (error, results) => {
   // if (error) throw error;
   console.log(results);
   const noFoundId = !results.rows.length;
      if (noFoundId) {
         res.status(400);
         res.send("Not found");
      }
   res.status(200).json(results.rows).send();
})
}

const addStudent = (req, res) => {
   const { name, email, age, dob } = req.body;

   pool.query(queries.checkEmailExists, [email], (error, results) => {
      //check if email exists
      if (results.rows.length) {
         res.send('Email already exists.');
      }

      //add student db
      pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
         if (error) {
            res.status(400);
            return;
         };
         res.status(201).send('Student Created Successfully!');
      })
   });
}

const removeStudent = (req, res) => {
   const id = parseInt(req.params.id);

   pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length;
      if (noStudentFound) {
         res.send('Student does not exists in the database');
      }


      pool.query(queries.removeStudent, [id], (error, results) => {
         if (error) throw error;
         res.status(200).send('Student removed successfully');
      })
   })
}


const updateStudent = (req, res) => {
   const id = parseInt(req.params.id);
   const { name } = req.body;

   pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length;
      if (noStudentFound) {
         res.send('Student does not exists in the database');
      }

      pool.query(queries.updateStudent, [name, id], (error, results) => {
         if (error) throw error;
         res.status(200).send('Student updated successfully');
      })
   });
   
}

module.exports = {
   getStudents,
   getStudentById,
   addStudent,
   removeStudent,
   updateStudent,
};

