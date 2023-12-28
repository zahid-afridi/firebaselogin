import React, { useEffect, useState } from "react";
import Icon1 from "../assets/images/icon1.png";
import Icon2 from "../assets/images/icon2.png";
import Icon3 from "../assets/images/icon3.png";
import { get } from "../Services/api";
import { useNavigate } from "react-router-dom";
export default function Card() {
  const navigate = useNavigate();
  const typeUrl = {
    pdf: Icon1,
    pd: Icon2,
    tv: Icon3,
  };

  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("");
        const responseData = response.data;

        // Set data and initialize showMoreStates
        // console.log("hoomefeatchdata", responseData);
        setData(responseData.data);
        // setShowMore(Array(responseData.data.items.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 const handleClick = (data) => {
    if (data.type === "pdf") {
      navigate("/printmedia", { state: { id: data.identifier } });
    } else if (data.type === "pd") {
      navigate("/foreignmedia", { state: { id: data.identifier } });
    } else if (data.type === "tv") {
      navigate("/electronicmedia", { state: { id: data.identifier } });
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {data.map((elem, index) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4  cursor-pointer"
                key={index}
                onClick={() => {
                  handleClick(elem);
                }}
              >
                <div
                  className="card text-center "
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={typeUrl[elem.type]}
                      className="card-img-top img-fluid w-50 mt-2"
                      alt=""
                    />
                    <div className="mt-3">
                      <h5 className="card-title text-capitalize">
                        {elem.name}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
