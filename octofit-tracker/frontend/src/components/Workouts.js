import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    console.log('[Workouts] API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Workouts] fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setWorkouts(normalized);
      })
      .catch((error) => {
        console.error('[Workouts] fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.name} className="list-group-item">
            {workout.name} - {workout.difficulty}: {workout.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
