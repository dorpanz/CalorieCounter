import React, { useEffect, useContext } from "react";
import { CalorieContext } from "./CalorieContext";
import "./Measure.css";

const Measure = () => {
    const { weight, setWeight } = useContext(CalorieContext);
    const addWeight = () => {
        let newWeight = parseFloat(weight) + 0.1;
        setWeight(newWeight.toFixed(1));
    };

    const subtractWeight = () => {
        let newWeight = parseFloat(weight) - 0.1;
        setWeight(newWeight.toFixed(1));
    };

    useEffect(() => {
        localStorage.setItem('currentWeight', weight.toString());
        console.log("Updated currentWeight in localStorage:", weight);
    }, [weight]);

    console.log("Current weight state:", weight);

    return (
        <div className="summary measure">
            <div className="title-measure">Weight</div>
            <div className="weight-now">
                <button className="add-execr less-weight" onClick={subtractWeight}>-</button>
                <p className="weight">{weight} kg</p>
                <button className="add-execr more-weight" onClick={addWeight}>+</button>
            </div>
        </div>
    );
};

export default Measure;
