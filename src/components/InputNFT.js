/* Add NFT Input in step 1  */

import React from 'react';
import './InputNFT.css';

function InputNFT({ currentInput, onInputChange, onAddNft }) {
    return (
        <div className="inputNFT-container">
            <input 
                type="text"
                placeholder="Enter NFT URL"
                value={currentInput}
                onChange={onInputChange}
            />
            <button onClick={onAddNft}>Add NFT</button>
        </div>
    );
}

export default InputNFT;