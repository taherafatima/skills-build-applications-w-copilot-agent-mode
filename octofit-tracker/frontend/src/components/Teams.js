import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const backendUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${backendUrl}/api/teams/`;

  useEffect(() => {
    console.log('Teams API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0 fw-bold">👥 Teams</h2>
        <span className="badge rounded-pill bg-light text-dark">{teams.length} teams</span>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3 text-muted">Loading teams...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">{error}</div>
        ) : teams.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p className="mb-0">No teams found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{team.name || '-'}</td>
                    <td>
                      <span className="badge bg-secondary rounded-pill">
                        {Array.isArray(team.members) ? team.members.length : 0}
                      </span>
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

export default Teams;
