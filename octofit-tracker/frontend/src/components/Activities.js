import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    console.log('[Activities] API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Activities] fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setActivities(normalized);
      })
      .catch((error) => {
        console.error('[Activities] fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id || `${activity.user}-${activity.date}`} className="list-group-item">
            {activity.user} - {activity.type} ({activity.duration} min) on {activity.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
