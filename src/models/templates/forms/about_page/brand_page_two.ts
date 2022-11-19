import { fileUpload } from "@/utils/common_upload_image";
import { calcHeightWidth } from "../wallet_product/imageHeightWidthCalc";


export const BrandPageTwo = 
[
  {
    title: 'Upload Product Logo',
    type: 'file',
    name: 'logo',
    id: 'logo',
    label: 'Logo',
    filePath:"",
    placeholder: 'Image',
    collectionName: 'subcategory',
    rules: {
      required: {
        value: true,
        message: 'You need to upload logo'
      },
      validate: {
          lessThan2MB: (files) => files&&files[0]?.size < 2*1000*1024 || 'Max limit 2MB',
          imgName: (files) => files&&files[0]?.name?.length < 30 || 'Max image name lenth is 30 only',
          imageDimension: async function(files) {              
              const result =  await calcHeightWidth(files);
              return (result.width <= 300 )||( result.height <= 300 )|| "Max image Dimensions 300px X 300px"
            }
          },          
          onChange: async (e) => {
            console.log(e.target.files)
            const s3Detail = await fileUpload(
              e.target.files[0],
              'category',
              'images',
              ''
            );
            BrandPageTwo[0].filePath = `${s3Detail.path}`;
          }
      },
  },

  {
    title: 'Upload Product Banner',
    type: 'file',
    name: 'banner',
    id: 'banner',
    label: 'banner',
    placeholder: 'Image',
    collectionName: 'subcategory',

    rules: {
      required: {
        value: true,
        message: 'You need to upload banner'
      },
      validate: {
        lessThan2MB: (files) => files&&files&&files[0]?.size < 2*1000*1024 || 'Max limit 2MB',
        imgName: (files) => files&&files&&files[0]?.name?.length < 30 || 'Max image name lenth is 30 only',
        imageDimension: async function(files) {              
            const result =  await calcHeightWidth(files);
            return (result.width <= 300 )||( result.height <= 300 )|| "Max image Dimensions 300px X 300px"
          }
        },          
        onChange: async (e) => {
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          BrandPageTwo[1].filePath = `${s3Detail.path}`;
        }
    }
  },

  {
    title: 'Brand Color',
    type: 'text',
    name: 'brand_colour',
    placeholder: 'Ex - #f7f7f7',
    id: 'color',
    label: 'Brand Color',
    rules: {
      required: {
        value: true,
        message: 'Brand color is required'
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
    title: 'Primary Offer',
    type: 'text',
    name: 'primary_offer',
    id: 'primary',
    label: 'Primary Offer',
    placeholder: 'Ex - 10% off',
    rules: {
      required: {
        value: true,
        message: 'Primary offer is required'
      },
      pattern: {
        value: /^[a-z0-9 %]+$/i,
        message: 'Special characters not allowed'
      },
      maxLength: {
        value: 20,
        message: 'Please enter max 20 characters'
      }
    }
  }
];
