import { Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserSelectionForm from './components/UserSelectionForm';
import './styles/sass/App.scss';

function App() {
  return (
    <div>
      <header>
        <h1 className='wrapper'>Robo<span>Trivia</span></h1>
      </header> 
      {/* Routes to the landing page and quiz */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/welcome' element={<UserSelectionForm />}/>
      </Routes>

      <footer>
        <p>Created at <a href='www.junoCollege.com'>Juno College</a> 2022</p>
      </footer>
    </div>
  );
}

export default App;
