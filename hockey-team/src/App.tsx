import React, { useState } from 'react';
import UserForm from './components/UserForm';
import Table from './components/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  // State to control the visibility of the user form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      {/* Header */}
      <header className="row bg-dark text-light p-3">
        <div className="col-12 col-md-8 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
          <h1 className="mb-0">My Hockey Team</h1>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
          {/* Button to toggle the user form visibility */}
          <button className="btn btn-light" onClick={() => setShowForm(true)}>Add User</button>
        </div>
      </header>

      <br/>

      {/* User Form */}
      {showForm && <UserForm onClose={() => setShowForm(false)} />}

      {/* Table */}
      <div className="table-responsive">
        <Table />
      </div>

    </div>
  );
}

export default App;
