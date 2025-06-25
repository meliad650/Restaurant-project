import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/Home/HomePage';
import MenuPage from './pages/Home/MenuPage';
import Branches from './pages/Home/Branches';
import Cart from './pages/Home/Cart';
import OrderHistory from './pages/Home/OrderHistory';
import ManagementPage from './pages/Management/ManagementPage';
import BranchesM from './pages/Management/branchesM';
import MenuM from './pages/Management/menuM';
import OrdersM from './pages/Management/oredersM';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<AuthPage />} />
        <Route path="/ManagementPage" element={<ManagementPage />} >
        <Route path="orders" element={<OrdersM/>}> </Route>
        <Route path="menu" element={<MenuM/>}> </Route>
        <Route path="branches" element={<BranchesM/>}> </Route>
        </Route>

        <Route path="/home" element={<HomePage />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="branches" element={<Branches />} />
          <Route path="cart" element={<Cart />} />
          <Route path="history" element={<OrderHistory />} />
        </Route>

         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
