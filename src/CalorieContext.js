import React, { createContext, useState, useEffect } from 'react';

export const CalorieContext = createContext();

const CalorieProvider = ({ children }) => {
    const [calorie, setCalorie] = useState(() => {
        const savedCalorie = localStorage.getItem('calorie');
        return savedCalorie !== null ? JSON.parse(savedCalorie) : 0;
    });

    const [macronutrients, setMacronutrients] = useState(() => {
        const savedMacros = localStorage.getItem('macronutrients');
        return savedMacros !== null ? JSON.parse(savedMacros) : { protein: 0, fat: 0, carbs: 0 };
    });
    const [burnedCalories, setBurnedCalories] = useState(0);

    const [mealCalories, setMealCalories] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
    });
    const [steps, setSteps] = useState(() => {
        const savedSteps = localStorage.getItem('steps');
        return savedSteps ? JSON.parse(savedSteps) : 0;
    });
    const [stepsCalories, setStepsCalories] = useState(() => {
        const savedStepsCalories = localStorage.getItem('stepsCalories');
        return savedStepsCalories ? JSON.parse(savedStepsCalories) : 0;
    });
    const [weight, setWeight] = useState(() => {
        const savedWeight = localStorage.getItem('currentWeight');
        return savedWeight ? parseFloat(savedWeight) : '';
    });

    const updateWeight = (newWeight) => {
        setWeight(newWeight);
        localStorage.setItem('currentWeight', newWeight.toString());
    };

    useEffect(() => {
        localStorage.setItem('currentWeight', weight.toString());
    }, [weight]);
    useEffect(() => {
        localStorage.setItem('calorie', JSON.stringify(calorie));
        calculateMealCalories(calorie);
    }, [calorie]);
    useEffect(() => {
        localStorage.setItem('burnedCalories', JSON.stringify(burnedCalories));
    }, [burnedCalories]);
    useEffect(() => {
        localStorage.setItem('macronutrients', JSON.stringify(macronutrients));
    }, [macronutrients]);

    const calculateMealCalories = (totalCalories) => {
        const breakfast = (totalCalories * 0.25).toFixed(1);
        const lunch = (totalCalories * 0.35).toFixed(1);
        const dinner = (totalCalories * 0.30).toFixed(1);
        const snack = (totalCalories * 0.10).toFixed(1);
        
        setMealCalories({
            breakfast,
            lunch,
            dinner,
            snack,
        });
    };
    useEffect(() => {
        localStorage.setItem('steps', JSON.stringify(steps));
    }, [steps]);

    useEffect(() => {
        localStorage.setItem('stepsCalories', JSON.stringify(stepsCalories));
    }, [stepsCalories]);

    const resetAllData = () => {
        setBurnedCalories(0);
        setSteps(0);
    };
    return (
        <CalorieContext.Provider value={{ calorie, setCalorie, mealCalories, setMealCalories,
            burnedCalories, setBurnedCalories, macronutrients, setMacronutrients, 
            steps, setSteps, weight, setWeight: updateWeight,
            stepsCalories, setStepsCalories, resetAllData}}>
            {children}
        </CalorieContext.Provider>
    );

};

export default CalorieProvider;
