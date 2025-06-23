const express = require('express')
const route = express.Router()
const Patient = require('../models/Patient')
const router = require('./doctors')

// Get all patients
router.route('/').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Add a new patient
router.route('/add').post((req, res) => {
    const { name, age, gender } = req.body;

    const newPatient = new Patient({ name, age, gender })

    newPatient.save()
        .then(savedPatiend => res.json(savedPatiend))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Update patient
router.route('/update/:id').post((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json('Patient not found')
            }
            patient.name = req.body.name
            patient.age = req.body.age
            patient.gender = req.body.gender

            patient.save()
                .then(() => res.json('Patient updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// Delete patient by ID
router.route('/delete/:id').delete((req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json('Patient not found')
            }
            res.json('Patient deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router