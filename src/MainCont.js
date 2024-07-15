import React, { useContext } from 'react';
import { CalorieContext } from './CalorieContext'; 
import Summary from './Summary';
import Food from './Food';
import Activities from './Activities';
import Measure from './Measure';
import WaterTrack from './WaterTrack';
import Notes from './Notes';
import { NutritionContext } from './NutritionContext';

const MainCont = () => {
    const { mealCalories } = useContext(CalorieContext);
    const { totalNutrients } = useContext(NutritionContext);

    return (
        <div>
            <Summary totalNutrients={totalNutrients} />
            <Food totalNutrients={totalNutrients} mealCalories={mealCalories} />
            <Activities />
            <Measure />
            <WaterTrack />
            <Notes />
        </div>
    );
};

export default MainCont;
