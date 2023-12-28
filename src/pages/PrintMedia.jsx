import React from "react";
import Navbar from "../Component/Navbar";
import PrintCard from "../Component/PrintCard";

export default function PrintMedia() {
  return (
    <>
      <Navbar></Navbar>

      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center col-md-12 col-lg-12 col-sm-12">
            <h2 className=" fw-bold fs-1">PRINT 700 ENGLISH (EARLY EDITION)</h2>
            <h5>Wednesday, 20th December 2023</h5>
          </div>
        </div>
      </div> */}

      {/* card area start */}
      <PrintCard></PrintCard>
      {/* card area end */}
    </>
  );
}
