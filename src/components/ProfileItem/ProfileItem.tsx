import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IUsers } from "../../models/IUsers";
import UserList from "../../Pages/UserList/UserList";
import { UsersApi } from "../../services/UserListService";

import Breadcrumbs from "@mui/joy/Breadcrumbs";

import Typography from "@mui/joy/Typography";
function ProfileItem() {
	const [user, setUser] = useState<IUsers>();

	const { id } = useParams();

	const { error, isLoading, data } = UsersApi.useFetchUserQuery(id);

	useEffect(() => {
		setUser(data?.data!);
	}, [data]);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Breadcrumbs separator="›" aria-label="breadcrumbs">
				<Link to="/users">Users</Link>
				<Typography fontSize="inherit">{user?.first_name}</Typography>
			</Breadcrumbs>

			<div style={{ display: "flex" }}>
				<Avatar src={user?.avatar} sx={{ width: 150, height: 150 }} />
				<div
					style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}
				>
					<h1>
						{user?.first_name} {user?.last_name}
					</h1>
					<p>
						{" "}
						<b>Email: </b> {user?.email}
					</p>
				</div>
			</div>
		</>
	);
}

export default ProfileItem;
