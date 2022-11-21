import { fileUpload } from '@/utils/common_upload_image';
import { calcHeightWidth } from './imageHeightWidthCalc';


export const productTemplate = [
    {
      title: 'Upload Product Banner',
      type: 'file',
      name: 'Upload Product Banner',
      filePath: '',
    //   startIcon:<UploadFileTwoToneIcon />,
      collectionName: 'category',
      accept: 'image/jpeg,image/png',
      validationProps: {
        required: {
          value: true,
          message: 'You need to upload banner'
        },
  
        validate: {
          checkItem:(files)=>{
            console.log(files)
            if(files===undefined){
              return "value is not passed"

            }
          },
          lessThan10MB: (files) => (files&&files.length===0)?true:(files[0]?.size < 1*1000*1024 || 'Max limit 2MB'),
          imgName: (files) => files&&files.length===0?true:files[0]?.name.length < 30 || 'Max image name lenth is 30 only',
          imageDimension: async function(files) {
            if(files&&files.length){
              const result =  await calcHeightWidth(files);
              return (result.width < 500 )||( result.height < 500 )|| "Max image Dimensions 500px X 500px"
            }else{
              return true
            }
          },

       
          
        },
        onChange: async function (e){
          
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          productTemplate[0].filePath = `${s3Detail.path}`;
        }
      }
    },
  
    {
      title: 'Product',
      type: 'text',
      name: 'name',
      placeholder: 'Enter the product name',
    //   startIcon: <InventoryTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Product name is required'
        },
        maxLength: {
          value: 40,
          message: 'Please enter max 40 characters'
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
      title: 'Price',
      type: 'number',
      name: 'price',
      placeholder: 'Enter the price',
    //   startIcon: <CurrencyRupeeTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Price is required'
        },
        pattern: {
          value: /^[a-z0-9 %]+$/i,
          message: 'Special characters not allowed'
        },
        min: {
          value: 1,
          message: 'Minimum price can be of 1 figure'
        },
  
        max: {
          value: 1000000,
          message: 'Maximum price can be of 7 figures'
        }
      }
    },
    {
      title: 'Attribute',
      type: 'text',
      name: 'attribute',
      placeholder: 'Enter the attribute',
    //   startIcon: <AttributionTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Attribute is required'
        },
        pattern: {
          value: /^[a-z0-9 %]+$/i,
          message: 'Special characters not allowed'
        },
        minLength: {
          value: 1,
          message: 'Please enter min 1 characters'
        },
        maxLength: {
          value: 10,
          message: 'Please enter max 10 characters'
        }
      }
    },
    {
      title: 'Value',
      type: 'text',
      name: 'value',
      placeholder: 'Enter the value',
    //   startIcon: <HandshakeTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Value is required'
        },
        pattern: {
          value: /^[1-9]$|^[1-1][0-9]$|^2[0-5]$/,
          message: 'Between 1-25 digits allowed only'
        },
  
        validate: {
          // Char :    (e)=> (getValues(values) < 1 || getValues(values) > 25)  || 'Between 1-25 digits allowed only'
        },
        minLength: {
          value: 1,
          message: 'Please enter min 1 characters'
        },
        maxLength: {
          value: 2,
          message: 'Please enter max 2 characters'
        }
      }
    },
    {
      title: 'Order',
      type: 'text',
      name: 'order_number',
      placeholder: 'Enter the order',
    //   startIcon: <FactCheckTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Order is required'
        },
  
        minLength: {
          value: 1,
          message: 'Please enter min 1 characters'
        },
        pattern: {
          value: /^[1-9]$|^[1-9]\d$|^10[0-0]$/,
          message: 'Between 1-100 allowed only'
        },
        maxLength: {
          value: 3,
          message: 'Please enter max 3 characters'
        }
      }
    },
    {
      title: 'Website URL',
      type: 'text',
      name: 'url',
      placeholder: 'Ex - https://www.google.com',
    //   startIcon: <LanguageTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Website URL is required'
        },
  
        pattern: {
          value:
            /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
          message: 'Invalid Website URL'
        }
      }
    }
  ]