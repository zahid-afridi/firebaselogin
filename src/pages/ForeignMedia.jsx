import React from "react";
import Navbar from "../Component/Navbar";
import ForeignmediaCard from "../Component/ForeignmediaCard";

export default function ForeignMedia(props) {
    //  const id = props.location.state.id;

  // console.log('myapiDATa form home',id)
  return (
    <>
      <Navbar></Navbar>
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center col-md-12 col-lg-12 col-sm-12">
            <h2 className=" fw-bold fs-1">
              MEA NEWS UPDATES 0900 - FOREIGN MEDIA
            </h2>
            <h5>Wednesday, 20th December 2023</h5>
          </div>
        </div>
      </div> */}

      <ForeignmediaCard></ForeignmediaCard>
    </>
  );
}
