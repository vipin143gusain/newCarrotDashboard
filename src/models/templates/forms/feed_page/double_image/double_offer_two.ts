import { fileUpload } from '@/utils/common_upload_image';

export const doubleOfferTwo = [
  {
    title: 'Upload Product Banner',
    type: 'file',
    name: 'logo',
    id: 'logo',
    label: 'Upload',
    placeholder: 'Image',
    collectionName: 'subcategory',
    filePath: '',
    accept: 'image/jpeg,image/png',
    validationProps: {
      onChange: async (e) => {
        console.log('change listening');
        const s3Detail = await fileUpload(
          e.target.files[0],
          'category',
          'images',
          ''
        );
        doubleOfferTwo[0].filePath = `${s3Detail.path}`;
      }
    }
  },
  {
    title: 'Website URL',
    type: 'text',
    name: 'weblink_url',
    id: 'url',
    label: 'Website url',
    placeholder: 'Ex - https://www.google.co.in',
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
  },
  {
    title: 'Select Gender',
    type: 'select',
    name: 'gender',
    id: 'gender',
    select: 'select',
    multiple: false,
    defaultValue: 'GENDER',
    label: 'Select Gender',
    validationProps: {
      // required: {
      //   value: true,
      //   message: 'Sub cat is required'
      // }
    },
    options: ['Male', 'Female'],
    placeholder: ''
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
    label: 'Name of the Banner',
    placeholder: 'Enter name banner',
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
    placeholder: 'Enter Campaign Id',
    validationProps: {
      required: {
        value: true,
        message: 'Campaign ID s required'
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
    name: 'text',
    id: 'name',
    label: 'Offer Text',
    placeholder: 'Enter Offer Text',
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
    placeholder: 'Enter Banner description',
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
    validationProps: {
      required: {
        value: true,
        message: 'Category is required'
      }
    },
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
    validationProps: {
      required: {
        value: true,
        message: 'Sub Category is required'
      }
    },
    multiple: true,
    options: ['Sub Cat 1', 'Sub Cat 2'],
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
    validationProps: {
      required: {
        value: true,
        message: 'Tags is required'
      }
    },
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
    validationProps: {
      required: {
        value: true,
        message: 'Themes is required'
      }
    },
    options: ['Theme 1', 'Theme 2'],
    placeholder: 'Ex - https://www.google.co.in'
  }
];
