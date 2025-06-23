const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

//get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json("Error: " + err));
})

//add a new doctor
router.route('/add').post((req, res) => {
    const { name, speciality } = req.body;

    const newDoctor = new Doctor({ name, speciality });
    newDoctor.save().then(savedDoctor => res.json(savedDoctor))
        .catch(err => res.status(400).json('Error: ' + err));
})

//update doctor
router.route('/update/:id').post((req, res) => {
    Doctor.findById(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json('Doctor not found');
            }
            doctor.name = req.body.name;
            doctor.speciality = req.body.speciality;

            doctor.save()
                .then(() => res.json('Doctor updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete doctor by ID
router.route('/delete/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json('Doctor not found');
            }
            res.json('Doctor deleted!');
        }
        )
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;