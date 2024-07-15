import React, { useState, useContext } from 'react';
import { NutritionContext } from '../NutritionContext';
import './Breakfast.css';
import NutritionTable from './NutritionTable';

const Breakfast = () => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        finalSearch(e);
        setShowSearchForm(true);
        setMySearch('');
    };

    const handleAddFood = (food, nutrients) => {
        if (isAdding) return;
        setIsAdding(true);
        addFoodToMeal({ text: food, nutrients }, 'breakfast');
        setShowSearchForm(true);
        setTimeout(() => setIsAdding(false), 500);
    };

    const showMoreItems = () => {
        setVisibleItems(prevItems => prevItems + 6);
    };

    const closeSearchResults = () => {
        setShowSearchForm(false);
        setMySearch('');
        if (setMyNutrition) {
            setMyNutrition(null);
        }
    };

    const deleteFoodItem = (index) => {
        const updatedBreakfast = [...mealTimes.breakfast];
        updatedBreakfast.splice(index, 1);
        setMealTimes({ ...mealTimes, breakfast: updatedBreakfast });
    };

    const clearAllFoods = () => {
        setMealTimes({ ...mealTimes, breakfast: [] });
    };

    const updateFoodQuantity = (index, quantity) => {
        const updatedBreakfast = [...mealTimes.breakfast];
        updatedBreakfast[index].quantity = quantity;
        setMealTimes({ ...mealTimes, breakfast: updatedBreakfast });
    };

    return (
        <div className="meal summary">
            <p className='title-food'>Breakfast</p>
            <div className="added-foods">
                <h3>Added Foods:</h3>
                {mealTimes.breakfast.length === 0 ? (
                    <p>No food added yet</p>
                ) : (
                    <ul>
                        {mealTimes.breakfast.map((food, index) => (
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
                {mealTimes.breakfast.length > 0 && (
                    <div className="clear-all-container">
                        <button onClick={clearAllFoods} className="clear-all-button">Clear All</button>
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
                    <form className='find-food' onSubmit={handleSearch}>
                        <div className='search-cont'>
                            <input
                                type="text"
                                placeholder="Search food..."
                                value={mySearch}
                                onChange={(e) => setMySearch(e.target.value)}
                                required
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </div>
                        <button onClick={closeSearchResults} className="close-button">Close</button>
                    </form>
                    {stateLoader && <p>Loading...</p>}
                    {myNutrition && (
                        <div className="food-results-listing">
                            {myNutrition.hints.slice(0, visibleItems).map((hint, index) => (
                                <div key={index} className="food-item">
                                    <div className='food-label'>
                                        <div className='food-title'>
                                            <span>{hint.food.label} </span>
                                        </div>
                                        <button onClick={() => handleAddFood(hint.food.label, hint.food.nutrients)} className="add-food-button">Add Food</button>
                                    </div>
                                    <div>
                                        <NutritionTable nutrients={hint.food.nutrients} />
                                    </div>
                                </div>
                            ))}
                            {visibleItems < myNutrition.hints.length && (
                                <div className="show-more-container">
                                    <button onClick={showMoreItems} className="show-more-button">Show More</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Breakfast;
