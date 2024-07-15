import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalorieProvider from './CalorieContext';
import MainCont from './MainCont';
import Welcome from './Welcome';
import Recipe from './Recipe';
import { NutritionProvider } from './NutritionContext';
import Breakfast from './food/Breakfast';
import Lunch from './food/Lunch';
import Dinner from './food/Dinner';
import Snack from './food/Snack';

function App() {
    return (
        <CalorieProvider>
            <NutritionProvider>
                <Router>
                        <nav>
                            <div className='left-links'>
                                <Link to="/" className='menu'>Welcome</Link>
                            </div>
                            <div className='right-links'>
                                <Link to="/diary" className='menu'>Diary</Link>
                                <Link to="/recipes" className='menu'>Recipes</Link>
                            </div>
                            
                        </nav>

                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/diary" element={<MainCont />} />
                            <Route path="/recipes" element={<Recipe />} />
                            <Route path="/breakfast" element={<Breakfast />} />
                            <Route path="/lunch" element={<Lunch />} />
                            <Route path="/dinner" element={<Dinner />} />
                            <Route path="/snack" element={<Snack />} />
                        </Routes>
                </Router>
            </NutritionProvider>
        </CalorieProvider>
    );
}

export default App;
