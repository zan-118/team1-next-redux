import LandingPage from "../../layouts/LandingPage";
import BgGames from "../../components/game/BgGames";
import Image from "next/image";
import Link from "next/link";

export default function GameDetails({ gameDetail }) {
  const isJankenpon = gameDetail.Name === "Jankenpon";

  return (
    <LandingPage>
      <BgGames title={gameDetail.Name}>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <Image src={gameDetail.thumbnail_url} height={700} width={300} alt="alpha centaury games" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{gameDetail.Name}</h2>
            <p>{gameDetail.Description}</p>
            <p>game count: {gameDetail.play_count}</p>
            <div className="card-actions justify-end">
              <Link href={isJankenpon ? gameDetail.Game_url : ""}>
                <button className="btn btn-primary" disabled={!isJankenpon}>
                  {isJankenpon ? "Play Now!! 🥇" : "coming soon 💯"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </BgGames>
    </LandingPage>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  let gameDetail = {};
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  try {
    const getGameData = await fetch(`${URL_API}/games/rooms/${id}`);
    const response = await getGameData.json();
    if (response) {
      gameDetail = response.data;
    }
  } catch (error) {
    console.log(error.mssage);
  }
  return {
    props: {
      gameDetail,
    },
  };
};
