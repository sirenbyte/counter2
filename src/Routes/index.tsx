import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { MainLayout } from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import { MenuListApi } from "../services/MenuListService";
import { IUnknown } from "../models/IUnknown";
import ColorItem from "../components/ColorItem/ColorItem";
import UserList from "../Pages/UserList/UserList";
import ProfileItem from "../components/ProfileItem/ProfileItem";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";

export const RoutesComponent: React.FC = () => {
	const [menuList, setMenuList] = useState<IUnknown[]>();
	const { error, isLoading, data } =
		MenuListApi.useFetchAllMenuItemListQuery("");

	useEffect(() => {
		setMenuList(data?.data);
	}, [data]);

	if (isLoading) {
		return <div>Loading</div>;
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/sign-in" element={<LoginPage />} />
				<Route path="/sign-up" element={<RegisterPage />} />
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/users" element={<UserList />} />
					<Route path="/users/:id" element={<ProfileItem />} />

					{menuList?.map((item) => {
						return (
							<Route
								key={item.pantone_value}
								path={item.name.split(" ").join("")}
								element={<ColorItem id={item.id} />}
							/>
						);
					})}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
