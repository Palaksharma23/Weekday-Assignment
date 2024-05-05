import React, { useState } from "react";
import Tag from "../../ui/Tag";
import AboutCompany from "./AboutCompany";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import "../../styles/CardItem.css";

function CardItem({ job }) {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const toggleFullDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const capitalize = (word) => {
    const words = word.split(" ");

    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };
  return (
    <div className="card">
      <Tag type="Primary" tag={"Posted 6 days ago"}></Tag>
      <div className="companyinfo-container">
        <img className="card-image" src={job.logoUrl} alt={job.companyName} />
        <div className="company-info">
          <div>{job.companyName}</div>
          <div className="job-role">{capitalize(job.jobRole)}</div>
          <div>{job.location}</div>

          {/* Render either truncated or full job details based on showFullDetails state */}
        </div>
      </div>
      <div>
        Estimated Salary: {job.minJdSalary} - {job.maxJdSalary}{" "}
        {job.salaryCurrencyCode} ✅
      </div>
      <div>About Company</div>
      <div>About Us</div>
      <p className="job-about">
        {job.jobDetailsFromCompany.slice(0, 300) + "..."}
        {
          <button className="viewmore-button" onClick={toggleFullDetails}>
            View More
          </button>
        }
      </p>

      <div>Minimum Experience</div>
      <div>{job.minExp}</div>

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
