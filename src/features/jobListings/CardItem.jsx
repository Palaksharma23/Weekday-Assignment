import React, { useState } from "react";
import Tag from "../../ui/Tag";
import AboutCompany from "./AboutCompany";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import "../../styles/CardItem.css"

function CardItem({ job }) {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const toggleFullDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  return (
    <div className="card">
      <Tag type="Primary">{job.companyName}</Tag>
      <div>
        <div>
          <img src={job.logoUrl} alt={job.companyName} />
        </div>
        <div>
          <p>{job.jobRole}</p>
          {/* Render either truncated or full job details based on showFullDetails state */}
          <p>
            {job.jobDetailsFromCompany.slice(0, 100) + "..."}
            {<button onClick={toggleFullDetails}>View More</button>}
          </p>
        </div>
      </div>
      <p>{job.location}</p>
      <p>
        Estimated Salary: {job.minJdSalary} - {job.maxJdSalary}{" "}
        {job.salaryCurrencyCode} 🎫
      </p>
      <AboutCompany />
      <Button>Easy Apply</Button>
      <Button>Unlock Referral asks</Button>
      {/* Render modal only if showFullDetails is true */}
      {showFullDetails && (
        <>
          <Modal onClose={toggleFullDetails}>
            <p>{job.jobDetailsFromCompany}</p>
          </Modal>
        </>
      )}
    </div>
  );
}

export default CardItem;
