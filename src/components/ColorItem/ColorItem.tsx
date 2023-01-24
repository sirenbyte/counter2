import {
	CardActionArea,
	Card,
	CardMedia,
	Typography,
	CardContent,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IUnknown } from "../../models/IUnknown";
import { MenuListApi } from "../../services/MenuListService";
interface Props {
	id: number;
}

function ColorItem(props: Props) {
	const { id } = props;
	const [colorItem, setColorItem] = useState<IUnknown>();
	const { error, isLoading, data } = MenuListApi.useFetchMenuItemQuery(id);

	useEffect(() => {
		if (!isLoading) {
			setColorItem(data?.data);
		}
	}, [data, id]);

	if (isLoading) {
		return <div>Loading</div>;
	}
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<div
					style={{
						background: `${colorItem?.color}`,
						width: "100%",
						height: 40,
					}}
				/>

				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{colorItem?.name.toUpperCase()}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{colorItem?.pantone_value}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default ColorItem;
