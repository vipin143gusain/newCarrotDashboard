export const calcHeightWidth = function(fileUpload){

    let image = new Image();
    let reader = new FileReader();
let val={
  height:0,
  width:0
}


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
        // val.height=height;
        // val.width=width;
        val={
          ...val,
          height,
          width
        }
        // val=JSON.stringify(val);

        // new Promise((resolve,reject)=>{
        //   resolve(val)

        // })
               
      };
    };

  let pr = new Promise((resolve,reject)=>{

    setTimeout(()=>{
      resolve(val)
    },500)
  })
   
    return pr

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