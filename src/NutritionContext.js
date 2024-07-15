import React, { createContext, useState, useEffect, useCallback } from 'react';

const NutritionContext = createContext();

const NutritionProvider = ({ children }) => {
    const [mealTimes, setMealTimes] = useState(() => {
        const storedMealTimes = localStorage.getItem('mealTimes');
        return storedMealTimes
            ? JSON.parse(storedMealTimes)
            : {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: [],
            };
    });

    const [mySearch, setMySearch] = useState('');
    const [wordSubmitted, setWordSubmitted] = useState('');
    const [myNutrition, setMyNutrition] = useState(null);
    const [stateLoader, setStateLoader] = useState(false);
    const [visibleItems, setVisibleItems] = useState(6);

    const APP_ID = 'd6962fbe';
    const APP_KEY = '7f032190fa49a3ce0d2f363d880b92a1';
    const APP_URL = 'https://api.edamam.com/api/food-database/v2/parser';

    const fetchData = useCallback(async (ingr) => {
        setStateLoader(true);
        setVisibleItems(6);
        try {
            const response = await fetch(
                `${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${ingr}`
            );
            if (response.ok) {
                const data = await response.json();

                const hints = data.hints.map((hint) => ({
                    ...hint,
                    food: {
                        ...hint.food,
                        nutrients: {
                            ENERC_KCAL: hint.food.nutrients.ENERC_KCAL,
                            PROCNT: hint.food.nutrients.PROCNT,
                            FAT: hint.food.nutrients.FAT,
                            CHOCDF: hint.food.nutrients.CHOCDF,
                            FIBTG: hint.food.nutrients.FIBTG,
                        },
                    },
                }));

                setMyNutrition({ hints });
            } else {
                throw new Error('Failed to fetch food data');
            }
        } catch (error) {
            console.error('Error fetching food data:', error);
            alert('Ingredients entered incorrectly');
        } finally {
            setStateLoader(false);
        }
    }, [APP_ID, APP_KEY]);

    const addFoodToMeal = (food, mealType) => {
        setMealTimes((prevState) => {
            const meal = prevState[mealType];
            const existingFoodIndex = meal.findIndex(
                (item) => item.text === food.text
            );

            if (existingFoodIndex !== -1) {
                console.log('Food already exists, increasing quantity');
                const updatedMeal = [...meal];
                updatedMeal[existingFoodIndex].quantity += 1;
                return { ...prevState, [mealType]: updatedMeal };
            } else {
                return {
                    ...prevState,
                    [mealType]: [...meal, { ...food, quantity: 1 }],
                };
            }
        });
    };

    const myRecipeSearch = (e) => {
        setMySearch(e.target.value);
    };

    const finalSearch = (e) => {
        e.preventDefault();
        setWordSubmitted(mySearch);
    };

    useEffect(() => {
        if (wordSubmitted !== '') {
            fetchData(wordSubmitted);
        }
    }, [wordSubmitted, fetchData]);

    useEffect(() => {
        localStorage.setItem('mealTimes', JSON.stringify(mealTimes));
    }, [mealTimes]);

    const totalNutrients = Object.keys(mealTimes).reduce((acc, mealType) => {
        acc[mealType] = mealTimes[mealType].reduce(
            (mealAcc, food) => {
                mealAcc.calories += food.nutrients.ENERC_KCAL * food.quantity;
                mealAcc.protein += food.nutrients.PROCNT * food.quantity;
                mealAcc.fat += food.nutrients.FAT * food.quantity;
                mealAcc.carbs += food.nutrients.CHOCDF * food.quantity;
                return mealAcc;
            },
            {
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0,
            }
        );
        return acc;
    }, {});

    return (
        <NutritionContext.Provider
            value={{
                mealTimes,
                mySearch,
                setMySearch,
                wordSubmitted,
                myNutrition,
                setMyNutrition,
                stateLoader,
                myRecipeSearch,
                finalSearch,
                addFoodToMeal,
                visibleItems,
                setVisibleItems,
                setMealTimes,
                totalNutrients
            }}
        >
            {children}
        </NutritionContext.Provider>
    );
};

export { NutritionContext, NutritionProvider };
