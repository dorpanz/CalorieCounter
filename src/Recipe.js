import React, { useState, useEffect, useMemo } from 'react';
import './Recipe.css'; 
import { ClipLoader } from 'react-spinners'; 

const MY_ID = "a2efd5d7";
const MY_TOKEN = "21d5c8b3e5e37144089649a12a721140";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [lowCalorieRecipes, setLowCalorieRecipes] = useState([]);
    const [highProteinRecipes, setHighProteinRecipes] = useState([]);
    const [choiceOfTheDay, setChoiceOfTheDay] = useState(null);
    const categories = useMemo(() => ['Breakfast', 'Lunch', 'Dinner', 'Snack'], []); 
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('low-high');
    const [modalRecipe, setModalRecipe] = useState(null); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true); 
            try {
                const url = searchQuery 
                    ? `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${MY_ID}&app_key=${MY_TOKEN}`
                    : `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedCategory === 'all' ? categories.join(',') : selectedCategory}&app_id=${MY_ID}&app_key=${MY_TOKEN}`;
    
                const response = await fetch(url);
                const data = await response.json();
                let fetchedRecipes = data.hits;
    
                if (sortOrder === 'low-high') {
                    fetchedRecipes.sort((a, b) => a.recipe.calories - b.recipe.calories);
                } else {
                    fetchedRecipes.sort((a, b) => b.recipe.calories - a.recipe.calories);
                }
    
                setRecipes(fetchedRecipes);
    
                if (selectedCategory === 'all' && !searchQuery) {
                    const lowCalorieUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=low%20calorie&app_id=${MY_ID}&app_key=${MY_TOKEN}`;
                    const lowCalResponse = await fetch(lowCalorieUrl);
                    const lowCalData = await lowCalResponse.json();
                    setLowCalorieRecipes(lowCalData.hits.slice(0, 10)); 
    
                    const highProteinUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=high%20protein&app_id=${MY_ID}&app_key=${MY_TOKEN}`;
                    const highProteinResponse = await fetch(highProteinUrl);
                    const highProteinData = await highProteinResponse.json();
                    setHighProteinRecipes(highProteinData.hits.slice(0, 10)); 
    
                    const randomIndex = Math.floor(Math.random() * fetchedRecipes.length);
                    setChoiceOfTheDay(fetchedRecipes[randomIndex]);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchRecipes();
    }, [selectedCategory, searchQuery, sortOrder, categories]); 
    
    const openModal = (recipe) => {
        setModalRecipe(recipe);
    };

    const closeModal = () => {
        setModalRecipe(null);
    };

    return (
        <div className="summary">
            <h3 className='recipe-title'>Recipe Catalog</h3>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search recipes..."
                    className="search-bar-inp"
                />
                <button className='search-btn-recipe' onClick={() => setSearchQuery(searchQuery)}>Search</button>
            </div>
            <div className="controls">
                <div className="category-filter">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`category-all ${selectedCategory === 'all' ? 'active' : ''}`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-btns ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className="sort-order">
                    <label htmlFor="sortOrder">Sort by Calories: </label>
                    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? ( 
                <div className="spinner-container">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <div>
                    {selectedCategory === 'all' && !searchQuery && (
                        <div className="recommendations">
                            <h2>Recommendations</h2>
                            <h3>Low Calorie</h3>
                            <div className="recommendation-section">
                                <div className="recipe-list">
                                    {lowCalorieRecipes.map(recipe => (
                                        <div key={recipe.recipe.uri} className="recipe-card" onClick={() => openModal(recipe)}>
                                            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                            <div className="recipe-details">
                                                <h2 className='recipe-details-title'>{recipe.recipe.label}</h2>
                                                <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scroll-indicator"></div> 
                            </div>
                            <h3>High Protein</h3>
                            <div className="recommendation-section">
                                <div className="recipe-list">
                                    {highProteinRecipes.map(recipe => (
                                        <div key={recipe.recipe.uri} className="recipe-card" onClick={() => openModal(recipe)}>
                                            <img src={recipe.recipe.image} alt={recipe.recipe.label}  />
                                            <div className="recipe-details">
                                                <h2 className='recipe-details-title'>{recipe.recipe.label}</h2>
                                                <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scroll-indicator"></div> 
                            </div>
                            <h3>Choice of the Day</h3>
                            <div className="recommendation-section choice">
                                {choiceOfTheDay && (
                                    <div className="choice-of-the-day" onClick={() => openModal(choiceOfTheDay)}>
                                        <img src={choiceOfTheDay.recipe.image} alt={choiceOfTheDay.recipe.label} width="250px" height="250px"/>
                                        <div className="recipe-details choice-details">
                                            <h2>{choiceOfTheDay.recipe.label}</h2>
                                            <p>Calories: {Math.round(choiceOfTheDay.recipe.calories)}</p>
                                            <p><strong>Servings:</strong> {choiceOfTheDay.recipe.yield}</p>
                                            <p><strong>Dish Type:</strong> {choiceOfTheDay.recipe.dishType}</p>
                                            
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="recipe-grid">
                        {recipes.slice(0,18).map(recipe => (
                            <div key={recipe.recipe.uri} className="recipe-card-all" onClick={() => openModal(recipe)}>
                                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                <div className="recipe-details-all">
                                    <h2>{recipe.recipe.label}</h2>
                                    <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {modalRecipe && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="modal-details">
                        <img src={modalRecipe.recipe.image} alt={modalRecipe.recipe.label} />
                        <div className='details-name-modal'>
                            <h2>{modalRecipe.recipe.label}</h2>
                            <p>Calories: {Math.round(modalRecipe.recipe.calories)}</p>
                            <p><strong>Servings:</strong> {modalRecipe.recipe.yield}</p>
                            <p><strong>Dish Type:</strong> {modalRecipe.recipe.dishType}</p>
                        </div>
                        </div>
                        <div className="modal-ingr">
                            <h3>Ingredients:</h3>
                            <ul className='ingr-list'>
                                {modalRecipe.recipe.ingredientLines.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipe;
