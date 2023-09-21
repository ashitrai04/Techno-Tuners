import React, { useState, useEffect } from "react";
import "./CircularProgressBar.css";

const SpeedoMeter = ({ targetPercentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < targetPercentage) {
                setProgress((prevProgress) => prevProgress + 1);
            } else if (progress > targetPercentage) {
                setProgress((prevProgress) => prevProgress - 1);
            } else {
                clearInterval(timer);
            }
        }, 50);
    
        return () => {
            clearInterval(timer);
        };
    }, [progress, targetPercentage]);
    

    return (
        <div className="h-screen w-full lg:w-1/2">
            <p className="text-center font-bold text-4xl py-10">Speedometer</p>
            <div className="flex flex-col items-center h-[70vh] w-full relative">
                {/* First SVG */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="#007bff"
                    strokeWidth={3}
                    strokeLinecap="round"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 10
                    }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="progress-bar"
                        style={{
                            strokeDasharray: 251.2,
                            strokeDashoffset: 251.2 - (251.2 * progress) / 270,
                        }}
                    />
                </svg>

                {/* Second SVG */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="#000"
                    strokeWidth={3}
                    strokeLinecap="round"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="progress-bar"
                        style={{
                            strokeDasharray: 251.2,
                            strokeDashoffset: 251.2 - (251.2 * 180) / 270,
                        }}
                    />
                </svg>
                <div className="numbering relative">
                    {/* <p className="text-xl font-bold absolute top-[0.5rem] left-[0rem]">180</p> */}
                    <p className="text-xl text-black font-bold absolute top-[18.5rem] left-[14rem]">170</p>
                    <p className="text-xl text-black font-bold absolute top-[15.5rem] left-[14.5rem]">160</p>
                    <p className="text-xl text-black font-bold absolute top-[12.5rem] left-[14rem]">150</p>
                    <p className="text-xl text-black font-bold absolute top-[9.5rem] left-[13rem]">140</p>
                    <p className="text-xl text-black font-bold absolute top-[6.5rem] left-[11rem]">130</p>
                    <p className="text-xl text-black font-bold absolute top-[3.8rem] left-[8.5rem]">120</p>
                    <p className="text-xl text-black font-bold absolute top-[2rem] left-[6rem]">110</p>
                    <p className="text-xl text-black font-bold absolute top-[1rem] left-[2.5rem]">100</p>
                    <p className="text-xl text-black font-bold absolute top-[0.5rem] left-[0rem]">90</p>
                    <p className="text-xl text-black font-bold absolute top-[1rem] right-[2rem]">80</p>
                    <p className="text-xl text-black font-bold absolute top-[1.5rem] right-[5rem]">70</p>
                    <p className="text-xl text-black font-bold absolute top-[3.5rem] right-[8rem]">60</p>
                    <p className="text-xl text-black font-bold absolute top-[6rem] right-[11rem]">50</p>
                    <p className="text-xl text-black font-bold absolute top-[9rem] right-[13rem]">40</p>
                    <p className="text-xl text-black font-bold absolute top-[12.5rem] right-[14rem]">30</p>
                    <p className="text-xl text-black font-bold absolute top-[16rem] right-[14.5rem]">20</p>
                    <p className="text-xl text-black font-bold absolute top-[19rem] right-[14.5rem]">10</p>
                    {/* <p className="text-xl text-black font-bold absolute top-[18.5rem] left-[13rem]">170</p>
                    <p className="text-xl text-black font-bold absolute top-[15.5rem] left-[13.5rem]">160</p>
                    <p className="text-xl text-black font-bold absolute top-[12.5rem] left-[13.5rem]">150</p>
                    <p className="text-xl text-black font-bold absolute top-[9.5rem] left-[12.5rem]">140</p>
                    <p className="text-xl text-black font-bold absolute top-[6.5rem] left-[11rem]">130</p>
                    <p className="text-xl text-black font-bold absolute top-[3.8rem] left-[8.5rem]">120</p>
                    <p className="text-xl text-black font-bold absolute top-[2rem] left-[6rem]">110</p>
                    <p className="text-xl text-black font-bold absolute top-[1rem] left-[2.5rem]">100</p>
                    <p className="text-xl text-black font-bold absolute top-[0.5rem] left-[0rem]">90</p>
                    <p className="text-xl text-black font-bold absolute top-[1rem] right-[2rem]">80</p>
                    <p className="text-xl text-black font-bold absolute top-[1.5rem] right-[5rem]">70</p>
                    <p className="text-xl text-black font-bold absolute top-[3.5rem] right-[8rem]">60</p>
                    <p className="text-xl text-black font-bold absolute top-[6rem] right-[11rem]">50</p>
                    <p className="text-xl text-black font-bold absolute top-[9rem] right-[12.5rem]">40</p>
                    <p className="text-xl text-black font-bold absolute top-[12rem] right-[13.5rem]">30</p>
                    <p className="text-xl text-black font-bold absolute top-[15rem] right-[13.5rem]">20</p>
                    <p className="text-xl text-black font-bold absolute top-[18rem] right-[13rem]">10</p> */}
                </div>
                <div className="text-5xl text-center font-bold text-black absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    {progress}<br />KM/h
                </div>
            </div>
        </div>
    );
};

export default SpeedoMeter;
