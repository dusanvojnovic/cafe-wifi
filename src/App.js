import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CafesList from './cafes/components/CafesList/CafesList';
import SignupForm from './shared/components/Forms/SignupForm';
import LoginForm from './shared/components/Forms/LoginForm';

import Header from './shared/components/Header/Header';
import AddCafeForm from './cafes/components/Forms/AddCafeForm';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/cafes" element={<CafesList />} />
          <Route path="/my-cafes" exact element={<SignupForm />} />
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/add" exact element={<AddCafeForm />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
