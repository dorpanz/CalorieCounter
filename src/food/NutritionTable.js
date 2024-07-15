const NutritionTable = ({ nutrients }) => {
    if (!nutrients) return null;

    return (
        <div className="nutrition-table">
            <span className='serving-gram'>Per 100 Grams</span>
        <table className="nutrition-table-table">
            <thead>
                <tr>
                    <th>Nutrient</th>
                    <th>Amount</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Calories</td>
                    <td>{nutrients.ENERC_KCAL.toFixed(1)}</td>
                    <td>kcal</td>
                </tr>
                <tr>
                    <td>Protein</td>
                    <td>{nutrients.PROCNT.toFixed(1)}</td>
                    <td>g</td>
                </tr>
                <tr>
                    <td>Fat</td>
                    <td>{nutrients.FAT.toFixed(1)}</td>
                    <td>g</td>
                </tr>
                <tr>
                    <td>Carbohydrates</td>
                    <td>{nutrients.CHOCDF.toFixed(1)}</td>
                    <td>g</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
};

export default NutritionTable
