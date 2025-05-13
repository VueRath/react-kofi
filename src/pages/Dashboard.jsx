const Dashboard = () => {
    return (
      <div className="min-h-screen bg-[#f3efe6] p-6">
        <header className="bg-white shadow p-4 flex justify-between items-center rounded">
          <h1 className="text-xl font-bold">☕ Coffee Dashboard</h1>
          <button className="bg-brown-700 text-white px-4 py-2 rounded hover:bg-brown-800">Logout</button>
        </header>
  
        <main className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded shadow">☕ Orders Today</div>
          <div className="bg-white p-4 rounded shadow">📦 Inventory Status</div>
          <div className="bg-white p-4 rounded shadow">👥 Customer Feedback</div>
        </main>
      </div>
    );
  };
  
  export default Dashboard;
  