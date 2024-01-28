import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AllRoutes />
      </AuthContextProvider>

    </div>
  );
}

export default App;
