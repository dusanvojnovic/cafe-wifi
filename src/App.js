import { Suspense } from "react";
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";

import SignupForm from "./shared/components/Forms/SignupForm";
import LoginForm from "./shared/components/Forms/LoginForm";
import Navigation from "./shared/components/Navigation/Navigation";
import Spinner from "./shared/components/Spinner/Spinner";
import AddCafeForm from "./cafes/components/Forms/AddCafeForm";
import EditCafeForm from "./cafes/components/Forms/EditCafeForm";
import UserPage from "./cafes/pages/UserPage";
import HomePage from "./shared/pages/HomePage";
import AllCafes from "./shared/pages/AllCafes";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
	const { token, login, logout, userId } = useAuth();

	let routes;
	if (token) {
		routes = (
			<Routes>
				<Route path='/' exact element={<AllCafes />} />
				<Route path='/add' exact element={<AddCafeForm />} />
				<Route path='/:userId/cafes' exact element={<UserPage />} />
				<Route path='/cafes' exact element={<AllCafes />} />
				<Route path='/cafes/:cafeId' element={<EditCafeForm />} />
				{/* <Navigate to="/" /> */}
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path='/' exact element={<HomePage />} />
				<Route path='/signup' element={<SignupForm />} />
				<Route path='/login' element={<LoginForm />} />
				<Route path='/cafes' exact element={<AllCafes />} />
			</Routes>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				login: login,
				logout: logout,
				userId: userId,
			}}
		>
			<BrowserRouter>
				{token && <Navigation />}
				<Suspense
					fallback={
						<div className='center'>
							<Spinner />
						</div>
					}
				>
					{routes}
				</Suspense>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
