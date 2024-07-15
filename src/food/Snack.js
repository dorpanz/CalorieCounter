import { useContext, useState } from "react";
import { NutritionContext } from "../NutritionContext";
import NutritionTable from "./NutritionTable";

const Snack = () =>{
    const {
        mealTimes,
        setMyNutrition,
        addFoodToMeal,
        setMealTimes,
        mySearch,
        setMySearch,
        myNutrition,
        stateLoader,
        finalSearch,
        visibleItems,
        setVisibleItems,
    } = useContext(NutritionContext);

    const [showSearchForm, setShowSearchForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const deleteFoodItem = (index) => {
        const updatedSnack = [...mealTimes.snack];
        updatedSnack.splice(index, 1);
        setMealTimes({...mealTimes, snack: updatedSnack})
    };
    const clearAllFoods = () =>{
        setMealTimes({...mealTimes, snack: []})
    };
    const closeSearchResults = () => {
        setShowSearchForm(false);
        setMySearch('')
        if (setMyNutrition){
            setMyNutrition(null)
        }
    }
    const updateFoodQuantity = (index, quantity) => {
        const updatedSnack = [...mealTimes.snack];
        updatedSnack[index].quantity = quantity;
        setMealTimes({ ...mealTimes, snack: updatedSnack });
    };
    const handleSearch = (e) =>{
        e.preventDefault();
        finalSearch(e);
        setShowSearchForm(true);
        setMySearch('')
    }

    const handleAddFood = (food , nutrients)=>{
        if (isAdding) return;
        setIsAdding(true);
        addFoodToMeal({text : food, nutrients}, 'snack');
        setShowSearchForm(true);
        setTimeout(() => setIsAdding(false), 500);
    }

    const showMoreItems = () =>{
        setVisibleItems((prev) => prev + 6);
    }
    return(
        <div className="meal summary">
            <p className="title-food">Snack</p>
            <div className="added-foods">
                <h3>Added Foods:</h3>
                {mealTimes.snack.length === 0 ? (
                    <p>No food added yet</p>
                ) : (
                    <ul>
                        {mealTimes.snack.map((food, index) => (
                            <li key={index} className="added-food-item">
                                <input
                                    type="number"
                                    value={food.quantity}
                                    onChange={(e) => updateFoodQuantity(index, Number(e.target.value))}
                                    className="quantity-input"
                                />
                                <span className='food-text'>{food.text}</span>
                                <button onClick={() => deleteFoodItem(index)} className="delete-food-button">X</button>
                            </li>
                        ))}
                    </ul>
                )}
                {mealTimes.snack.length > 0 && (
                    <div className="clear-all-container">
                        <button className="clear-all-button"
                        onClick={clearAllFoods}>Clear All</button>
                    </div>
                )}
            </div>
            {!showSearchForm && (
                <div className="add-more-container">
                    <button onClick={() => setShowSearchForm(true)} className="add-more-button">ADD MORE</button>
                </div>
            )}
            {showSearchForm && (
                <div className="food-results">
                    <form className="find-food" onSubmit={handleSearch}>
                        <div className="search-cont">
                            <input
                            type="text"
                            placeholder="Search food..."
                            value={mySearch}
                            required
                            className="search-input"
                            onChange={(e) => setMySearch(e.target.value)}
                            />
                            <button
                            type="submit" className="search-button">Search</button>
                        </div>
                        <button onClick={closeSearchResults} className="close-button">Close</button>
                    </form>
                    {stateLoader && <p>Loading...</p>}
                    {myNutrition && (
                        <div className="food-results-listing">
                            {myNutrition.hints.slice(0,visibleItems).map((hint, index) =>(
                                <div key={index} className="food-item">
                                    <div className="food-label">
                                        <div className="food-title">
                                            {hint.food.label}
                                        </div>
                                        <button onClick={() => handleAddFood(hint.food.label, hint.food.nutrients)}
                                        className="add-food-button">Add food</button>
                                    </div>
                                    <div>
                                        <NutritionTable nutrients={hint.food.nutrients}/>
                                    </div>
                                </div>
                            ))}
                            {visibleItems < myNutrition.hints.length && (
                                <div className="show-more-container">
                                    <button onClick={showMoreItems} 
                                    className="show-more-button">Show More</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Snack;