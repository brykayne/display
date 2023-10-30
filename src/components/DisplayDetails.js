/* For entering title and description of a Display */

import React from 'react';
import './DisplayDetails.css';

function DisplayDetails({ title, description, onTitleChange, onDescriptionChange, onPrev, onNext }) {
    return (
        <div className="display-details-container">
            <input 
                className="display-details-input"
                type="text"
                maxLength={69}
                placeholder="Enter Title"
                value={title}
                onChange={onTitleChange}
            />
            <textarea 
                className="display-details-textarea"
                maxLength={420}
                placeholder="Enter Description"
                value={description}
                onChange={onDescriptionChange}
            ></textarea>
            <div>
                <button className="display-details-button" onClick={onPrev}>Back</button>
                <button className="display-details-button" onClick={onNext}>Next Step</button>
            </div>
        </div>
    );
}

export default DisplayDetails;
