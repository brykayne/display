import React from 'react';
import './NFTCard.css';

function NFTCard({ image, name, description, url }) {
    return (
        <div className="card">
            <img src={image} alt={name} className="card-image" />
            <h3>{name}</h3>
            <p>Created by: {description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">View on OpenSea</a>
        </div>
    );
}

export default NFTCard;