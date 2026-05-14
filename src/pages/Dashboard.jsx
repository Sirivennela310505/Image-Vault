import { useEffect, useState } from "react";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("vaultHistory")) || [];

    setHistory(storedHistory);
  }, []);

  const encodedCount = history.filter(
    (item) => item.type === "encode"
  ).length;

  const decodedCount = history.filter(
    (item) => item.type === "decode"
  ).length;

  return (
    <main className="page">
      <section className="section-header">
        <p>Dashboard</p>

        <h1>Security Activity Overview</h1>

        <span>
          Track encoded images, decoded messages, and recent activity.
        </span>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>{encodedCount}</h3>
          <p>Encoded Images</p>
        </div>

        <div className="stat-card">
          <h3>{decodedCount}</h3>
          <p>Decoded Messages</p>
        </div>

        <div className="stat-card">
          <h3>{history.length}</h3>
          <p>Total Activity</p>
        </div>
      </section>

      <section className="activity-card">
        <h2>Recent Activity</h2>

        {history.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          history
            .slice()
            .reverse()
            .map((item, index) => (
              <div key={index} className="history-item">
                <p>
                  <strong>{item.type.toUpperCase()}</strong> —{" "}
                  {item.message}
                </p>

                <span>{item.time}</span>
              </div>
            ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;