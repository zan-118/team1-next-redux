import LandingPage from "@/layouts/LandingPage";
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";


const Currentinfo = () => {
	const url = process.env.NEXT_PUBLIC_API_URL;

	const [dataApi, setDataAPI] = useState([]);

	const getAllData = async () => {
		const token = Cookies.get("token");
		const res = await fetch(`${url}/players`, {
		method: "GET",
		headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
		} 
	});
		const listData = await res.json();
		console.log(listData);
		setDataAPI(listData.payload);
	};

	useEffect(() => {
		getAllData();
	}, []);

	return (
		<>
			<LandingPage>
			<div className='board'>
				<h1 className='leaderboard'>Current Info</h1>

				<div id='profile'>
					<div className='card'>
						<div className='flex'>
							<div className='flex'>
								<div className='info'>
									<table className='table'>
										<tbody>
											<tr>
												<th>USERNAME</th>
											</tr>
										</tbody>
									</table>
									{dataApi.map((row, key) => {
										return (
											<table className='table' key=''>
												<tbody>
													<tr key={key}>
														<td> {row.Username}</td>
													</tr>
												</tbody>
											</table>
										);
									})}
								</div>
							</div>
							<div className='info'>
								<table className='table'>
									<tbody>
										<tr>
											<th>EMAIL</th>
										</tr>
									</tbody>
								</table>
								{dataApi.map((row, key) => {
									return (
										<table className='table' key=''>
											<tbody>
												<tr key={key}>
													<td> {row.Email}</td>
												</tr>
											</tbody>
										</table>
									);
								})}
							</div>
							<div className='info'>
								<table className='table'>
									<tbody>
										<tr>
											<th>TOTAL SCORE</th>
										</tr>
									</tbody>
								</table>
								{dataApi.map((row, key) => {
									return (
										<table className='table' key=''>
											<tbody>
												<tr key={key}>
													<td> {row.Total_score}</td>
												</tr>
											</tbody>
										</table>
									);
								})}
							</div>
							<div className='info'>
								<table className='table'>
									<tbody>
										<tr>
											<th>CITY</th>
										</tr>
									</tbody>
								</table>
								{dataApi.map((row, key) => {
									return (
										<table className='table' key=''>
											<tbody>
												<tr key={key}>
													<td> {row.City}</td>
												</tr>
											</tbody>
										</table>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			</LandingPage>
		</>
	);
};

export default Currentinfo;

export const getServerSideProps = ({ req }) => {
	const { token } = req.cookies;
	if (!token) {
	  return {
		redirect: {
		  destination: "/",
		  permanent: false,
		},
	  };
	}
	return {
	  props: {},
	};
  };
  