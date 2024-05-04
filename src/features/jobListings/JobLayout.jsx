import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "./../../styles/JobLayout.css";

function JobLayout() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        // Extract the array of jobs from the response
        const newJobs = data.jdList;
        console.log(newJobs);
        setJobs((prevJobs) => [...prevJobs, ...newJobs]); // Append new jobs to existing jobs
        setIsLoading(false); // Set loading state to false
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

  return (
    <div className="jobs-container">
      {jobs.map((job, index) => (
        <CardItem key={index} job={job} />
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default JobLayout;
