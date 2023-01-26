import React, {useEffect, useRef, useState} from "react";
import useAuth from '../../hooks/use-auth'
import axios from "axios";
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import {Paper} from "@mui/material";
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
interface ICounter {
	codeCmd: null | string,
	devEui: null| string,
	freq: null| string,
	gatewayId: null| string,
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

const columns: ColumnsType<ICounter> = [
	{   dataIndex: "codeCmd", title: "Код cmd"},
	{   dataIndex: "devEui", title: "DevEui"},
	{   dataIndex: "freq", title: "FREQ"},
	{   dataIndex: "gatewayId", title: "Идентификатор шлюза"},
	{	dataIndex: "nomerShetchika", title: "Номер счетчика"},
	{	dataIndex: "obratniyPotok", title: "Обратный поток"},
	{	dataIndex: "potreblenie", title: "Потребление"},
	{	dataIndex: "rssi", title: "RSSI"},
	{	dataIndex: "signal", title: "Сигнал"},
	{	dataIndex: "statusAlarm", title: "Сигнал тревоги о состоянии"},
	{	dataIndex: "statusShetchika", title: "Статус счетчика"},
	{	dataIndex: "voltageLevel", title: "Уровень напряжения"}
];

function Home() {
	const {email} = useAuth()
	const socket = useRef()
	const [tableData, setTableData] = useState<ICounter[]>([])
	useEffect(()=>{
		const ws = new W3CWebSocket('ws://10.0.10.42:8251/echo/echo')
		ws.onopen = () =>{
			console.log("webSocket connected")
		}
		ws.onmessage = (mes:any) =>{
			const res = JSON.parse(mes.data)
			setTableData((prev)=>[...prev, res])
		}
		return () => {
			ws.close();
		}
	},[])
	useEffect(()=>{
		axios.get<ICounter[]>('http://10.0.10.42:56435/history').then((value)=>{
			setTableData(value.data)
		})
	},[])
	return (
		<Table
				pagination={{
					defaultPageSize: 10
				}}

				dataSource={tableData}
				columns={columns}
			/>
	)
}

export default Home;
