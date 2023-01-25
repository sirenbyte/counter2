import React, {useEffect, useRef, useState} from "react";
import useAuth from '../../hooks/use-auth'
import axios from "axios";
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import {
	Avatar,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from "@mui/material";
import {Link} from "react-router-dom";
interface ICounter {
	codeCmd: null | string,
	devEui: null| string,
	freq: null| string,
	gatewayId: null| string,
	id: 1| number,
	nomerShetchika: null| string,
	obratniyPotok: null| string,
	potreblenie: null| string,
	rssi: null| string,
	signal: null| string,
	snr: null| string,
	statusAlarm: null| string,
	statusShetchika: null| string,
	voltageLevel: null| string,
}

interface Column {
	id: "codeCmd"
		| "devEui"
		| "freq"
		| "gatewayId"
		| "nomerShetchika"
		| "obratniyPotok"
		| "potreblenie"
		| "rssi"
		| "signal"
		| "snr"
		| "statusAlarm"
		| "statusShetchika"
		| "voltageLevel";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{
		id: "codeCmd",
		label: "Код cmd",

	},
	{
		id: "devEui",
		label: "DevEui",

	},
	{
		id: "freq",
		label: "FREQ",

	},
	{
		id: "gatewayId",
		label: "Идентификатор шлюза",

	},
	{
		id: "nomerShetchika",
		label: "Номер счетчика",

	},
	{
		id: "obratniyPotok",
		label: "Обратный поток",
	},
	{
		id: "potreblenie",
		label: "Потребление",

	},
	{
		id: "rssi",
		label: "RSSI",

	},
	{
		id: "signal",
		label: "Сигнал",

	},{
		id: "statusAlarm",
		label: "Сигнал тревоги о состоянии",

	},{
		id: "statusShetchika",
		label: "Статус счетчика",

	},{
		id: "voltageLevel",
		label: "Уровень напряжения",

	}
];
function Home() {
	const {email} = useAuth()
	const socket = useRef()
	const [tableData, setTableData] = useState<ICounter[]>([])
	useEffect(()=>{
		console.log("issue")
		const ws = new W3CWebSocket('ws://10.0.10.42:8251/echo/echo')
		ws.onopen = () =>{
			console.log("wbsocket connected")
		}
		ws.onmessage = (mes) =>{
			console.log(mes.data)
		}
	},[])
	useEffect(()=>{
		axios.get<ICounter[]>('http://10.0.10.42:56435/history').then((value)=>{
			setTableData(value.data)
		})
	},[])
	return <div>
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									//style={{ borderRight:"1px solid rgba(224, 224, 224, 1)"}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData
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
												return <TableCell style={{ borderRight:"1px solid rgba(224, 224, 224, 1)"}} key={column.id} align={column.align}>
														{value}
													</TableCell>
											})}
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>

		</Paper>
	</div>;
}

export default Home;
