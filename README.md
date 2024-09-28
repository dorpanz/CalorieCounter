# Calories Counter App

## Introduction
https://calcountish.netlify.app/
The Calories Counter Project is a web application designed to help users track their daily calorie intake and expenditure. With this app, users can log their meals, view nutritional information, and see a visual representation of their calorie consumption and remaining calories throughout the day. The project is built using React for the frontend and includes visual progress indicators for different meals.

## Features

- **Daily Calorie Tracking**: Log meals and track daily calorie intake and expenditure.
- **Nutritional Information**: View detailed nutritional information for logged meals.
- **Visual Progress Circles**: Display progress circles for each meal to visualize calorie consumption.
- **Calorie Summary**: Summary of total calories consumed, remaining, and burned.
- **Recipe Search**: Search for recipes based on a query and category.
- **Recommendations**: Display recommendations for low-calorie and high-protein recipes.
- **Choice of the Day**: Show a randomly selected recipe as the choice of the day.
- **Responsive Design**: Fully responsive design that adapts to various screen sizes.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- A code editor (VS Code recommended).

### Steps

1. **Clone the repository:**

    ```bash
    https://github.com/dorpanz/CalorieCounter.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd CalorieCounter
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

    The application will run on `http://localhost:3000`.

## API Usage

This project uses the Edamam Recipe API to fetch recipe data. You need to sign up on the [Edamam website](https://developer.edamam.com/) to get your API ID and API Key.

Update the `MY_ID` and `MY_TOKEN` constants in `Recipe.js` with your API credentials:

```javascript
const MY_ID = "your_api_id";
const MY_TOKEN = "your_api_key";
```

## Usage

### Logging Meals

1. Navigate to the desired meal (breakfast, lunch, dinner, or snack) using the provided buttons.
2. Add the nutritional information for the meal.
3. View the updated progress circles and summary.

### Viewing Summary

The summary section provides an overview of the total calories eaten, remaining, and burned for the day. Macronutrient information (protein, fat, and carbs) is also displayed with progress bars.

### Recipe Search

1. Enter a search query in the search bar.
2. Click on the "Search" button to fetch and display recipes based on the query.
3. Filter recipes by categories like Breakfast, Lunch, Dinner, and Snack.
4. View recommendations for low-calorie and high-protein recipes.

### Viewing Recipe Details

1. Click on a recipe card to open a modal with detailed information about the recipe, including ingredients.

## Customization

You can customize the application by modifying the CSS files and React components. For example, you can change the colors of the progress circles or adjust the layout of the summary section.

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes. Make sure to follow the project's coding standards and include detailed commit messages.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please open an issue on the repository or contact the project maintainer at destowq@gmail.com

