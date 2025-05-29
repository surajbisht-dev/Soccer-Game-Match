import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/matches")
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch matches:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upcoming Soccer Matches
      </h1>
      <ul className="space-y-6">
        {matches.map((match, idx) => (
          <li
            key={idx}
            className="flex items-center space-x-4 p-4 border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={match.thumbnail}
              alt={match.title}
              className="w-24 h-16 object-cover rounded"
              loading="lazy"
            />
            <div>
              <h2 className="text-xl font-semibold">{match.title}</h2>
              <p className="text-gray-600">{match.competition}</p>
              <p className="text-gray-500 text-sm">
                {new Date(match.date).toLocaleString()}
              </p>
              <a
                href={match.matchviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-1 block"
              >
                Watch Highlights
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
