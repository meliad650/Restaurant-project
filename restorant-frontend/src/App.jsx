import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/Home/HomePage';
import ManagementPage from './pages/Management/ManagementPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ManagementPage" element={<ManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
