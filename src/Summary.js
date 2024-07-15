import React, { useContext } from 'react';
import { CalorieContext } from './CalorieContext';
import './App.css';
import ResetAll from './ResetAll';

const Summary = ({totalNutrients}) => {
    const { calorie, macronutrients, burnedCalories } = useContext(CalorieContext);
    const eatenCalories = totalNutrients.breakfast.calories + totalNutrients.lunch.calories +totalNutrients.dinner.calories + totalNutrients.snack.calories;
    const remainCal = (calorie - eatenCalories)+burnedCalories;
    const remainCalProgress = ((remainCal / calorie) * 360).toFixed(2);
    const totalProtein = totalNutrients.breakfast.protein + totalNutrients.lunch.protein + totalNutrients.dinner.protein + totalNutrients.snack.protein
    const totalFat = totalNutrients.breakfast.fat + totalNutrients.lunch.fat + totalNutrients.dinner.fat + totalNutrients.snack.fat
    const totalCarbs = totalNutrients.breakfast.carbs + totalNutrients.lunch.carbs + totalNutrients.dinner.carbs + totalNutrients.snack.carbs
    const date = new Date().toDateString() 
    return (
        <div>
            <div className="summary main-info">
            <div className='headline'>
                <span className="date">{date}</span>
                <ResetAll />
            </div>
                <div className="all-info">
                    <div className="calories">
                        <p>{Math.round(eatenCalories)}</p>
                        <p className="text-calorie">Eaten</p>
                    </div>

                    <div className="calories progress-circle"
                        style={{
                            background: `conic-gradient(rgb(255, 118, 140) ${360 - remainCalProgress}deg, pink 0deg)`
                        }}>
                        <div className="cal-remain-breakf">
                            <p style={{ color: remainCal < 0 ? 'red' : 'inherit' }}>
                                {Math.abs(Math.round(remainCal))}
                            </p>
                            <p className="text-calorie">{remainCal < 0 ? 'Over' : 'Remaining'}</p>
                        </div>
                    </div>

                    <div className="calories">
                        <p>{Math.round(burnedCalories)}</p>
                        <p className="text-calorie">Burned</p>
                    </div>
                </div>

                <div className="nutrition-summary">
                    <div className="nutrition">
                        <p>Protein</p>
                        <div className="progress-bar">
                            <span className="progress-per protein" style={{ width: `${totalProtein}%` }}></span>
                        </div>
                        <p>{Math.round(totalProtein)}/{macronutrients.protein}g</p>
                    </div>

                    <div className="nutrition">
                        <p>Fat</p>
                        <div className="progress-bar">
                            <span className="progress-per fat" style={{ width: `${totalFat}%` }}></span>
                        </div>
                        <p>{Math.round(totalFat)}/{macronutrients.fat}g</p>
                    </div>

                    <div className="nutrition">
                        <p>Carbs</p>
                        <div className="progress-bar">
                            <span className="progress-per carbs" style={{ width: `${totalCarbs}%` }}></span>
                        </div>
                        <p>{Math.round(totalCarbs)}/{macronutrients.carbs}g</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
