import { fileUpload } from '@/utils/common_upload_image';
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";


export const singleVideo = [
  {
    title: 'Upload Video',
    type: 'file',
    name: 'Upload',
    id: 'logo',
    label: 'Upload Video',
    placeholder: 'Image',
    collectionName: 'subcategory',
    filePath: '',
    thumbPath:"",
    validationProps: {
      onChange: async (e) => {
        console.log('change listening');
        const s3Detail = await fileUpload(
          e.target.files[0],
          'category',
          'images',
          ''
        );
        singleVideo[0].filePath = `${s3Detail.path}`;

        function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        }

        const thumb = await generateVideoThumbnails(e.target.files[0], 1,"jpeg");
      
        let thumbFile = dataURLtoFile(thumb[0], "sktest.jpeg");

        const s3Thumb = await fileUpload(
          thumbFile,
          'category',
          'images',
          ''
        );
        singleVideo[0].thumbPath=`${s3Thumb.path}`

        

      }
    }
  },

  {
    title: 'Select Gender',
    type: 'select',
    name: 'gender',
    id: 'gender',
    select: 'select',
    multiple: false,
    defaultValue: 'Select',
    label: 'Earn Video',
    options: ['Yes', 'No'],
    placeholder: 'Earn Video'
  },
  {
    title: 'Order',
    type: 'text',
    name: 'display_order',
    placeholder: 'Enter the order',
    // startIcon: <FactCheckTwoToneIcon />,
    label: 'Display Order',
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
    title: 'Name',
    type: 'text',
    name: 'name',
    id: 'name',
    label: 'Name of the Video',
    placeholder: 'Enter name of the video',
    validationProps: {
      required: {
        value: true,
        message: 'Name is required'
      },
      maxLength: {
        value: 50,
        message: 'Please enter max 50 characters'
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
    title: 'Name',
    type: 'text',
    name: 'campaign_id',
    id: 'name',
    label: 'Campaign Id',
    placeholder: 'Ex - Nike',
    validationProps: {
      required: {
        value: true,
        message: 'Name is required'
      },
      maxLength: {
        value: 50,
        message: 'Please enter max 50 characters'
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
    name: 'description',
    placeholder: 'Banner text',
    id: 'description',
    label: 'Description',
    validationProps: {
      required: {
        value: true,
        message: 'Description is required'
      },
      maxLength: {
        value: 200,
        message: 'Please enter max 200 characters'
      },
      minLength: {
        value: 1,
        message: 'Please enter min 1 character'
      },
      pattern: {
        value: /^[a-z0-9&.?, -]+$/i,
        message: 'Special characters not allowed'
      }
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
    options: ['cat 1', 'cat 2'],
    placeholder: 'Ex - https://www.google.co.in'
  },
  {
    title: 'Select Sub Category',
    type: 'select',
    name: 'sub_category_ids',
    id: 'subCategory',
    select: 'select',
    defaultValue: 'SUB_CATEGORY',
    label: 'Select Sub Category',
    multiple: true,
    options: ['Male', 'Female'],
    placeholder: 'Ex - https://www.google.co.in'
  },
  {
    title: 'Select Tags',
    type: 'select',
    name: 'tag_ids',
    id: 'tags',
    multiple: true,
    select: 'select',
    defaultValue: 'TAGS',
    label: 'Select Tags',
    options: ['tag 1', 'tag 2'],
    placeholder: 'Ex - https://www.google.co.in'
  },
  {
    title: 'Select Themes',
    type: 'select',
    name: 'theme_ids',
    id: 'themes',
    select: 'select',
    multiple: true,
    defaultValue: 'THEMES',
    label: 'Select Themes',
    options: ['Theme 1', 'Theme 2'],
    placeholder: 'Ex - https://www.google.co.in'
  }
];
