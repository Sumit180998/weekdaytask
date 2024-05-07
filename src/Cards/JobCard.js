// JobCard.js

import React, { useState } from 'react';
import './JobCard.css'; // Importing CSS file

const JobCard = ({ Carddetail }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };
const  { companyName, jobRole, location, minExp, maxExp, minJdSalary, maxJdSalary, logoUrl, jobDetailsFromCompany, jdLink }=Carddetail;
  return (
    <div className="job-card">
      <div className='job-card_header'>
      <div className="company-logo">
        <img src={logoUrl} alt={companyName} />
      </div>
      <div className="job-details">
        <h2>{companyName}</h2>
        <p>{jobRole}</p>
        <p>{location}</p>
        
      </div>
      </div>
      
        <p style={{marginLeft:'15px', fontSize:'15px',fontWeight:'400'}}>Salary: ${minJdSalary} - ${maxJdSalary} USD</p>
     
      <div className="additional-details">
        {/* <p>{jobDetailsFromCompany}</p> */}
        {isCollapsed ? (
        <p style={{fontSize:'20px'}}>
          {jobDetailsFromCompany.slice(0, 150)}
          <span>...</span>
          <button style={{color:'#000', margin:'10px',background:"#fff", padding:'5px', padding:'5px',  borderRadius:"5px"}} onClick={toggleContent}>Read More</button>
        </p>
      ) : (
        <p style={{fontSize:'10px'}}>
          {jobDetailsFromCompany}
          <button style={{color:'#000', margin:'10px',background:"#fff",padding:'5px', borderRadius:"5px", }} onClick={toggleContent}>Read Less</button>
        </p>
      )}
      </div>
      <p style={{marginLeft:'15px', fontSize:'15px',fontWeight:'400'}}>Experience: {minExp} - {maxExp} years</p>
      <button className='butonApply'> <a href={jdLink} target="_blank" rel="noopener noreferrer">Apply Now</a></button>
      
    </div>
  );
};

export default JobCard;
