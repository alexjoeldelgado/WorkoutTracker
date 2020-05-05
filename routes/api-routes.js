const Workout = require("../models/workout");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        Workout
            .find({})
            .then(dbWorkout => res.json(dbWorkout))
            .catch(err => res.status(400).json(err))
    });

    app.get("/api/workouts/range", (req, res) => {
        Workout
            .find({})
            .sort({ day: -1 })
            .limit(7)
            .then(dbWorkouts => res.json(dbWorkouts))
            .catch(err => res.status(400).json(err));
    });
    
    app.post("/api/workouts", ({ body }, res) => {
        Workout
            .create(body)
            .then(dbWorkout => res.json(dbWorkout))
            .catch(err => res.status(400).json(err));
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout
            .findByIdAndUpdate(
                { _id: params.id },            
                { $push: { exercises: body } }
            )
            .then(dbWorkout => res.json(dbWorkout))
            .catch(err => res.status(400).json(err))
    });
}