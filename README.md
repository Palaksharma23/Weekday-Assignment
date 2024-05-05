



<h1 align="center"> Weekday Assignment </h1> 
<p align="center">
  A dynamic React based Job searching app.
</p>

<p align="center">
  <a href="https://weekday-assignment-app.netlify.app/search-jobs">Weekday Assignment
    
  </a>

</p>


## Table of Contents

- [Introduction](#introduction)
- [Important Links](#important-links-related-to-the-project)
- [Technology Used](#technology-used)
- [Features](#features)
- [Screenshots of the project](#screenshots-of-the-project)
- [Top-Level Directory Structure of the project](#top-level-directory-structure)
- [Installation](#installation)


## Introduction

A job searching portal with Infinite scroll feature.

### Important links related to the project
* Deployed Website 👉 https://weekday-assignment-app.netlify.app/search-jobs

## Technology Used

| Technology | Features |
|------------|----------|
| React.js   |  Frontend of the application  |   
| React Hooks   | To manage stateful logic  |   
| Vanilla CSS    |   Styling and formatting the layout of web pages   |   
 
## Features

Features of this app:

* Implements URL based frontend filtering
*  Implements infinite scroll to load additional job listings automatically as the user scrolls down the page
* Ensure the platform is responsive and functions well on various screen sizes, including mobile devices
* Integrate API to fetch job listings with specified limit and offset parameters
* Implement filter options for:
    Minimum experience
    Company name
    Location
    Remote/on-site
    Tech stack
    Role
    Minimum base pay
* Job Cards:
      Display job title
      Display company name
      Display location
      Display job description (limited characters with option to expand into a Modal)
      Display required experience
	  Implement Apply button/link

## Screenshots of the project
<table>
  <tr>
    <td>Job Listing Page</td>
    <td>Job Cards</td>
  </tr>
  <tr>
    <td>
   <img src="https://i.ibb.co/yPwxB5Z/screely-1714929102055.png" border="0">
    </td>
     <td>
<img src="https://i.ibb.co/LxgFZk9/screely-1714929159616.png" border="0"></td>
  </tr>
</table>
<table>
  <tr>
      <td>Filtered Job Cards Listing</td>
          <td>Search Company Name Filter</td>
  </tr>
  <tr>
  <td><img src="https://i.ibb.co/SQwppt0/screely-1714929277017.png" alt="screely-1677925542185" border="0">
</td>
<td>
<img src="https://i.ibb.co/zH9q2CY/screely-1714929372623.png" alt="screely-1677924790571" border="0"></td>
  </tr>
</table>
<table>
  <tr>
      <td>View More Modal</td>
    <td>Page not found</td>
  </tr>
  <tr>
  <td><img src="https://i.ibb.co/6ysHQML/screely-1714929447672.png" alt="screely-1677925542185" border="0">
</td>
    <td>
<img src="https://i.ibb.co/3ShbR62/screely-1714921264006.png" alt="screely-1677924790571" border="0"></td>
  </tr>
</table>

## Top-level directory structure

    
    ├── public              # Contains static assets like images.
    ├── src                 # Contains the source code of the application.
	    ├── features		# Contains feature specific components and logic.
	    ├── pages			# Contains React components representing different pages of the application.
	    ├── services		# Provides services for fetching data from APIs or performing other asynchronous tasks.
	    ├── styles			# Contains stylesheets for styling React components.
	    ├── ui				# Reusable UI components.
	    ├── utils			# Utility functions used across the application.
	    ├── App.jsx			# Main component representing the root of the application.
	    ├── main.jsx		# Entry point for rendering the React application.
    ├── .eslintrc.cjs                   
    ├── .gitignore                   
    ├── index.html                 
    ├── package-lock.json                     
    ├── package.json
    ├── README.md                    
    └── vite.config.js
    
##  Installation

To setup the project on your local environment, follow the given steps:

1. Fork the [Palaksharma23/Weekday-Assignment](https://github.com/Palaksharma23/Weekday-Assignment) repository.
2. Clone the repository:
```
https://github.com/<USERNAME>/Weekday-Assignment.git
```

  Replace the `<USERNAME>` with your GitHub username. 

Install the necessary dependencies

```bash
  npm install
```
To start the server in development mode

```
  npm run dev 
```

Go to `http://127.0.0.1:5173/` to view the website.
<br>
