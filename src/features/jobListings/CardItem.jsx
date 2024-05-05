import React, { useState } from "react";
import Tag from "../../ui/Tag";
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
        <img
          className="card-image"
          src={job.logoUrl || "/CompanyDefault.png"}
          alt={job.companyName || "companyTitle"}
        />
        <div className="company-info">
          <div>{job.companyName}</div>
          <div className="job-role">{capitalize(job.jobRole) || " "}</div>
          <div className="job-location">{capitalize(job.location) || " "}</div>

          {/* Render either truncated or full job details based on showFullDetails state */}
        </div>
      </div>
      {job.minJdSalary && job.maxJdSalary && (
        <div className="job-salary">
          Estimated Salary: ₹{job.minJdSalary} - {job.maxJdSalary}{" "}
          {job.salaryCurrencyCode} ✅
        </div>
      )}
      {job.jobDetailsFromCompany && (
        <>
          <div className="job-about-company">About Company:</div>
          <div className="job-about-us">About Us</div>
          <p className="job-about">
            {job.jobDetailsFromCompany.slice(0, 300) + "..."}
            {
              <button className="viewmore-button" onClick={toggleFullDetails}>
                View Job
              </button>
            }
          </p>
        </>
      )}

      {job.minExp && (
        <>
          <div className="job-minExp">Minimum Experience</div>
          <div className="job-minExp-value">{job.minExp} years</div>
        </>
      )}

      <Button color={"black"} type={"easy-apply"}>
        ⚡ Easy Apply
      </Button>
      <Button backgroundColor={"blue"}>
        <span className="image-span">
          <img className="profile-image" src="/Profile 1.jpg"></img>
          <span className="green-circle"></span>
        </span>
        <span className="image-span">
          <img className="profile-image" src="/Profile 2.jpg"></img>
          <span className="green-circle"></span>
        </span>
        Unlock Referral asks
      </Button>
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
