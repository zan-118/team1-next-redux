import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function CustomFooter() {
  return (
    <footer>
      <div style={{ height: "300px", width: "99vw", backgroundColor: "#0C090A" }}>
        <div className="grid grid-cols-5 pt-20 pr-32 text-white">
          <div></div>
          {/* part 1 */}
          <div style={{ width: "200px" }}>
            <div className="flex gap-2 pb-4 text-xl font-bold">
              <div style={{ color: "green" }}>Alpha</div>
              <div>Centaury</div>
            </div>
            <p>Wicodus is a online store where you can find digital goods at the best Games.</p>
          </div>
          {/* part 2 */}
          <div style={{ width: "200px" }}>
            <div className="pb-4 text-xl font-bold">Menu</div>
            <p>
              <a href="/home">Home</a>
            </p>
            <p>
              <a href="/about">About Us</a>
            </p>
            <p>
              <a href="/games">Games</a>
            </p>
          </div>
          {/* part 3 */}
          <div style={{ width: "200px" }}>
            <div className="pb-4 text-xl font-bold">Community</div>
            <p>Our Team</p>
            <p>Career</p>
            <p>Contact Us</p>
          </div>
          {/* part 4 */}
          <div style={{ width: "250px" }}>
            <div className="pb-4 text-xl font-bold">Adress</div>
            <p>Jl. Damar, Pademangan Timur, Kec. Pademangan, Jakarta Utara, Daerah Khusus Ibukota Jakarta 14410</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
