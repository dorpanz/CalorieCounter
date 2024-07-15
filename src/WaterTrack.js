import { useState, useEffect } from "react";
import "./WaterTrack.css";

const WaterTrack = () => {
    const [animationStates, setAnimationStates] = useState(
        localStorage.animationStates ? JSON.parse(localStorage.animationStates) : [false, false, false, false, false, false, false, false]
    );
    const [waterDrank, setWaterDrank] = useState(
        localStorage.waterDrank ? localStorage.waterDrank : "0.00"
    );

    useEffect(() => {
        localStorage.setItem('animationStates', JSON.stringify(animationStates));
    }, [animationStates]);

    useEffect(() => {
        localStorage.setItem('waterDrank', waterDrank);
    }, [waterDrank]);

    useEffect(() => {
        calcWater(animationStates);
    }, [animationStates]);

    const handleFillClick = (index) => {
        setAnimationStates(prevStates => {
            const newStates = prevStates.map((state, i) => i <= index);
            return newStates;
        });
    };

    const calcWater = (states) => {
        let water = 0;
        for (let i = 0; i < states.length; i++) {
            if (states[i]) {
                water += 0.25;
            }
        }
        setWaterDrank(water.toFixed(2));
    };

    return (
        <div className="water-track summary">
            <div className="title-measure">
                Water
            </div>
            <div className="goal-weight">
                Goal: 2.00L
            </div>

            <div className="waters">
                {animationStates.map((fillAnimation, index) => (
                    <div
                        key={index}
                        className="water-cup"
                        onClick={() => handleFillClick(index)}
                    >
                        <div id={`waterPer-${index}`} className={`water-per ${fillAnimation ? 'fill-animation' : ''}`}></div>
                    </div>
                ))}
            </div>

            <div>
                <div className="container-oz">{waterDrank}L / 2.00L</div>
                <div className="instruction">*Click to fill the cup </div>
            </div>
        </div>
    );
};

export default WaterTrack;
