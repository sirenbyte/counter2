import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/redux";
import { RoutesComponent } from "./Routes";
import { checkAuth } from "./store/reducers/UserSlice";

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (localStorage.getItem("email")) {
			dispatch(
				checkAuth({
					email: localStorage.getItem("email")!,
				})
			);
		}
	}, []);
	return (
		<div>
			<RoutesComponent />
		</div>
	);
}

export default App;
