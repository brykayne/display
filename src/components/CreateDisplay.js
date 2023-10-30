import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './CreateDisplay.css';
import InputNFT from './InputNFT'; 
import NFTCard from './NFTCard';
import NFTCardList from './NFTCardList';
import DisplayDetails from './DisplayDetails';


function CreateDisplay() {
    const [currentInput, setCurrentInput] = useState("");
    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [step, setStep] = useState(1);

    async function fetchNftMetadata(url) {
        try {
            const match = url.match(/\/assets\/(arbitrum|ethereum)\/(0x[a-fA-F0-9]{40})\/(\d+)/);
            if (!match) {
                throw new Error("Invalid OpenSea URL.");
            }
    
            const chain = match[1];
            const address = match[2];
            const identifier = match[3];
            const apiUrl = `https://api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts/${identifier}`;
    
            const headers = {
                'X-API-KEY': 'dbfccf66fe42489882e5cd2bb0706944'
            };
    
            const response = await axios.get(apiUrl, { headers: headers });
            
            // Parse the details from the response
            const asset = response.data.nft;
            const name = asset.name || "Unnamed NFT";
            const imageUrl = asset.image_url || "";    
            return {
                name: name,
                image: imageUrl,
            };
        } catch (error) {
            console.error("Error fetching NFT metadata:", error);
            return null;
        }
    }
    
    

    async function addNftToCard() {
        if (currentInput.trim() === "" || cards.length >= 8) return;
        const metadata = await fetchNftMetadata(currentInput);
        if (metadata) {
            const newCard = {
                id: uuidv4(),
                url: currentInput,
                name: metadata.name,
                image: metadata.image,
            };
            setCards((prevCards) => [newCard, ...prevCards]);
            setCurrentInput(""); // Clear the input after adding
        }
    }

    function nextStep() {
        if (step === 1 && cards.length <= 8) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
        // Add conditions for further steps
    }

    function prevStep() {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    function handleInputChange(e) {
        setCurrentInput(e.target.value);
    }

    return (
        <div className="input-container">
        {step === 1 && (
            <>
                <InputNFT 
                    currentInput={currentInput} 
                    onInputChange={handleInputChange}
                    onAddNft={addNftToCard}
                />
                <div className="counter">{cards.length}/8 NFTs added</div>
                <NFTCardList cards={cards} />
                {(cards.length <= 8) && <button onClick={nextStep}>Next Step</button>}
            </>
        )}

            {step === 2 && (
                <DisplayDetails 
                    title={title}
                    description={description}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    onDescriptionChange={(e) => setDescription(e.target.value)}
                    onPrev={prevStep}
                    onNext={nextStep}
                />
            )}
            
            {step === 3 && (
                <>
                    {/* Code for step 3, like choosing display style */}
                </>
            )}
        </div>
    );
}

export default CreateDisplay;
