export const BrandPageTwo = [
  {
    title: 'Upload Product Banner',
    type: 'file',
    name: 'logo',
    id: 'logo',
    label: 'Logo',
    placeholder: 'Image',
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
