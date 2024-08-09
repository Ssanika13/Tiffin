// import React from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Blogs from "./Pages/Blogs";
// import Contact from "./Pages/Contact";
// // import NoPage from "./Pages/NoPage";
// import Layout from "./Pages/Layout";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout  />}>
//           <Route index element={<Home />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           {/* <Route path="nopage" element={<NoPage />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Layout';
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
           </Route>
      </Routes>
    </Router>
  );
}

export default App;

