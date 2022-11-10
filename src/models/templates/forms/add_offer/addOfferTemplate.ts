import { fileUpload } from "@/utils/common_upload_image";
export const addOfferTemplate = [
    {
      title: 'Upload Banner',
      label: 'Upload Banner',
      type: 'file',
      filePath: '',
      name: 'banner',
      accept: 'image/jpeg,image/png',
      collectionName: 'subcategory',
      validationProps: {
        required: {
          value: true,
          message: 'You need to upload banner'
        },
        validate: {
          lessThan10MB: (files) => files[0]?.size < 5000000 || 'Max limit 5MB',
          //  imageDimension: (files) => files[0]?.width > 500 && files[0]?.height > 500 || "Max image Dimensions 500px X 500px",
  
          acceptedFormats: (files) =>
            ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
            'Only PNG, JPEG format'
        },
        onChange: async (e) => {
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          addOfferTemplate[0].filePath = `${s3Detail.path}`;
        }
      }
    },
  
    {
      title: 'Offer',
      type: 'text',
      name: 'title',
      label: 'Offer',
      placeholder: 'Enter the offer name',
      validationProps: {
        required: {
          value: true,
          message: 'Offer name is required'
        },
        maxLength: {
          value: 20,
          message: 'Please enter max 200 characters'
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
      title: 'Description',
      type: 'text',
      label: 'Description',
      name: 'description',
      placeholder: 'Enter the description',
      validationProps: {
        required: {
          value: true,
          message: 'Description is required'
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
          value: 50,
          message: 'Please enter max 50 characters'
        }
      }
    },
    {
      title: 'Display Order',
      type: 'number',
      name: 'display_order',
      label: 'Display Order',
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
      }
    },
    {
      title: 'Website URL',
      type: 'text',
      name: 'url',
      placeholder: 'Ex - https://www.abc@gmail.co',
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
  ];