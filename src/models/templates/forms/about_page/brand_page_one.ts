export const BrandOne = [
  {
    title: 'Name',
    type: 'text',
    name: 'name',
    id: 'name',
    label: 'Name of the brand  ',
    placeholder: 'Ex - Nike',
    rules: {
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
    title: 'aboutBrand',
    type: 'text',
    name: 'about',
    placeholder: 'About the brand',
    id: 'about',
    label: 'About the brand',
    rules: {
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
    title: 'Tags',
    type: 'text',
    name: 'tags',
    placeholder: 'Ex - brand, shop',
    id: 'tags',
    label: 'Tags(comma seperated)',
    rules: {
      required: {
        value: true,
        message: 'Tags is required'
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
        value: /^[a-zA-Z0-9- , &]*$/,
        message: 'Special characters not allowed'
      }
    }
  },

  {
    title: 'Description',
    type: 'text',
    name: 'description',
    placeholder: 'Enter the Description',
    id: 'description',
    label: 'Description',
    rules: {
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
    title: 'Website URL',
    type: 'text',
    name: 'website_url',
    id: 'url',
    label: 'Website url',
    placeholder: 'Ex - https://www.google.co.in',
    rules: {
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
 
];
