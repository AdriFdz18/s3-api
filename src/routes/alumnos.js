const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Alumnos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM api_rest.alumnos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET Alumno
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM api_rest.alumnos WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE a Alumno
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM api_rest.alumnos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Alumno Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT Alumnos
router.post('/', (req, res) => {
    const {nombre, apellido, matricula, promedio} = req.body;
    console.log(nombre, apellido, matricula, promedio);
    const query = `
      SET @nombre = ?;
      SET @apellido = ?;
      SET @matricula = ?;
      SET @promedio = ?;
      CALL alumnosAddOrEdit(@id, @nombre, @apellido, @matricula, @promedio);
    `;
    mysqlConnection.query(query, [nombre, apellido, matricula, promedio], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Alumno Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/:id', (req, res) => {
    const {nombre, apellido, matricula, promedio } = req.body;
    const { id } = req.params;
    const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @apellido = ?;
    SET @matricula = ?;
    SET @promedio = ?;
    CALL alumnosUpdate(@id, @nombre, @apellido, @matricula, @promedio);
    `;
    mysqlConnection.query(query, [id, nombre, apellido, matricula, promedio], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Alumno Updated'});
      } else {
        console.log(err);
      }
    });
  });

  


module.exports = router;
