import { Route, Routes, BrowserRouter } from "react-router-dom";
// import CafeItem from "./cafes/components/CafeItem/CafeItem";
import CafesList from "./cafes/components/CafesList/CafesList";

import Header from "./shared/components/Header/Header";

function App() {
	return (
		<BrowserRouter>
			<>
				<Header />
				<Routes>
					<Route path='/cafes' element={<CafesList />} />
				</Routes>
			</>
		</BrowserRouter>
	);
}

export default App;
