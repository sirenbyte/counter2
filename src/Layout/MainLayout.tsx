import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../Pages/Header/Header";
import SideBar from "../Pages/SideBar/SideBar";
import { RoutesComponent } from "../Routes";
import useAuth from "../hooks/use-auth";
import { useEffect } from "react";
import { checkAuth, setUser } from "../store/reducers/UserSlice";
import { useAppDispatch } from "../hooks/redux";

interface MainLayoutProps {
	children?: any;
	className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
	children,
	className,
}) => {
	const drawerWidth = 240;

	const { isAuth } = useAuth();
	
	return isAuth ? (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Header drawerWidth={drawerWidth} />
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					<SideBar drawerWidth={drawerWidth} />
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<Outlet />
				</Box>
			</Box>
		</>
	) : (
		<Navigate to="sign-in" />
	);
};
