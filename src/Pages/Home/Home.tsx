import React, {useEffect, useRef, useState} from "react";
import useAuth from '../../hooks/use-auth'
import axios from "axios";

function Home() {
	const {email} = useAuth()
	const socket = useRef()
	const [tableData, setTableData] = useState()
	useEffect(()=>{
		console.log("issue")
		const ws = new WebSocket('ws://10.0.10.42:8080/topic/new')
		ws.onopen = () =>{
			console.log("wbsocket connected")
		}
		ws.onmessage = (mes) =>{
			console.log(mes.data)
		}
	},[])
	useEffect(()=>{
		axios.get('http://10.0.10.42:8080/history').then((value)=>{
			console.log(value)
		})
	},[])
	return <div>

	</div>;
}

export default Home;
