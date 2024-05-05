import React from "react";
import "./../styles/PageNotFound.css";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="box">
        <h1>The page you are looking for could not be found 😢</h1>
        <Button>
          <Link to="/search-jobs">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
