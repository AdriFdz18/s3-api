const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Alumnos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM api_rest.profesores', (err, rows, fields) => {
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
  mysqlConnection.query('SELECT * FROM api_rest.profesores WHERE id = ?', [id], (err, rows, fields) => {
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
  mysqlConnection.query('DELETE FROM api_rest.profesores WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Profe Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT Alumnos
router.post('/', (req, res) => {
    const {numeroEmpleado,nombre, apellido, horasClase} = req.body;
    console.log(numeroEmpleado,nombre, apellido, horasClase);
    const query = `
      CALL profesoresAddOrEdit(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [numeroEmpleado,nombre, apellido, horasClase], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Profe Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/:id', (req, res) => {
    const {numeroEmpleado,nombre, apellido, horasClase } = req.body;
    const { id } = req.params;
    const query = `
    CALL profeUpdate(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [numeroEmpleado,nombre, apellido, horasClase], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Profe Updated'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
