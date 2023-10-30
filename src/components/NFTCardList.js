/*  Purpose: To display all da NFTs  */

import React from 'react';
import NFTCard from './NFTCard';
import './NFTCardList.css';


function NFTCardList({ cards }) {
    return (
        <div className="cards">
            {cards.map((card) => (
                <NFTCard 
                    key={card.id} 
                    image={card.image}
                    name={card.name}
                    description={card.description}
                    url={card.url}
                />
            ))}
        </div>
    );
}

export default NFTCardList;
