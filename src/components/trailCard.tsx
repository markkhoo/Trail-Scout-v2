import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./trailCard.css";

type CardProps = {
    id: number;
    name: string;
    difficulty: string;
    rating: number;
}

const TrailCard: FC<CardProps> = ({ id, name, difficulty, rating }) => {
    const difficultyStyle = (x: string) => {
        if (x === "Easiest") {
            return ({
                padding: "0.125em 2em",
                fontWeight: 600,
                borderRadius: "1.5em",
                backgroundColor: "rgb(20,221,240)"
            })
        } else if (x === "Beginner") {
            return ({
                padding: "0.125em 2em",
                fontWeight: 600,
                borderRadius: "1.5em",
                backgroundColor: "rgb(45,247,51)"
            })
        } else if (x === "Intermediate") {
            return ({
                padding: "0.125em 2em",
                fontWeight: 600,
                borderRadius: "1.5em",
                backgroundColor: "rgb(224,210,51)"
            })
        } else if (x === "Advanced") {
            return ({
                padding: "0.125em 2em",
                fontWeight: 600,
                borderRadius: "1.5em",
                backgroundColor: "rgb(247,148,45)"
            })
        } else if (x === "Expert") {
            return ({
                padding: "0.125em 2em",
                fontWeight: 600,
                borderRadius: "1.5em",
                backgroundColor: "rgb(240,41,70)"
            })
        } else {
            return ({ textDecoration: "none" })
        }
    }

    const ratingToPercent = (x: number) => {
        const result: number = (x * 20) - 100;
        return `${result}%`
    }

    return (
        <div className="trailCard">
            <h3>{name}</h3>
            <div style={{ display: "inline-block" }}>
                <p style={difficultyStyle(difficulty)}>{difficulty}</p>
                <div className="rating-bar">
                    <span
                        className="bar"
                        style={{ transform: `translate(${ratingToPercent(rating)},0px)` }}
                    />
                    <p className="rating-bar-text">Rating: {rating}</p>
                </div>
                <Link
                    className="trailCard-link"
                    to={`/trail/${id}`}
                >Details</Link>
            </div>
        </div>
    )
}

export default TrailCard;