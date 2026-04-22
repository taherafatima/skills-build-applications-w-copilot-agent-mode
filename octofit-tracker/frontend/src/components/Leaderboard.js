import React, { useEffect, useState } from 'react';

const rankIcon = (idx) => {
  if (idx === 0) return '🥇';
  if (idx === 1) return '🥈';
  if (idx === 2) return '🥉';
  return idx + 1;
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const backendUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${backendUrl}/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0 fw-bold">🏆 Leaderboard</h2>
        <span className="badge rounded-pill bg-light text-dark">{leaders.length} entries</span>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3 text-muted">Loading leaderboard...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">{error}</div>
        ) : leaders.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p className="mb-0">No leaderboard entries found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx} className={idx === 0 ? 'table-warning fw-bold' : ''}>
                    <td>{rankIcon(idx)}</td>
                    <td>{leader.username || leader.name || '-'}</td>
                    <td>
                      <span className="badge bg-primary rounded-pill">{leader.score ?? '-'}</span>
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

export default Leaderboard;
