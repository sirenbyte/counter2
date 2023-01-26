import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/redux";
import { RoutesComponent } from "./Routes";
import { checkAuth } from "./store/reducers/UserSlice";
import Home from "./Pages/Home/Home";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;


function App() {
	// const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	if (localStorage.getItem("email")) {
	// 		dispatch(
	// 			checkAuth({
	// 				email: localStorage.getItem("email")!,
	// 			})
	// 		);
	// 	}
	// }, []);
	const items: MenuProps['items'] = ['Таблица'].map((key) => ({
		key,
		label: `${key}`,
	}));
	return (
			<Layout style={{height:"100vh"}}>
				<Header className="header">
					<div className="logo" />
					{/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
				</Header>
				<Layout>
					<Sider width={200} style={{ background: "#001529", fontSize:"18px" }}>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{ height: '100%', borderRight: 0  }}
							items={items}
						/>
					</Sider>
					<Layout style={{ padding: '0 24px 24px', overflow: "overlay" }}>
						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,

							}}
						>
							<Home/>
						</Content>
					</Layout>
				</Layout>
			</Layout>
	);
}

export default App;
