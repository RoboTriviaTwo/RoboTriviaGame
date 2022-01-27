import { Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserSelectionForm from './components/UserSelectionForm';
import './styles/sass/App.scss';

function App() {

  return (
    <div>
      <header>
        <h1 className='wrapper'>RoboTrivia</h1>
      </header>
   
      {/* Routes to the landing page and quiz */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelectionForm />}/>
      </Routes>

    </div>
  );
}

export default App;
