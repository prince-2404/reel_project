const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
console.log("file size:", fileBuffer.length);
    console.log("file name:", fileName);
    
    
 try {
    const base64File = fileBuffer.toString("base64"); // ✅ convert buffer → base64
    console.log("base64 length:", base64File.length);

    const result = await imagekit.files.upload({
    file: base64File    ,
    fileName: fileName,
  });

  return result;
 } catch (error) {
    console.log("upload error", error);
    throw error
    
 }
}

module.exports = {uploadFile}