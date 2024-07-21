import './Food.css';
import breakfast from "./pics/breakfast.png";
import lunch from "./pics/lunch.png";
import dinner from "./pics/dinner.webp";
import snack from "./pics/snack.png";
import { Link } from 'react-router-dom';
const Food = ({ totalNutrients, mealCalories }) => {
    const calculateProgress = (eaten, total) => {
        return ((eaten / total) * 360).toFixed(2);
    };
    const breakfastProgress = calculateProgress(totalNutrients.breakfast.calories, mealCalories.breakfast);
    const lunchProgress = calculateProgress(totalNutrients.lunch.calories, mealCalories.lunch);
    const dinnerProgress = calculateProgress(totalNutrients.dinner.calories, mealCalories.dinner);
    const snackProgress = calculateProgress(totalNutrients.snack.calories, mealCalories.snack);
    return (
        <div className="summary food">
            <div className='breakfast'>
                <div className="progress-circle-breakfast" 
                style={{ background: `conic-gradient(rgb(255, 118, 140) ${breakfastProgress}deg, pink 0deg)` }}>
                    <div className="cal-remain-breakf">
                        <img src={breakfast} width="70px" alt="pancakes"/>
                    </div>
                </div>
                <div className='info'>
                    <div className="title">
                        <h3>Breakfast</h3>
                    </div>
                    <div className="breakfast-cal">
                        <p>{Math.round(totalNutrients.breakfast.calories)} / {Math.round(mealCalories.breakfast)} Cal</p>
                    </div>
                </div>
                <div className='btn-add'>
                    <Link to="/breakfast" className='btn food-add'>+</Link>
                </div>
            </div>
            <div className='line'></div>
            <div className='breakfast'>
                <div  className="progress-circle-breakfast" 
                style={{ background: `conic-gradient(rgb(255, 118, 140) ${lunchProgress}deg, pink 0deg)` }}>
                    <div className="cal-remain-breakf">
                        <img src={lunch} width="43px" alt="sandwich"/>
                    </div>
                </div>
                <div className='info'>
                    <div className="title">
                        <h3>Lunch</h3>
                    </div>
                    <div className="breakfast-cal">
                        <p> {Math.round(totalNutrients.lunch.calories)} / {Math.round(mealCalories.lunch)} Cal</p>
                    </div>
                </div>
                <div className='btn-add'>
                    <Link to="/lunch" className='btn food-add'>+</Link>
                </div>
            </div>
            <div className='line'></div>
            <div className='breakfast'>
                <div  className="progress-circle-breakfast" 
                style={{ background: `conic-gradient(rgb(255, 118, 140) ${dinnerProgress}deg, pink 0deg)` }}>
                    <div className="cal-remain-breakf">
                        <img src={dinner} width="48px" alt="salad"/>
                    </div>
                </div>
                <div className='info'>
                    <div className="title">
                        <h3>Dinner</h3>
                    </div>
                    <div className="breakfast-cal">
                        <p>{Math.round(totalNutrients.dinner.calories)} / {Math.round(mealCalories.dinner)} Cal</p>
                    </div>
                </div>
                <div className='btn-add'>
                    <Link to="/dinner" className='btn food-add'>+</Link>
                </div>
            </div>
            <div className='line'></div>
            <div className='breakfast'>
                <div className="progress-circle-breakfast" 
                style={{ background: `conic-gradient(rgb(255, 118, 140) ${snackProgress}deg, pink 0deg)` }}>
                    <div className="cal-remain-breakf">
                        <img src={snack} width="46px" alt="cherry"/>
                    </div>
                </div>
                <div className='info'>
                    <div className="title">
                        <h3>Snack</h3>
                    </div>
                    <div className="breakfast-cal">
                        <p>{Math.round(totalNutrients.snack.calories)} / {Math.round(mealCalories.snack)} Cal</p>
                    </div>
                </div>
                <div className='btn-add'>
                    <Link to="/snack" className='btn food-add'>+</Link>
                </div>
            </div>
        </div>
    );
};

export default Food;
