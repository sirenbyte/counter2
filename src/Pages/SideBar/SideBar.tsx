import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	Toolbar,
	ListItemIcon,
	ListItemText,
	Drawer,
	Collapse,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { layoutSlice } from "../../store/reducers/LayoutSlice";
import { Link } from "react-router-dom";
import "./SideBar.scss";
import { MenuListApi } from "../../services/MenuListService";
import { IUnknown } from "../../models/IUnknown";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { StarBorder } from "@mui/icons-material";

interface Props {
	window?: () => Window;
	drawerWidth: number;
}

function SideBar(props: Props) {
	const { window, drawerWidth } = props;

	const dispatch = useAppDispatch();

	const { error, isLoading, data } =
		MenuListApi.useFetchAllMenuItemListQuery("");
	const [menuList, setMenuList] = useState<IUnknown[]>();

	const { isMobileOpen } = useAppSelector((state) => state.LayoutReducer);
	const { handleDrawerToggle } = layoutSlice.actions;

	const container =
		window !== undefined ? () => window().document.body : undefined;
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		setMenuList(data?.data);
	}, [data]);

	const drawer = (
		<div>
			<Toolbar>
				<button
					style={{ background: "transparent", border: "none" }}
					onClick={() => dispatch(handleDrawerToggle(isMobileOpen))}
				>
					<Link to="/"></Link>
				</button>
			</Toolbar>
			<Divider />
			<List aria-labelledby="nested-list-subheader">
				<Link
					style={{
						color: "#212121",
						textDecoration: "none",
					}}
					to={"/"}
				>
					<ListItem
						onClick={() => dispatch(handleDrawerToggle(isMobileOpen))}
						disablePadding
					>
						<ListItemButton>
							<ListItemText primary="Таблица" />
						</ListItemButton>
					</ListItem>
				</Link>
				{/*<Link*/}
				{/*	style={{*/}
				{/*		color: "#212121",*/}
				{/*		textDecoration: "none",*/}
				{/*	}}*/}
				{/*	to={"/users"}*/}
				{/*>*/}
				{/*	<ListItem*/}
				{/*		onClick={() => dispatch(handleDrawerToggle(isMobileOpen))}*/}
				{/*		disablePadding*/}
				{/*	>*/}
				{/*		<ListItemButton>*/}
				{/*			<ListItemText primary="Users" />*/}
				{/*		</ListItemButton>*/}
				{/*	</ListItem>*/}
				{/*</Link>*/}
				{/*<ListItemButton onClick={handleClick}>*/}
				{/*	<ListItemText primary="Colors" />*/}
				{/*	{open ? <ExpandLess /> : <ExpandMore />}*/}
				{/*</ListItemButton>*/}
				{/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
				{/*	<List component="div" disablePadding>*/}
				{/*		{menuList?.map((item) => {*/}
				{/*			return (*/}
				{/*				<Link*/}
				{/*					style={{*/}
				{/*						color: "#1976d2",*/}
				{/*						textDecoration: "none",*/}
				{/*					}}*/}
				{/*					key={item.pantone_value}*/}
				{/*					to={item.name.split(" ").join("")}*/}
				{/*				>*/}
				{/*					<ListItem*/}
				{/*						onClick={() => dispatch(handleDrawerToggle(isMobileOpen))}*/}
				{/*						disablePadding*/}
				{/*					>*/}
				{/*						<ListItemButton sx={{ pl: 4 }} className={"button-hover"}>*/}
				{/*							<ListItemText primary={item.name} />*/}
				{/*						</ListItemButton>*/}
				{/*					</ListItem>*/}
				{/*				</Link>*/}
				{/*			);*/}
				{/*		})}*/}
				{/*	</List>*/}
				{/*</Collapse>*/}
			</List>
		</div>
	);
	return (
		<>
			<Drawer
				container={container}
				variant="temporary"
				open={isMobileOpen}
				onClose={() => dispatch(handleDrawerToggle(isMobileOpen))}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</>
	);
}

export default SideBar;
