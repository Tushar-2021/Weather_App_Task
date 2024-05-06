
import './App.css';
import TopButton from './components/TopButton';
import Inputs from './components/Inputs';
import Time_Location from './components/Time_Location';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';

function App() {
  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl  shadow-gray-400'>
    <TopButton/>
    <Inputs/>
    <Time_Location />
    <TemperatureDetails />
    <Forecast title="Hourly forecast"/>
    <Forecast title="Daily"/>
      
    </div>
  );
}

export default App;
