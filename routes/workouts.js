const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const Workout = require('../models/Workout');
const { check, validationResult } = require('express-validator');

// @route   GET api/workouts
// @desc    Get all users workouts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
       const workouts = await Workout.find({ user: req.user.id });
       res.json(workouts); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/workouts
// @desc    Add new workout
// @access  Private
router.post('/', [ auth, [ check('name', 'Name is required').not().isEmpty(), check('description', 'Description is required').not().isEmpty()] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user, name, description, perceivedEffort } = req.body;

    try {
        let newWorkout = new Workout({
            user,
            name,
            description, 
            perceivedEffort
        });

        const theWorkout = await newWorkout.save();
        res.json(theWorkout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, description, perceivedEffort } = req.body;
    const workoutProperties = {};

    if (name) workoutProperties.name = name;
    if (description) workoutProperties.description = description;
    if (perceivedEffort) workoutProperties.percievedEffort = percievedEffort;

    try {
        let updateWorkout = Workout.findById(req.params.id);

        if (!updateWorkout) return res.status(404).json({ msg: 'Workout not found' });

        updateWorkout = await Workout.findByIdAndUpdate(req.params.id, 
            { $set: workoutProperties },
            { new: true }
        );

        res.json(updateWorkout);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);

        if (!workout) return res.status(404).json({ msg: 'Workout not found' });

        await Workout.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Workout has been removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;