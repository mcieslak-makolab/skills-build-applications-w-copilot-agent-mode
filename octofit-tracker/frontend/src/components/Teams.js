import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    console.log('[Teams] API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Teams] fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setTeams(normalized);
      })
      .catch((error) => {
        console.error('[Teams] fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item">
            {team.name}: {team.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
