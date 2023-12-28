import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ForwardIcon from "../assets/images/forward.png";
import { get } from "../Services/api";

import Video1 from "../assets/videos/video1.mp4";
import Video2 from "../assets/videos/video2.mp4";
import { useLocation } from "react-router-dom";

export default function VideoPlayer() {
  const [data, setData] = useState([]);
  console.log(data);
  const [showMore, setShowMore] = useState([]);
  let {state: {id}} = useLocation();
// console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`${id}?date=2023-12-24`);
        const responseData = await response.data;

        // Set data and initialize showMoreStates
        setData(responseData.data);
        setShowMore(Array(responseData.data.items.length).fill(false));
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const VideoData = [
    {
      title: "INDIA-USA",
      video: Video1,
      subtitle: "PM Modi On US Allegations Of Murder Plot",
    },
    {
      title: "INDIA-PAK",
      video: Video2,
      subtitle: "PM Modi breaks silence on assassination plot claims by US",
    },
    {
      title: "INDIA-USA",
      video: Video1,
      subtitle: "PM Modi On US Allegations Of Murder Plot",
    },
  ];

  const playerRefs = VideoData.map(() => useRef(null));

  const handleForwardClick = (index) => {
    const player = playerRefs[index].current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10, "seconds");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center col-md-12 col-lg-12 col-sm-12">
            <h2 className=" fw-bold fs-1">{data.name}</h2>
            <h5>{data.date}</h5>
          </div>
        </div>
      </div>
    <div className="container mt-5">
      <div className="row">
        {data.items?.map((elem, index) => (
          <div className="col-md-12 col-12 " key={index}>
            <div className="">
              <h3 className="text-danger">{elem.publisher.name}</h3>
              <ReactPlayer
                playIcon
                loop
                controls={true}
                url={elem.url}
                ref={playerRefs[index]}
              ></ReactPlayer>
              <img
                src={ForwardIcon}
                className="Forward_Icon pb-2 pt-2"
                alt=""
                onClick={() => handleForwardClick(index)}
                style={{ cursor: "pointer" }}
              />
              <div className="">
                <p className="pt-1 fs-4">{elem.headline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
