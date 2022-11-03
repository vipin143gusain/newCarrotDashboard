import { fileUpload } from '@/utils/common_upload_image';
import { calcHeightWidth } from '../wallet_product/imageHeightWidthCalc';



export const carrotSubCategoryTemplate = [
    {
        title: 'Name',
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        validationProps: {
          required: {
            value: true,
            message: 'Name is required'
          },
          maxLength: {
            value: 20,
            message: 'Please enter max 20 characters'
          },
          minLength: {
            value: 3,
            message: 'Please enter min 3 characters'
          },
    
          pattern: {
            value: /^[a-zA-Z0-9- &]*$/,
            message: 'Special characters not allowed'
          }
        }
      },
    {
      title: 'Image',
      type: 'file',
      filePath: '',
      name: 'small_image_key',
      collectionName: 'subcategory',
      accept: 'image/jpeg,image/png',
      validationProps: {
        required: {
          value: true,
          message: 'You need to upload banner'
        },
  
        validate: {
          // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
          lessThan10MB: (files) => files[0]?.size < 1*1000*1024 || 'Max limit 5MB',
          imgName: (files) => files[0]?.name.length < 30 || 'Max image name lenth is 30 only',
          imageDimension: async function(files) {
            const result =  await calcHeightWidth(files);
            return (result.width < 500 )||( result.height < 500 )|| "Max image Dimensions 500px X 500px"
          },
          uploadFile:async (files) => {
            const s3Detail = await fileUpload(
              files[0],
              'category',
              'images',
              ''
            );
            carrotSubCategoryTemplate[1].filePath = `${s3Detail.path}`;
          }
          
        },
        
        // onChange: async (e) => {
        //   // const s3Detail = await fileUpload(
        //   //   e.target.files[0],
        //   //   'category',
        //   //   'images',
        //   //   ''
        //   // );
        //   // categoryTemplate[0].filePath = `${s3Detail.path}`;
        // }
      }
    },
    {
      title: 'Image Banner',
      type: 'file',
      filePath: '',
      name: 'banner_image_key',
      collectionName: 'subcategory',
      accept: 'image/jpeg,image/png',
      validationProps: {
        required: {
          value: function(){
            return carrotSubCategoryTemplate[2].filePath?false:true
          },
          message: 'You need to upload banner'
        },
  
        validate: {
          // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
          lessThan10MB: (files) => files[0]?.size < 1*1000*1024 || 'Max limit 5MB',
          imgName: (files) => files[0]?.name.length < 30 || 'Max image name lenth is 30 only',
          imageDimension: async function(files) {
            const result =  await calcHeightWidth(files);
            return (result.width < 500 )||( result.height < 500 )|| "Max image Dimensions 500px X 500px"
          },
          uploadFile:async (files) => {
            const s3Detail = await fileUpload(
              files[0],
              'category',
              'images',
              ''
            );
            carrotSubCategoryTemplate[2].filePath = `${s3Detail.path}`;
          }
          
        },
        
      }
    },
    {
      title: 'Select Category',
      type: 'select',
      name: 'category_ids',
      id: 'category',
      multiple: true,
      select: 'select',
      defaultValue: 'CATEGORY',
      label: 'Select Category',
      validationProps: {
        required: {
          value: true,
          message: 'Category is required'
        }
      },
      options:[{id:1,name:'cat 1'},{id:2,name:'cat 2'}],
      placeholder: 'Ex - https://www.google.co.in'
    },
  
    {
      title: 'Display Order',
      type: 'text',
      multiple:false,
      name: 'display_order',
      placeholder: 'Enter the display order',
      validationProps: {
        required: {
          value: true,
          message: 'Display Order is required'
        },
        pattern: {
          value: /^[1-9]$|^[1-9]\d$|^10[0-0]$/,
          message: 'Between 1-100 allowed only'
        },
        minLength: {
          value: 1,
          message: 'Please enter min 1 characters'
        },
        maxLength: {
          value: 100,
          message: 'Please enter max 100 characters'
        }
      },
    },
    {
      title: 'Status',
      type: 'select',
      multiple:false,
      name: 'is_active',
      placeholder: 'Enter the display order',
      // validationProps: {
      //   required: {
      //     value: true,
      //     message: 'Display Order is required'
      //   },
      //   pattern: {
      //     value: /^[1-9]$|^[1-9]\d$|^10[0-0]$/,
      //     message: 'Between 1-100 allowed only'
      //   },
      //   minLength: {
      //     value: 1,
      //     message: 'Please enter min 1 characters'
      //   },
      //   maxLength: {
      //     value: 100,
      //     message: 'Please enter max 100 characters'
      //   }
      // },
      options:["Active","InActive"]
    },
  ];


  function checkFIlePath(index){
    if(carrotSubCategoryTemplate[index].filePath){
      return true
    }else{
      return false
    }
  }

