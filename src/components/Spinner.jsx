import React from 'react';
import spinner from "../assets/loader.svg"

export default function Spinner() {
    return (
        <div className="spinner-loader">
            <img src={spinner} alt="Loading..." />
        </div>
    )
}
