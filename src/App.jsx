import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from './ui/AppLayout'
import HeaderComp from './ui/HeaderComp';
import './styles/GlobalStyles.css' 
import JobLayout from './features/jobListings/JobLayout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
                <AppLayout />
            }
          >
            <Route index element={<Navigate replace to="search-jobs" />} />
            <Route path="search-jobs" element={<JobLayout />} />
            {/* <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} /> */}
          </Route>
          {/* <Route path="/" element={<AppLayout />} /> */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <div>hello</div>
    </>
  );
}

export default App
