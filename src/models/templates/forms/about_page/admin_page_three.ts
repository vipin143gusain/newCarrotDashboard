export const adminPageThree = [
  {
    title: 'Price Rating',
    type: 'select',
    name: 'price_rating',
    id: 'logo',
    multiple:false,
    label: 'Price Rating',
    placeholder: 'Price Rating',
    collectionName: 'subcategory',
    options:[{id:1,name:'1'},{id:2,name:'2'},{id:3,name:'3'},{id:4,name:'4'},{id:5,name:'5'}],
    rules: {
      required: {
        value: true,
        message: 'You need to upload banner'
      },

      validate: {
        // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
        // lessThan10MB: (files) => files[0]?.size > 5000000 || 'Max limit 5MB',
        //  imageDimension: (files) => files[0]?.width > 500 || files[0]?.height > 500 || "Max image Dimensions 500px X 500px",
        // acceptedFormats: (files) =>
        //   ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
        //   'Only PNG, JPEG format'
      }
    }
  },

  {
    title: 'Brand Rating',
    type: 'select',
    name: 'brand_rating',
    id: 'banner',
    multiple:false,
    label: 'Brand Rating',
    placeholder: 'Brand Rating',
    collectionName: 'subcategory',
    options:[{id:1,name:'1'},{id:2,name:'2'},{id:3,name:'3'},{id:4,name:'4'},{id:5,name:'5'}],
    rules: {
      required: {
        value: true,
        message: 'You need to upload banner'
      }
      // validate: {
      //   lessThan10MB: (files) => {
      //     console.log(files[0])
      //     return files[0]?.size < 5000000 || 'Max limit 5MB'
      //   }
      //   //  imageDimension: (files) => files[0]?.width > 500 || files[0]?.height > 500 || "Max image Dimensions 500px X 500px",

      // //   acceptedFormats: (files) =>
      // //     ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
      // //     'Only PNG, JPEG format'
      // }
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
    rules: {
      required: {
        value: true,
        message: 'Category is required'
      }
    },
    options:[{id:1,name:'cat 1'},{id:2,name:'cat 2'}],
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
    rules: {
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
    title: 'Brand Cashback',
    type: 'text',
    name: 'brand_cashback',
    id: 'brand_cashback',
    label: 'Brand Cashback',
    placeholder: 'Brand Cashback',
    collectionName: 'subcategory',
    rules: {
      required: {
        value: true,
        message: 'You need to upload banner'
      },

      validate: {
        // lessThan: e => e.target.files[0].size >  5000000 || "Please upload a file smaller than 5 MB",
        // lessThan10MB: (files) => files[0]?.size > 5000000 || 'Max limit 5MB',
        //  imageDimension: (files) => files[0]?.width > 500 || files[0]?.height > 500 || "Max image Dimensions 500px X 500px",
        // acceptedFormats: (files) =>
        //   ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
        //   'Only PNG, JPEG format'
      }
    }
  },

  {
    title: 'Expiry Period (in days)',
    type: 'text',
    name: 'validity_of_cashback',
    id: 'validity_of_cashback',
    label: 'Expiry Period (in days)',
    placeholder: 'Expiry Period (in days)',
    collectionName: 'subcategory',
    rules: {
      required: {
        value: true,
        message: 'You need to upload banner'
      }
      // validate: {
      //   lessThan10MB: (files) => {
      //     console.log(files[0])
      //     return files[0]?.size < 5000000 || 'Max limit 5MB'
      //   }
      //   //  imageDimension: (files) => files[0]?.width > 500 || files[0]?.height > 500 || "Max image Dimensions 500px X 500px",

      // //   acceptedFormats: (files) =>
      // //     ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
      // //     'Only PNG, JPEG format'
      // }
    }
  },
  {
    title: 'Channels',
    type: 'select',
    name: 'channels',
    id: 'channels',
    select: 'select',
    defaultValue: 'SUB_CATEGORY',
    label: 'Channels',
    validationProps: {
      required: {
        value: true,
        message: 'Sub Category is required'
      }
    },
    multiple: true,
    options:[{id:1,name:'1'},{id:2,name:'2'},{id:3,name:'3'},{id:4,name:'4'},{id:5,name:'5'}],
    placeholder: 'Ex - https://www.google.co.in'
  },
  
];