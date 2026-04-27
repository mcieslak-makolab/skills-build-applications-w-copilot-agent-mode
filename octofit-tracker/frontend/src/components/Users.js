import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const loadUsers = () => {
    console.log('[Users] API endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Users] fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setUsers(normalized);
      })
      .catch((error) => {
        console.error('[Users] fetch error:', error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name || ''} ${user.email || ''} ${user.team || ''}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="card border-0">
      <div className="card-body p-0">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h4 mb-0 text-primary">Users</h2>
          <a href={endpoint} target="_blank" rel="noreferrer" className="link-primary fw-semibold">Open API Endpoint</a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Filter users by name, email, team"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="button" className="btn btn-outline-primary w-100" onClick={loadUsers}>Refresh</button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setQuery('')}>Clear</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="octo-table table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setSelectedUser(user)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && <p className="octo-empty mb-0">No users found for this filter.</p>}

        {selectedUser && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedUser(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-1"><strong>Name:</strong> {selectedUser.name}</p>
                  <p className="mb-1"><strong>Email:</strong> {selectedUser.email}</p>
                  <p className="mb-0"><strong>Team:</strong> {selectedUser.team}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
                </div>
              </div>
            </div>
            <div className="modal-backdrop show octo-modal-backdrop" onClick={() => setSelectedUser(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
