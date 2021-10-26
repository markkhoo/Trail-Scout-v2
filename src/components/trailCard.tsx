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


    return (
        <div className="trailCard">
            <p>{name}</p>
            <p>{difficulty}</p>
            <p>{rating}</p>
            <Link to={`/trail/${id}`}>Details</Link>
        </div>
    )
}

export default TrailCard;