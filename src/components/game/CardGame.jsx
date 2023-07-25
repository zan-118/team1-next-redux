import Image from "next/image";
import Link from "next/link";

export default function CardGame({ Name, id, src, played }) {
  return (
    <div>
      <div className="card w-96 glass text-gray-300">
        <figure className="h-[200px]">
          <Image src={src} width={400} height={100} alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{Name}</h2>
          <p>game played:{played}</p>
          <div>
            <div className="rating rating-md">
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            </div>
          </div>
          <div className="card-actions justify-end">
            <Link href={`/games/${id}`}>
              <button className="btn btn-primary">View More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
