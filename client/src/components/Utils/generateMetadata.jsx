const generateMetadata = (name, fraction,objectImage,proofOfAuth,proofOfStorage,stocker,stockingId,rarity) => {

let rarityToDisplay = ""
    
const setRarityToDisplay = () => {
    if (!rarity) {
        rarityToDisplay = "unknow"
    } else {
        rarityToDisplay = rarity.toString()
    }
}

setRarityToDisplay()

const URI = {
    "name": name,
    "description": `Unique physical collectible from Collector Chain. Split in ${fraction} fractions, this ${name} could be buy and sell fraction by fraction.  
    Make you collector hobit more sustainable by acquiring real shares of the object instead of the real object, avoiding production pressure  
    proof of authenticity : https://ipfs.io/ipfs/${proofOfAuth} | proof of storage : https://ipfs.io/ipfs/${proofOfStorage}` ,
    "image": `https://ipfs.io/ipfs/${objectImage}`,
    "attributes": [
        {
            "trait_type": "Name",
            "value": name
        },
        {
            "trait_type": "Fraction",
            "value": fraction.toString()
        },
        {
            "trait_type": "Stocker",
            "value": stocker
        },
        {
            "trait_type": "Stocking Id",
            "value": stockingId
        },
        {
            "trait_type": "Physical supply",
            "value": rarityToDisplay
        },
    ]
}

return URI

}

export default generateMetadata