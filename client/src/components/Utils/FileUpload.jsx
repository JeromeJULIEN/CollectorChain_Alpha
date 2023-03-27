import axios from "axios"


export const handleSubmission = async(selectedFile) => {
    
    const formData = new FormData();
    
    formData.append('file', selectedFile)
    
    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      pinataMetadata: {
        name: "AlyraNFT",
      },
      pinataOptions: {
        cidVersion: 0
      }
    })
    formData.append('pinataOptions', options);
    
    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: process.env.REACT_APP_PINATA_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
        }});
        console.log("ipfsHash=>",res.data.IpfsHash)
        return res.data.IpfsHash
    } catch (error) {
      console.log(error);
    }
  };