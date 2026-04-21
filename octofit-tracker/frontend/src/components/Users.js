import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const backendUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${backendUrl}/api/users/`;

  useEffect(() => {
    console.log('Users API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0 fw-bold">👤 Users</h2>
        <span className="badge rounded-pill bg-light text-dark">{users.length} users</span>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3 text-muted">Loading users...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p className="mb-0">No users found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{user.username || '-'}</td>
                    <td>
                      {user.email
                        ? <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
