import {
	TablePagination,
	TableContainer,
	Paper,
	TableHead,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Avatar,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { IUsers } from "../../models/IUsers";
import { UsersApi } from "../../services/UserListService";
import "./UserList.scss";
interface Column {
	id: "avatar" | "first_name" | "last_name" | "email";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{
		id: "avatar",
		label: "avatar",
		minWidth: 30,
	},
	{
		id: "first_name",
		label: "first_name",
		minWidth: 170,
	},
	{
		id: "last_name",
		label: "last_name",
		minWidth: 100,
	},
	{
		id: "email",
		label: "email",
		minWidth: 170,
	},
];
const br = "border-right: 1px solid rgba(224, 224, 224, 1);"
function UserList() {
	const [page, setPage] = React.useState(0);
	const [pageNum, setPageNum] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(6);

	const [userList, setuserList] = React.useState<IUsers[]>([]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
		setPageNum(() => newPage + 1);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(1);
		setPageNum(1);
	};

	const { error, isLoading, data } = UsersApi.useFetchAllUserListQuery(pageNum);

	useEffect(() => {
		if (data?.data) {
			setuserList([...userList, ...data?.data]);
		}
	}, [data]);

	return (
		<div>
			{isLoading && <div>Loading</div>}
			{userList ? (
				<Paper sx={{ width: "100%", overflow: "hidden" }}>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											sx={{
												[`& .${tableCellClasses.root}`]: {
													borderRight:"1px solid rgba(224, 224, 224, 1)",
													borderBottom:"none"
												}
											}}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{userList &&
									userList!
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													{columns.map((column) => {
														const value = row![column?.id!]!;
														return (
															<TableCell key={column.id} align={column.align}>
																{column.id === "avatar" ? (
																	<Avatar alt="avatar" src={value} />
																) : column.id === "first_name" ? (
																	<Link className="link-hover" to={`${row.id}`}>
																		{value}
																	</Link>
																) : (
																	value
																)}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={data?.total!}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			) : (
				<></>
			)}
		</div>
	);
}

export default UserList;
