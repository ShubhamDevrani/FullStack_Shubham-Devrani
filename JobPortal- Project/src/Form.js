import React, { useState } from 'react';

function Form({ addJob, navigate }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      title,
      company,
      location,
      type,
      description
    };
    
    fetch('http://localhost:8080/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    .then(res => res.json())
    .then(savedJob => {
      addJob(savedJob);
      // Optional: Clear form here
    })
    .catch(err => console.error("Error saving job:", err));
  };

  return (
    <>
      <header>
          <div className="container">
              <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Job<span>Hunt</span></a>
          </div>
      </header>

      <section className="section-padding">
          <div className="container">
              <h2 className="text-center">Post a New Job</h2>

              <div className="form-card">
                  <form id="jobForm" onSubmit={handleSubmit}>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" required />
                      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" required />
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
                      <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Job Type" required />
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" required></textarea>
                      <button type="submit" className="post-button">Submit</button>
                  </form>
              </div>

          </div>
      </section>
    </>
  );
}

export default Form;
