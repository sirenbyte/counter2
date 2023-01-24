import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";
import { FC } from "react";
import { Link } from "react-router-dom";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
interface Props {
	title: string;
	handleClick: (email: string, pass: string) => any;
}

const Form: FC<Props> = ({ title, handleClick }) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	return (
		<div>
			<CssVarsProvider>
				<Sheet
					sx={{
						maxWidth: 400,
						mx: "auto", // margin left & right
						my: 4, // margin top & botom
						py: 3, // padding top & bottom
						px: 2, // padding left & right
						display: "flex",
						flexDirection: "column",
						gap: 2,
						borderRadius: "sm",
						boxShadow: "md",
					}}
				>
					<h1>{title === "Login" ? "Авторизация" : "Регистрация"} </h1>
					{/*<TextField*/}
					{/*	// html input attribute*/}
					{/*	name="email"*/}
					{/*	type="email"*/}
					{/*	placeholder="johndoe@email.com"*/}
					{/*	// pass down to FormLabel as children*/}
					{/*	label="Email"*/}
					{/*	onChange={(e:any) => setEmail(e.target.value)}*/}
					{/*/>*/}
					<FormControl
					  id="email"
					  required
					  size="sm"
					  color="primary">
					  <FormLabel>
					    Ваш email
					  </FormLabel>
					  <Input
					    placeholder="email"
						onChange={(e:any) => setEmail(e.target.value)}
					    name="email"
					    type="email"
					    autoFocus
					    fullWidth
					    variant="outlined" />

					</FormControl>
					<FormControl
						id="password"
						required
						size="sm"
						color="primary">
						<FormLabel>
							Пароль
						</FormLabel>
						<Input
							placeholder=""
							onChange={(e:any) => setPass(e.target.value)}
							name="password"
							type="password"
							autoFocus
							fullWidth
							variant="outlined" />

					</FormControl>
					{/*<TextField*/}
					{/*	name="password"*/}
					{/*	type="password"*/}
					{/*	placeholder="password"*/}
					{/*	label="Password"*/}
					{/*	onChange={(e:any) => setPass(e.target.value)}*/}
					{/*/>*/}
					<Button
						sx={{
							mt: 1, // margin top
						}}
						onClick={() => handleClick(email, pass)}
					>
						{title === "Login" ? "Войти" : "Зарегистрироваться"}
					</Button>
					{title === "Login" ? (
						<Typography
							endDecorator={<Link to="/sign-up">Регистрация</Link>}
							fontSize="sm"
							sx={{ alignSelf: "center" }}
						>
							У вас нету аккаунта?
						</Typography>
					) : (
						<Typography
							endDecorator={<Link to="/sign-in">Войти</Link>}
							fontSize="sm"
							sx={{ alignSelf: "center" }}
						>
							У вас есть аккаунт?
						</Typography>
					)}
				</Sheet>
			</CssVarsProvider>
		</div>
	);
};

export default Form;
