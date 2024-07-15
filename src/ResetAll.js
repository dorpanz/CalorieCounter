import React, { useContext } from 'react';
import { CalorieContext } from './CalorieContext';
import { NutritionContext } from './NutritionContext';

const ResetAll = () => {
    const { setSteps, setBurnedCalories } = useContext(CalorieContext);
    const { setMealTimes } = useContext(NutritionContext);

    const handleReset = () => {
        const confirmed = window.confirm("Are you sure you want to reset all data?");
        if (confirmed) {
            // Reset steps and burned calories
            setSteps(0);
            setBurnedCalories(0);

            // Reset meal times (food lists)
            setMealTimes({
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: [],
            });

            // Reset exercises and total time
            localStorage.removeItem('exercises');
            localStorage.removeItem('totalTime');

            // Reset notes
            localStorage.removeItem('userNotes');

            // Clear water data
            localStorage.removeItem('animationStates');

            // Refresh the page
            window.location.reload();
        }
    };

    return (
        <button onClick={handleReset} className="reset-all-button">Reset All</button>
    );
};

export default ResetAll;
