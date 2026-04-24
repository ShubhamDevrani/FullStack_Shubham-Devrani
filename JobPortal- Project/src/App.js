import React, { useState } from 'react';
import Form from './Form';

function Home({ jobs, navigate }) {
  return (
    <>
      <header>
        <div className="container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Job<span>Hunt</span></a>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Find Jobs</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Companies</a>
            <a href="#" className="post-button" onClick={(e) => { e.preventDefault(); navigate('post-job'); }}>Post a Job</a>
          </nav>
        </div>
      </header>

      <section className="banner">
        <div className="container">
          <h1>Find The Best Job For Your Future</h1>
          <p>Search over 100,000 jobs from top companies</p>

          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Job Title, Keywords..." />
            <select>
              <option>Location</option>
              <option>New York</option>
              <option>Remote</option>
            </select>
            <select>
              <option>Category</option>
              <option>Tech</option>
              <option>Design</option>
            </select>
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="section-padding">
        <div className="container text-center">
          <h2>Browse by Categories</h2>
          <div className="skill-grid">
            <div className="skill-card">
              <span className="icon"></span>
              <h4>Development</h4>
              <p>1200+ Jobs</p>
            </div>
            <div className="skill-card">
              <span className="icon"></span>
              <h4>Marketing</h4>
              <p>800+ Jobs</p>
            </div>
            <div className="skill-card">
              <span className="icon"></span>
              <h4>Design</h4>
              <p>500+ Jobs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="text-center">Recent Jobs</h2>

          <div id="jobList">
            {jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-details">
                  <div className="company-logo">{job.company.charAt(0).toUpperCase()}</div>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company} || {job.location}</p>
                  </div>
                </div>
                <div className="job-actions">
                  <a href="#" className="apply-btn" onClick={(e) => e.preventDefault()}>Apply Now</a>
                  <div className="job-type">{job.type}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2023 JobPortal. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

function App() {
  // Simple state-based routing instead of React Router to keep it as simple as possible
  const [currentPage, setCurrentPage] = useState('home');

  // Shared jobs state initialized with data fetched from Spring Boot backend
  const [jobs, setJobs] = useState([]);

  React.useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const addJob = (newJob) => {
    setJobs([newJob, ...jobs]); // Adds the new job to the top of the list
    setCurrentPage('home'); // Redirects back to the home page seamlessly
  };

  return (
    <div className="App">
      {currentPage === 'home' && <Home jobs={jobs} navigate={setCurrentPage} />}
      {currentPage === 'post-job' && <Form addJob={addJob} navigate={setCurrentPage} />}
    </div>
  );
}

export default App;