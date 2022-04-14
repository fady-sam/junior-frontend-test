import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      {/* <nav>
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav> */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function NotFound() {
  return <h1>NotFound</h1>;
}

function Teams() {
  return (
    <>
      <h1>Teams</h1>
      <Outlet />
    </>
  );
}
function Team() {
  return <h1>Team</h1>;
}
function NewTeamForm() {
  return <h1>NewTeamForm</h1>;
}
function LeagueStandings() {
  return <h1>LeagueStandings</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

export default App;
