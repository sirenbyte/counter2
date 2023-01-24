import {
	AppBar,
	Badge,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Menu,
	Tooltip,
	MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { layoutSlice } from "../../store/reducers/LayoutSlice";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { removeUser } from "../../store/reducers/UserSlice";
import useAuth from "../../hooks/use-auth";
interface HeaderProps {
	drawerWidth: number;
}

const settings = ["Profile", "Logout"];
export const Header: React.FC<HeaderProps> = ({ drawerWidth }) => {
	const dispatch = useAppDispatch();
	const { email } = useAuth();
	const { handleDrawerToggle } = layoutSlice.actions;
	const { isMobileOpen } = useAppSelector((state) => state.LayoutReducer);
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<div>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={() => dispatch(handleDrawerToggle(isMobileOpen))}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						style={{ display: "flex", alignItems: "center" }}
						sx={{ display: { md: "flex" } }}
					>
						{email}
						<Tooltip title="Open settings">
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-haspopup="true"
								color="inherit"
								onClick={handleOpenUserMenu}
							>
								<AccountCircle />
							</IconButton>
						</Tooltip>

						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Profile</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									
									handleCloseUserMenu();
									dispatch(removeUser());
								}}
							>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
};
