import { fileUpload } from '@/utils/common_upload_image';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AttributionTwoToneIcon from '@mui/icons-material/AttributionTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

export const categoryTemplate = [
    {
      title: 'Upload Banner',
      type: 'file',
      filePath: '',
      name: 'Upload Banner',
    //   startIcon: <UploadFileTwoToneIcon />,
      collectionName: 'subcategory',
      validationProps: {
        
        onChange: async (e) => {
          const s3Detail = await fileUpload(
            e.target.files[0],
            'category',
            'images',
            ''
          );
          categoryTemplate[0].filePath = `${s3Detail.path}`;
        }
      }
    },
  
    {
      title: 'Category',
      type: 'text',
      name: 'name',
      placeholder: 'Enter the category name',
    //   startIcon: <CategoryTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Category name is required'
        },
        maxLength: {
          value: 20,
          message: 'Please enter max 2ss0 characters'
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
      title: 'Tagline',
      type: 'text',
      name: 'tagline',
      placeholder: 'Enter the Tagline',
    //   startIcon: <LocalOfferTwoToneIcon />,
      validationProps: {
        required: {
          value: true,
          message: 'Tagline is required'
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
      placeholder: 'Enter the display order',
    //   startIcon: <FactCheckTwoToneIcon />,
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
  ];