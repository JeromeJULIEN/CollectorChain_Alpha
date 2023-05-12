import axios from "axios"


export const jsonUpload = async(selectedFile,tokenId,tokenName) => {
    console.log("selected file =>",selectedFile);
    
    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": `collectorChainBeta_id${tokenId}_${tokenName}`,
      },
      "pinataContent": selectedFile
    });

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
        'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_KEY,
      },
      data : data
    };

    
    try{
      const res = await axios(config);
      console.log("ipfsHash =>",res.data.IpfsHash)
      return res.data.IpfsHash
    } catch (error) {
      console.log(error);
    }
  };