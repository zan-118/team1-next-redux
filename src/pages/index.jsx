import LandingPage from "@/layouts/LandingPage";
import Banner from "@/components/Banner";
import PopularGame from "@/components/populargame/PopularGame";

export default function Home() {
  return (
    <LandingPage>
      <Banner />
      <PopularGame />
    </LandingPage>
  );
}
