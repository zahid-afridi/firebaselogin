import React, { useState, useEffect } from "react";
import Time from "../assets/images/channel/time.jpg";
import { PrintMedia } from "../PrintMediaData/PrintMedia";
import { get } from "../Services/api";
import { useLocation } from "react-router-dom";
export default function PrintCard() {
  const [data, setData] = useState(PrintMedia);
  const [mydata, setMyMData] = useState({});
  let {state: {id}} = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(id);
        const responseData = await response.data;

        // Set data and initialize showMoreStates
        // console.log(responseData.data.name)
        setMyMData(responseData.data);
        // setShowMore(Array(responseData.data.items.length).fill(false));
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const handleSubmtit = () => {
    window.location.href =
      "https://pmincdn.s3.ap-south-1.amazonaws.com/pdf/pmin-20231222-mea-print-cbf5091a74223e0dd1448a167c018f16.pdf";
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center col-md-12 col-lg-12 col-sm-12">
            <h2 className=" fw-bold fs-1">{mydata.name}</h2>
            <h5>{mydata.date}</h5>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {mydata.items?.map((elem, index) => {
            return (
              
              <div
                className="col-lg-3 col-md-3 col-sm-6 col-12 mb-3"
                key={index}
              >
                <div className="print_Card card d-flex ">
                  <div className="d-flex justify-content-between align-items-center">
                    <img
                      src={elem.publisher.logo}
                      className="Print_img"
                      alt=""
                    />

                    <input class="Checkbox" type="checkbox" value="" />
                  </div>
                  <div className="pt-4">
                    <h3 className="fs-4">{elem.publisher.name}</h3>
                    <p>{elem.headline}</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <i class="fa-solid fa-location-dot"></i>
                    <span className="loction_city">
                      {elem.publisher.address}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary "
          style={{ width: "5.6rem" }}
          onClick={handleSubmtit}
        >
          Sumbit
        </button>
      </div>
    </>
  );
}
