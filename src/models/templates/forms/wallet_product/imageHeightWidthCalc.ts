export const calcHeightWidth = function(fileUpload){

    let imgHeight;
    let imgWidth;
    let image = new Image();
    let reader = new FileReader();

    //Read the contents of Image File.
    reader.readAsDataURL(fileUpload[0]);
    reader.onload = function (e) {
    
      //Initiate the JavaScript Image object.
    
    //   Set the Base64 string return from FileReader as source.
      image.src = e.target.result;
    
      //Validate the File Height and Width.
      image.onload = function () {
        let height = this.height;
        let width = this.width;
        image.height=height;
        image.width=width;
        imgHeight=height
        imgWidth=width
        // console.log({
        //     height,
        //     width
        // })
       
      };
    };

   
    return image

}

export const hexToRgb = (hex) => {
    console.log("Hexa", hex);
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
    return result
      ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
      : "";
  };