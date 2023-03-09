import clientPromise from "../lib/mongodb";

type Props = {
  movies: any;
};

export default function Movies({ movies }: Props) {
  return (
    <div>
      <h1
        className={
          "border-b-2 my-[20px] py-[20px] text-[24px] font-bold text-center"
        }
      >
        Top 20 Movies of All Time
      </h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie: any) => (
          <li className="flex items-center">
            <h2 className="w-[150px] my-[10px] p-[20px] border-2">
              {movie.title}
            </h2>
            <h3 className="p-[20px]">{movie.metacritic}</h3>
            <p className="p-[20px]">{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}
