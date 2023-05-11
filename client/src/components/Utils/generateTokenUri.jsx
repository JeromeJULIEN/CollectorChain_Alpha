const generateTokenUri = (name, fraction,objectImage,proofOfAuth,proofOfStorage) => {

const URI = {
    "name": name,
    "description": `Unique physical collectible from Collector Chain. Split in ${fraction} fractions, this ${name} could be buy and sell fraction by fraction.  
    Make you collector hobit more sustainable by acquiring real shares of the object instead of the real object, avoiding production pressure  
    [proof of authenticity :] (https://ipfs.io/ipfs/${proofOfAuth}) | [proof of storage :] (https://ipfs.io/ipfs/${proofOfStorage})` ,
    "image": `https://ipfs.io/ipfs/${objectImage}`,
    "attributes": [
        {
            "trait_type": "Name",
            "value": name
        },
        {
            "trait_type": "Fraction",
            "value": fraction.toString()
        }
    ]
}

return URI

}

export default generateTokenUri