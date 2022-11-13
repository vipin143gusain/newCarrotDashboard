import { fileUpload } from '@/utils/common_upload_image';
import { calcHeightWidth } from '../wallet_product/imageHeightWidthCalc';

export const carrotCategoryTemplate = [
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
          message: 'You need to upload Image'
        },
  
        validate: {
          lessThan10MB: (files) =>{
            console.log(files)
            // return files&&files.length>0&&files[0]?.size < 1*1000*1024 || 'Max limit 2MB'
            if(files&&files.length){
              return files&&files.length>0&&files[0]?.size < 1*1000*1024 || 'Max limit 2MB'
            }else{
              return true
            }
            // return files&&files.length>0&&files[0]?.size < 1*1000*1024 || 'Max limit 2MB'
          } ,
          imgName: (files) =>{
            if(files&&files.length){
              return files[0]?.name.length < 30 || 'Max image name lenth is 30 only'
            }else{
              return true
            }
          },
          imageDimension: async function(files) {
            if(files&&files.length>0){
              const result =  await calcHeightWidth(files);
              return (result.width <= 300 )||( result.height <= 300 )|| "Max image Dimensions 300px X 300px"
            }else{
              return true
            }
          },
        
        },
        
        onChange: async (e) => {

          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          carrotCategoryTemplate[1].filePath = `${s3Detail.path}`;
        },
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
          value: true,
          message: 'You need to upload Image banner'
        },
  
        validate: {
          // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
          lessThan10MB: (files) =>{
            if(files&&files.length>0){
              return files[0]?.size < 1*1000*1024 || 'Max limit 2MB'
            }else{
              return true
            }
          },
          imgName: (files) => {
            if(files&&files.length>0){
              return files[0]?.name.length < 30 || 'Max image name lenth is 30 only'
            }else{
              return true
            }
          },
          imageDimension: async function(files) {
            if(files&&files.length>0){
              const result =  await calcHeightWidth(files);
              return (result.width < 500 )||( result.height < 500 )|| "Max image Dimensions 500px X 500px"
            }else{
              return true
            }
          },
          // uploadFile:async (files) => {
          //   const s3Detail = await fileUpload(
          //     files[0],
          //     'category',
          //     'images',
          //     ''
          //   );
          //   carrotCategoryTemplate[2].filePath = `${s3Detail.path}`;
          // }
          
        },
        onChange: async (e) => {
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          carrotCategoryTemplate[2].filePath = `${s3Detail.path}`;
        }
        
      }
    },
    {
      title: 'Search Banner',
      type: 'file',
      filePath: '',
      name: 'search_image_key',
      collectionName: 'subcategory',
      accept: 'image/jpeg,image/png',
      validationProps: {
        
        required: {
          value: true,
          message: 'You need to upload Search banner'
        },
  
        validate: {
          // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
          lessThan10MB: (files) => {
            if(files&&files.length>0){
              return files[0]?.size < 1*1000*1024 || 'Max limit 2MB'
            }else{
              return true
            }
          },
          imgName: (files) => {
            if(files&&files.length>0){
              return files[0]?.name.length < 30 || 'Max image name lenth is 30 only'
            }else{
              return true
            }
          },
          imageDimension: async function(files) {
            if(files&&files.length>0){
              const result =  await calcHeightWidth(files);
              return (result.width < 500 )||( result.height < 500 )|| "Max image Dimensions 500px X 500px"
            }else{
              return true
            }
          },
          // uploadFile:async (files) => {
          //   const s3Detail = await fileUpload(
          //     files[0],
          //     'category',
          //     'images',
          //     ''
          //   );
          //   carrotCategoryTemplate[3].filePath = `${s3Detail.path}`;
          // }
          
        },
        onChange: async (e) => {
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          carrotCategoryTemplate[3].filePath = `${s3Detail.path}`;
        }
        
      }
    },
  
    {
      title: 'Hexa Code',
      type: 'text',
      name: 'hexa_colour_code',
      placeholder: 'Enter the Hexa Code',
    //   startIcon: <CategoryTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Hexa Code is required'
        },
        pattern: {
          value: /^#([A-F0-9]{6}|[A-F0-9]{6})$/i,
          message: 'Pattern not matched'
        },
        maxLength: {
          value: 7,
          message: 'Please enter max 7 characters'
        }
      }
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