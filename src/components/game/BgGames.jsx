import BgGame from "../../../public/bggame.jpg";

export default function Games({ children, title }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url(${BgGame.src})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        opacity: "1.5",
      }}
    >
      <div className="items-center justify-center gap-4 grid font-bold text-5xl text-white py-10">{title}</div>
      <div className="flex flex-wrap justify-center	gap-4 pb-10">{children}</div>
    </div>
  );
}
