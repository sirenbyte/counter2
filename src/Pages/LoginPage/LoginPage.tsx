import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/redux";
import { Typography } from "@mui/joy";
import Link from "@mui/joy/Link";
import { setUser } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	const dispatch = useAppDispatch();
	let navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						token: user.refreshToken!,
						email: user.email!,
					})
				);
				localStorage.setItem('email', user.email!)
				navigate("/");
			})
			.catch((e) => {
				
				alert("Что-то пошло не так");
			});
	};

	return (
		<div>
			<Form title="Login" handleClick={handleLogin} />
		</div>
	);
}

export default LoginPage;
