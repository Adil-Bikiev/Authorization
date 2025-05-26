import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" Component={Dashboard}/>
                <Route path="/signup" Component={Signup}/>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App;
