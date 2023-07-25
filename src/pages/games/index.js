import LandingPage from "@/layouts/LandingPage";
import BgGames from "../../components/game/BgGames";
import { useEffect, useState } from "react";
import CardGame from "@/components/game/CardGame";

export default function Games({ dataGame }) {
  return (
    <LandingPage>
      <BgGames title="MOST POPULAR GAME">
        {dataGame.map((data) => {
          return (
            <CardGame key={data.id} Name={data.Name} id={data.id} played={data.play_count} src={data.thumbnail_url} />
          );
        })}
      </BgGames>
    </LandingPage>
  );
}

export async function getServerSideProps() {
  let dataGame = [];
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  try {
    const getGameData = await fetch(`${URL_API}/games/rooms`);
    const response = await getGameData.json();
    if (response) {
      dataGame = response?.rooms;
    }
  } catch (error) {
    console.log(error.mssage);
  }
  return {
    props: {
      dataGame,
    },
  };
}
