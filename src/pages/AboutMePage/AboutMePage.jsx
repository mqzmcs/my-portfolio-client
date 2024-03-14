import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AboutMePage.css";

function AboutMePage() {
    const [content, setContent] = useState({ topContent: [], bottomContent: [] });

    const getContent = async () => {
        try {
            const response = await axios.get("http://localhost:5005/profilePage");
            setContent(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <>
            <div id="profile-page-top"></div>
            <div className="page-container profile-page-container">
                <hr />
                <h1 className="about-me-headline">
                    Hi! I'm Alfonso and welcome to my portfolio!
                </h1>
                <div className="about-me-container-top">
                    {content.topContent.map((item) => item.type === "image" ? (
                        <div className="profile-image-container-top">
                            <img
                                key={item.id}
                                id="profile-image-top"
                                src={item.imageURL}
                                alt={item.id} />
                        </div>
                    ) : (
                        <div className="about-me-content-container-top">
                            <p
                                key={item.id}
                                className="about-me-body-text">
                                {item.content}
                            </p>
                        </div>
                    )
                    )}
                </div>
                <div className="about-me-container-bottom">
                    {content.bottomContent.map((item) => item.type === "paragraph" ? (
                        <div className="about-me-content-container-bottom">
                            <p
                                key={item.id}
                                className="about-me-body-text">
                                {item.content}
                            </p>
                        </div>
                    ) : (
                        <div className="profile-image-container-bottom">
                            <img
                                key={item.id}
                                id="profile-image-bottom"
                                src={item.imageURL}
                                alt={item.id} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default AboutMePage;