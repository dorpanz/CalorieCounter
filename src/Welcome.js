import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CalorieContext } from "./CalorieContext";
import "./Welcome.css";

const Welcome = () => {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        activity: '',
        goal: ''
    });

    const { calorie, setCalorie, setMacronutrients, setWeight } = useContext(CalorieContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setWeight(formData.weight); 
        calcCal();
    };

    const calcCal = () => {
        const { age, height, weight, gender, activity, goal } = formData;
        let activityValue;
        let normCal;

        if (activity === "sedentary") activityValue = 1.2;
        else if (activity === "lightly active") activityValue = 1.375;
        else if (activity === "moderately active") activityValue = 1.55;
        else if (activity === "very active") activityValue = 1.725;
        else if (activity === "professional") activityValue = 1.9;

        if (gender === "female") {
            normCal = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * activityValue;
        } else {
            normCal = ((10 * weight) + (6.25 * height) + (5 * age) + 5) * activityValue;
        }

        let proteinPercentage, fatPercentage, carbPercentage;

        if (goal === "weight-loss") {
            normCal *= 0.8;
            proteinPercentage = 0.325;
            fatPercentage = 0.325;
            carbPercentage = 0.35;
        } else if (goal === "maintain") {
            proteinPercentage = 0.3;
            fatPercentage = 0.3;
            carbPercentage = 0.4;
        } else if (goal === "weight-gain") {
            normCal *= 1.2;
            proteinPercentage = 0.375;
            fatPercentage = 0.2;
            carbPercentage = 0.425;
        }

        const proteinIntake = (normCal * proteinPercentage) / 4; // 4 calories per gram of protein
        const fatIntake = (normCal * fatPercentage) / 9; // 9 calories per gram of fat
        const carbIntake = (normCal * carbPercentage) / 4; // 4 calories per gram of carbs

        setCalorie(normCal.toFixed());
        setMacronutrients({
            protein: proteinIntake.toFixed(),
            fat: fatIntake.toFixed(),
            carbs: carbIntake.toFixed()
        });
    };

    return (
        <div className="summary welcome">
            <h3 className="title-cal">Welcome to Calorie Counter App</h3>
            <p>Your journey to a healthier lifestyle begins here. Our app helps you keep track of your daily caloric intake and ensures you stay on top of your dietary goals.</p>
            <p>Get started by answering the question to calculate your ideal calorie intake</p>

            <form onSubmit={handleSubmit} className="form-calorie">
                <label>Enter your age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label>Enter your height:</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label>Enter your weight:</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label>Enter your gender:</label>
                <div className="radio-group">
                    <label className={`radio-label ${formData.gender === "male" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            required
                        />
                        Male
                    </label>
                    <label className={`radio-label ${formData.gender === "female" ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            required
                        />
                        Female
                    </label>
                </div>
                <label htmlFor="activity">Choose your level of activity:</label>
                <select
                    value={formData.activity}
                    onChange={handleChange}
                    name="activity"
                    className="input-field"
                    required
                >
                    <option value="">Select activity level</option>
                    <option value="sedentary">No physical activity and a sedentary job</option>
                    <option value="lightly active">A light jog or light exercise 1-3 times a week</option>
                    <option value="moderately active">Moderate exercise 3-5 times a week</option>
                    <option value="very active">Intense training 6-7 times a week</option>
                    <option value="professional">Your job involves physical labor, you train twice a day and include strength exercises in your training program</option>
                </select>

                <label htmlFor="goal">What's your goal?</label>
                <select
                    value={formData.goal}
                    onChange={handleChange}
                    name="goal"
                    className="input-field"
                    required
                >
                    <option value="">Select goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="weight-gain">Weight Gain</option>
                    <option value="maintain">Maintain</option>
                </select>
                <button type="submit" className="calc-button">Calculate Calories</button>
            </form>

            {calorie>0 && (
                <div className="calorie-alert">
                    <div className="calorie-alert-content">
                        <h4>Perfect Calorie Intake</h4>
                        <p>{calorie} calories per day</p>
                        <div className="btn-nav">
                            <Link className="gotomain" to="/diary">Let's Start!</Link>
                            <button className="close-alert" onClick={() => setCalorie(null)}>Change</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;
