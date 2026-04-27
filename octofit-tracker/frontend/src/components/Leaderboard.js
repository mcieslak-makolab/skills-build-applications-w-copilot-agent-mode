import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    console.log('[Leaderboard] API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Leaderboard] fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setEntries(normalized);
      })
      .catch((error) => {
        console.error('[Leaderboard] fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id || entry.id || entry.user} className="list-group-item d-flex justify-content-between">
            <span>{entry.user}</span>
            <strong>{entry.score}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
