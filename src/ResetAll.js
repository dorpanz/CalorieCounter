import React, { useContext } from 'react';
import { CalorieContext } from './CalorieContext';
import { NutritionContext } from './NutritionContext';

const ResetAll = () => {
    const { setSteps, setBurnedCalories } = useContext(CalorieContext);
    const { setMealTimes } = useContext(NutritionContext);

    const handleReset = () => {
        const confirmed = window.confirm("Are you sure you want to reset all data?");
        if (confirmed) {
            setSteps(0);
            setBurnedCalories(0);
            setMealTimes({
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: [],
            });

            localStorage.removeItem('exercises');
            localStorage.removeItem('activity');
            localStorage.removeItem('totalTime');
            localStorage.removeItem('userNotes');
            localStorage.removeItem('animationStates');
            window.location.reload()
        }
    };

    return (
        <button onClick={handleReset} className="reset-all-button">Reset All</button>
    );
};

export default ResetAll;
