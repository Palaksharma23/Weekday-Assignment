import React from "react";
import Tag from "../../ui/Tag";
import AboutCompany from "./AboutCompany";
import Button from "../../ui/Button";

function CardItem({ job }) {
  return (
    <div>
      <Tag type="Primary">{job.companyName}</Tag>
      <div>
        <div>
          <img src={job.logoUrl} alt={job.companyName} />
        </div>
        <div>
          <p>{job.jobRole}</p>
          <p>{job.jobDetailsFromCompany}</p>
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
    </div>
  );
}

export default CardItem;
