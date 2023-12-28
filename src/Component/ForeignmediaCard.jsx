import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "../Services/api";
import { useLocation } from "react-router-dom";

export default function ForeignmediaCard(props) {
  let {state: {id}} = useLocation();
  const [data, setData] = useState([]);
  const [title,setTitle]=useState({})
  // console.log('mytitle',title)
  const [showMore, setShowMore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(id);
        const responseData = response.data;
   setTitle(responseData.data)
        // Set data and initialize showMoreStates
        setData(responseData.data.items);
        setShowMore(Array(responseData.data.items.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleShowMoreToggle = (index) => {
    const newShowMoreStates = [...showMore];
    newShowMoreStates[index] = !newShowMoreStates[index];
    setShowMore(newShowMoreStates);
  };

  // Group articles by articleSection identifier
  const groupedData = data.reduce((acc, article) => {
    const sectionIdentifier = article.articleSection.name;
    if (!acc[sectionIdentifier]) {
      acc[sectionIdentifier] = [];
    }
    acc[sectionIdentifier].push(article);
    return acc;
  }, {});
  // console.log("MYgroupdat", groupedData);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center col-md-12 col-lg-12 col-sm-12">
            <h2 className=" fw-bold fs-1">
           {title.name}
            </h2>
            <h5>{title.date}</h5>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {Object.keys(groupedData).map((sectionIdentifier) => (
          <div key={sectionIdentifier}>
            <h2 className="fw-bold main-color">{sectionIdentifier}</h2>
            <div className="row">
              {groupedData[sectionIdentifier].map((elem, index) => (
                <div
                  className="col-md-4 col-lg-4 col-sm-12 col-12 mb-3"
                  key={index}
                >
                  <div className="card p-3">
                    <img src={elem.image} alt="" className="img-fluid " />

                    <h5 className="fs-5 fw-bold pt-2">{elem.headline}</h5>
                    <p className="title pt-2 fs-6">
                      {showMore[index]
                        ? elem.abstract
                        : `${elem.headline.substring(0, 250)}...`}
                      <button
                        className="btn showMore"
                        onClick={() => handleShowMoreToggle(index)}
                      >
                        {showMore[index] ? "Show Less" : "Show More"}
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
