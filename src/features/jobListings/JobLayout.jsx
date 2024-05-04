import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import Filter from "../../ui/Filter";
import "./../../styles/JobLayout.css";
import "./../../styles/Filter.css";

function JobLayout() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filterOptions, setFilterOptions] = useState([]);

  const handleScroll = () => {
    const scrollThreshold = 100; // Adjust as needed
    const scrolledToBottom =
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - scrollThreshold;

    if (scrolledToBottom) {
      console.log("Reached bottom of page");
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("running....");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10,
          offset: page * 10, // Adjust offset based on page
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        const newJobs = data.jdList;
        console.log("hi", newJobs);
        setJobs((prevJobs) => [...prevJobs, ...newJobs]); // Append new jobs to existing jobs
        setIsLoading(false); // Set loading state to false

        // Extract unique filter options from the data
        const options = {};
        newJobs.forEach((job) => {
          Object.keys(job).forEach((key) => {
            if (
              key !== "jdUid" &&
              key !== "jdLink" &&
              key !== "logoUrl" &&
              key != "jobDetailsFromCompany" &&
              key != "salaryCurrencyCode" &&
              key != "maxJdSalary" &&
              key != "maxExp"
            ) {
              if (!options[key]) {
                options[key] = new Set();
              }
              if (job[key]) options[key].add(job[key]);
            }
          });
        });

        // Add static filter options
        options["type"] = new Set(["Remote", "Onsite"]);
        options["techStack"] = new Set(["React", "Vue", "Angular"]);

        const filterOptions = Object.keys(options).map((key) => ({
          value: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          options: Array.from(options[key]).map((option) => ({
            value: option,
            label: option,
          })),
        }));
        setFilterOptions(filterOptions);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, [page]); // Fetch data whenever page state changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Array to define the order of filters
  const filterOrder = [
    "minExp",
    "companyName",
    "location",
    "type",
    "techStack",
    "jobRole",
    "minJdSalary"
  ];

  console.log("herE", filterOptions);
  return (
    <>
      <div className="filter-container">
        {filterOptions.length !== 0 &&
          filterOrder.map((filterField, index) => {
            const filter = filterOptions.find(
              (option) => option.value === filterField
            );
            console.log("filter", filter);
            return (
              <Filter
                key={index}
                filterField={filter?.value}
                options={filter?.options}
              />
            );
          })}
      </div>
      <div className="jobs-container">
        {jobs.map((job, index) => (
          <CardItem key={index} job={job} />
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default JobLayout;
