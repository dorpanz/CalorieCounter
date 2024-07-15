import React, { useState, useContext, useEffect } from 'react';
import { CalorieContext } from './CalorieContext';
import './Activities.css';
import stepsImage from "./pics/steps.webp";
import burn from "./pics/burn.png";
import clock from "./pics/clock.png";

function Activities() {
    const { steps, setSteps, setBurnedCalories } = useContext(CalorieContext);

    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(steps);
    const [activity, setActivity] = useState('');
    const [time, setTime] = useState('');
    const [exercises, setExercises] = useState(() => {
        const savedExercises = localStorage.getItem('exercises');
        return savedExercises ? JSON.parse(savedExercises) : [];
    });
    const [showModal, setShowModal] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [totalTime, setTotalTime] = useState(() => {
        const savedTotalTime = localStorage.getItem('totalTime');
        return savedTotalTime ? JSON.parse(savedTotalTime) : 0;
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('totalTime', JSON.stringify(totalTime));
    }, [totalTime]);

    useEffect(() => {
        const stepsCalories = steps * 0.05;
        setBurnedCalories(calculateTotalCaloriesBurned(exercises) + stepsCalories);
    }, [steps, setBurnedCalories, exercises]);

    useEffect(() => {
        localStorage.setItem('exercises', JSON.stringify(exercises));
    }, [exercises]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setSteps(inputValue);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleActivityChange = (e) => {
        setActivity(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddExercise = async () => {
        if (activity.trim() === '' || time.trim() === '' || isNaN(time) || Number(time) <= 0) {
            alert("Please enter a valid exercise and time (in minutes) greater than 0.");
            return;
        }

        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`, {
                headers: { 'X-Api-Key': 'AQ/GnM1dbUgq1q/wVgUjqA==icORAnJrPFpqpLrY' }
            });
            const data = await response.json();

            if (data.length > 0) {
                const caloriesPerHour = data[0].calories_per_hour;
                const timeInHours = Number(time) / 60;
                const totalCalories = caloriesPerHour * timeInHours;

                const newExercise = {
                    activity,
                    time: Number(time),
                    calories: totalCalories
                };

                setExercises([...exercises, newExercise]);
                setBurnedCalories(calculateTotalCaloriesBurned([...exercises, newExercise]) + steps * 0.05);

                setActivity('');
                setTime('');
                handleCloseModal();
                setErrorMessage('');
            } else {
                setErrorMessage('Exercise/activity not found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data. Please try again later.');
        }
    };

    const handleDeleteExercise = (index) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises);
        setBurnedCalories(calculateTotalCaloriesBurned(updatedExercises) + steps * 0.05);
    };

    const calculateTotalCaloriesBurned = (exercises) => {
        return exercises.reduce((total, exercise) => total + exercise.calories, 0);
    };

    return (
        <div className="activity">
            <div className='activity-item'>
                <div className='steps'>
                    <div className='title-excer'>
                        <span>Steps</span>
                        {isEditing ? (
                            <button className='add-execr save' onClick={handleSaveClick}>Save</button>
                        ) : (
                            <button className='add-execr edit' onClick={handleEditClick}>Edit</button>
                        )}
                    </div>

                    <div className='steps-amount'>
                        <img src={stepsImage} alt="steps-sneaker" width="60px" />
                        {isEditing ? (
                            <div className='steps-input-cont'>
                                <input type="number" value={inputValue} onChange={handleInputChange} className="steps-input" />
                            </div>
                        ) : (
                            <p>{steps}</p>
                        )}
                    </div>
                    <span className='goal-steps'>Goal 10,000 steps</span>
                    <div className="progress-steps">
                        <span className="progress-per-steps" style={{ width: `${(steps / 10000) * 100}%` }}></span>
                    </div>
                </div>

                <div className='steps excersie-add'>
                    <div className='title-excer'>
                        <span>Exercise</span>
                        <button className='add-execr' onClick={handleOpenModal}>+</button>
                    </div>
                    <div className='burned-amount '>
                        <img src={burn} width="50px" alt="burned-cal" />
                        <p>{Math.round(calculateTotalCaloriesBurned(exercises) + steps * 0.05)} Cal</p>
                    </div>
                    <div className='burned-amount '>
                        <img src={clock} width="50px" alt="clock" />
                        <p>{Math.floor(totalTime / 60)}:{totalTime % 60 < 10 ? `0${totalTime % 60}` : totalTime % 60} hr</p>
                    </div>
                </div>

                <div className='steps activity-list'>
                    <div className='title-excer ex-list'>
                        <span>Exercise List</span>
                        <span className='scroll-down'>Scroll Down to see more</span>
                    </div>
                    <div className="exercise-list-container">
                        {exercises.map((exercise, index) => (
                            <div key={index} className="exercise-item">
                                <div className="exercise-info">
                                    <p className="exercise-activity">{exercise.activity}</p>
                                    <p className="exercise-details">{exercise.time} minutes, {Math.round(exercise.calories)} Cal</p>
                                </div>
                                <button className="delete-button" onClick={() => handleDeleteExercise(index)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button-activ" onClick={handleCloseModal}>&times;</span>
                        <h2>Add Exercise</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <input
                            type="text"
                            placeholder="Exercise (e.g., Running)"
                            value={activity}
                            onChange={handleActivityChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Time (in minutes)"
                            value={time}
                            onChange={handleTimeChange}
                            required
                        />
                        <button onClick={handleAddExercise}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Activities;
