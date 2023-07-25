import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const LandingPageLayout = dynamic(() => import("@/layouts/LandingPage"), {
    ssr: false,
  });

const Leaderboard = () => {
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

    const handleClick = (e) => {
        console.log(e.target)
      }
    

  return (
    <>
      <LandingPageLayout>
      <div className="board">
        <h1 className="leaderboard">Leaderboard</h1>
        <div id="profile">
          <div className="card">
            <div className="flex">
              <div className="flex">
                <div className="overflow-x-auto">
                  <table className="table table-xs">
                    <tr>
                      <th>USERNAME</th>
                    </tr>
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
              <div className="info">
                <table className="table">
                  <tr>
                    <th>SCORE</th>
                  </tr>
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
              <div className="info">
                <table className="table">
                  <tr>
                    <th>LEVEL</th>
                  </tr>
                </table>
                <table className="table">
                    <tr className="level">
                        <td>Level 9</td>
                    </tr>
                    <tr className="level">
                        <td>Level 5</td>    
                    </tr>
                    <tr className="level">
                        <td>Level 5</td>
                    </tr>
                    <tr className="level">
                        <td>Level 10</td>
                    </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </LandingPageLayout>
    </>
  )
}

export default Leaderboard
