
import axios from "axios";
import imageCompression from "browser-image-compression";

export const fileUpload = async (
    file,
    collection_name,
    file_type,
    media_type = "image"
  ) => {
    //add image info to backend and get S3 path
    let name = file ? file["name"].split(".")[0] : null;
    let type = file ? file["type"] : null;
    const API_ROOT = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    if (name && name.length > 30) {
      return { error: `${name} should be maximum 30 characters` };
    }
    let payload = {
      collection_name: collection_name,
      file_name: name,
      mime_type: type,
      file_type: file_type,
    };
  
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      let res = await axios({
        url: `${API_ROOT}api/uploads/file`,
        method: "post",
        headers: headers,
        data: payload,
      });
  
      if (res.status == 200) {
        let s3Details = res.data.data;
        let url = s3Details.signedUrl;
        headers["Content-Type"] = type;
  
        if (media_type === "image") {
          console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
          let options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
  
          try {
            let compressedFile = await imageCompression(file, options);
  
            console.log(
            //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
  
            file = compressedFile;
          } catch (error) {
            console.log(error);
            return error;
          }
        }
  
        let formData = new FormData();
        formData.append("file", file);
  
        let s3Res = await axios({
          url: url,
          method: "put",
          headers: headers,
          data: file,
        });
  
        if (s3Res.status == 200) {
          s3Details.error = "";
          console.log("upload successful to s3 ", s3Details);
          return s3Details;
        }
      }
    } catch (error) {
    //   console.log("error while image upload : ", errorMessage(error));
      return { error: error.message };
    }
  };