//@ts-nocheck
// import { v4 as uuidv4 } from 'uuid';
import { _serveAPI } from '@/api/service';
import { CommonForm } from '@/components/common_form.component';
import CommonModal from '@/components/common_modal.component';
import { addOfferTemplate } from '@/models/templates/forms/add_offer/addOfferTemplate';
import { doubleOfferOne } from '@/models/templates/forms/feed_page/double_image/double_offer_one';
import { doubleOfferTwo } from '@/models/templates/forms/feed_page/double_image/double_offer_two';
import { singleOfferOne } from '@/models/templates/forms/feed_page/single_offer';
import { singleVideo } from '@/models/templates/forms/feed_page/single_video';
import { categoryTemplate } from '@/models/templates/forms/wallet_category/category_template';
import { productTemplate } from '@/models/templates/forms/wallet_product/product_template';
import { BrandTabTypes } from '@/models/types/brand_tabtype';
import { OfferTypes } from '@/models/types/offers';
import {
  deleteOffer,
  getOffer,
  loadingAddOffer
} from '@/store/slices/add_offer';
import {
  categoryList,
  getFeedCards,
  getFeedCategory,
  getFeedSubCategory,
  getFeedTags,
  getFeedTheme,
  loadingFeed,
  subCategoryList,
  tagList,
  themeList
} from '@/store/slices/feed';
import { getModalState, setModalState } from '@/store/slices/modal_watcher';
import {
  addWalletCategoryAction,
  deleteCategoryAction,
  getCategory,
  loadingCategory,
  // editCategoryAction,
  updateCategory
} from '@/store/slices/wallet_category';
import {
  addWalletProductAction,
  deleteProductAction,
  getProduct,
  loadingProduct,
  updateProduct
} from '@/store/slices/wallet_product';
import {search} from '@/store/slices/search';
import { notify } from '@/utils/toaster';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  styled,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppDispatch } from '../store';
import { getSelectionType } from '../utils/get_selections';
import CategoryGrid, { CategoryGridProps } from './grid/category.grid';
import FeedGrid, { FeedGridProps } from './grid/feed.grid';
import ProductGrid, { ProductGridProps } from './grid/product.grid';
// const OutlinedInputWrapper = styled(OutlinedInput)(
//   ({ theme }) => `
//     background-color: ${theme.colors.alpha.white[100]};
//     padding-right: ${theme.spacing(0.7)}
// `
// );
interface TaskSearchProps {
  searchPlaceholder: string;
  onSearchPress(): any;
  tsType: BrandTabTypes;
  setProdDefault?: any;
  setCategoryDefault?: any;
  categoryData?: any;
  productData?: any;
  getOffer?: any;
  // getProduct:any;
  statusFilter?: 'all' | 'approved' | 'pending' | 'rejected';
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const genderOption = [
  { id: 'M', name: 'Male' },
  { id: 'F', name: 'Female' }
];

// const defaultTemplate = [
//   {
//     title: 'Default',
//     type: 'text',
//     name: 'Name of the brand',
//     placeholder: 'Default'
//   }
// ];

const TaskSearch = (
  props: TaskSearchProps & FeedGridProps & CategoryGridProps & ProductGridProps
) => {
  const {
    searchPlaceholder,
    onSearchPress,
    data,
    // categoryData,
    // productData,
    tsType
  } = props;

  const FormControlWrap = styled(FormControl)(
    () =>
      `
  margin-top:5%
  `
  );

  const {walletId} = useSelector(search);
  const modalState = useSelector(getModalState);
  const loadingFeedData = useSelector(loadingFeed);
  const loadingProductData = useSelector(loadingProduct);
  const loadingCategoryData = useSelector(loadingCategory);
  const loadingAddOfferData = useSelector(loadingAddOffer);
  const categoryListData = useSelector(categoryList);
  const subCategoryListData = useSelector(subCategoryList);
  const themeListData = useSelector(themeList);
  const tagListData = useSelector(tagList);
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setmode] = useState<string>('CREATE');
  const [uploadFilePath, setUploadFilePath] = useState({
    collectionName: '',
    s3Path: ''
  });
  const [selectionType, setselectionType] = useState<string>('Product');
  const [createType, setcreateType] = useState<string>('Add_Product');

  const [formType, setformType] = useState<OfferTypes>('SINGLE_OFFER_TYPE');
  const [expanded, setExpanded] = useState<string | true>('panel1');

  const [activeTab, setTabValue] = useState('live_asset');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  // const _theBrand = useSelector((state) => state.brand.brand);
  // const loading = useSelector((state) => state.brand.loading);
  // const error = useSelector((state) => state.brand.error);

  // const [isComplete, setIsComplete] = useState(false);
  // const [abtValues, setAbtValues] = useState({
  //   defaultValues: {
  //     name: '',
  //     about: '',
  //     description: '',
  //     tags: '',
  //     website_url: '',
  //     brand_colour: '',
  //     primary_offer: '',
  //     banner: '',
  //     logo: ''
  //   }
  // });

  // const [activeStep, setActiveStep] = useState(0);
  const [prodDefault, setProdDefault] = useState({
    purpose: '',
    defaultValues: {
      id: '',
      name: '',
      image: '',
      price: '',
      attribute: '',
      value: '',
      order_number: '',
      url: '',
      wallet_id: '279',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [editProdDefault, setEditProdDefault] = useState({
    purpose: '',
    defaultValues: {
      id: '',
      name: '',
      image: '',
      price: '',
      attribute: '',
      value: '',
      order_number: '',
      url: '',
      wallet_id: '279',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [categoryDefault, setCategoryDefault] = useState({
    purpose: '',
    defaultValues: {
      id: '',
      name: '',
      image: '',
      tagline: '',
      display_order: '',
      url: '',
      wallet_id: '279',
      qc_status_asset: '',
      qc_status: ''
    }
  });
  const [editCategoryDefault, setEditCategoryDefault] = useState({
    purpose: '',
    defaultValues: {
      id: '',
      name: 'avinash',
      image: '',
      tagline: '',
      display_order: '',
      url: '',
      wallet_id: '',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [feedDefault, setFeedDefault] = useState({
    purpose: '',
    defaultValues: {
      widget_type: '',
      widget_id: 2,
      created_by: 100,
      wallet_id: '279',
      campaign_id: '0',
      name: 'ghfgdf',
      text: 'jhgfdd',
      description: '',
      weblink_url: '',
      media_type: 'image',
      media_file: '',
      display_order: 1,
      category_ids: [42],
      category_ids_with_name: '',
      sub_category_ids: [],
      sub_category_ids_with_name: '',
      theme_ids: [],
      theme_ids_with_name: '',
      tag_ids: [],
      tag_ids_with_name: '',
      image_color: '77,172,84',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [editFeedDefault, setEditFeedDefault] = useState({
    purpose: '',
    defaultValues: {
      widget_type: '',
      widget_id: 0,
      created_by: 0,
      wallet_id: '',
      campaign_id: '',
      name: '',
      text: '',
      description: '',
      weblink_url: '',
      media_type: 'image',
      media_file: '',
      display_order: 0,
      category_ids: [],
      category_ids_with_name: '',
      sub_category_ids: [],
      sub_category_ids_with_name: '',
      theme_ids: [],
      theme_ids_with_name: '',
      tag_ids: [],
      tag_ids_with_name: '',
      image_color: '77,172,84',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [addOfferDefault, setAddOfferDefault] = useState({
    purpose: '',
    defaultValues: {
      id: 0,
      title: '',
      description: '',
      image: '',
      display_order: 0,
      start_date: null,
      end_date: null,
      wallet_id: '',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const [editAddOfferDefault, setEditAddOfferDefault] = useState({
    purpose: '',
    defaultValues: {
      id: 0,
      title: '',
      description: '',
      image: '',
      display_order: 0,
      start_date: null,
      end_date: null,
      wallet_id: '',
      qc_status_asset: '',
      qc_status: ''
    }
  });

  const onResetForm = (value) => {
    return (value = null);
  };

  const onFormSubmit = async (value) => {
    // const { Product, Price, Attribute, Value, Order, id } = value;

    let outData: object | any = { ...value, wallet_id: 279 };
    let filePath;
    if (tsType == 'WALLET_PRODUCT') {
      filePath = productTemplate[0].filePath;
    } else if (tsType == 'WALLET_CATEGORY') {
      filePath = categoryTemplate[0].filePath;
    } else if (tsType === 'WALLET_FEED' && formType === 'SINGLE_OFFER_TYPE') {
      filePath = singleOfferOne[0].filePath;
    } else if (tsType === 'ADD_OFFER') {
      filePath = addOfferTemplate[0].filePath;
    } else if (tsType === 'WALLET_FEED' && formType === 'SINGLE_VIDEO_TYPE') {
      filePath = singleVideo[0].filePath;
    } else {
    }

    delete outData['Upload Product Banner'];
    outData.image = filePath;
    outData.image_key = filePath;
    if (tsType === 'WALLET_FEED') {
      // console.log('FROM TASKSEARCH', value);
      outData = {
        ...value,
        media_file: filePath,
        widget_id: 2,
        media_type: 'image',
        widget_type: 'single_offer',
        wallet_id: 279,
        category_ids: value.category_ids.map((el) => el.id),
        created_by: 100,
        category_ids_with_name: value.category_ids
          .map((el) => `${el.id}#${el.name}`)
          .join(','),
        sub_category_ids: value.sub_category_ids.map((el) => el.id),
        sub_category_ids_with_name: value.sub_category_ids
          .map((el) => `${el.id}#${el.name}`)
          .join(','),
        theme_ids: value.theme_ids.map((el) => el.id),
        theme_ids_with_name: value.theme_ids
          .map((el) => `${el.id}#${el.name}`)
          .join(','),
        tag_ids: value.tag_ids.map((el) => el.id),
        tag_ids_with_name: value.tag_ids
          .map((el) => `${el.id}#${el.name}`)
          .join(','),
        image_color: '77,172,84'
      };
      if (formType) delete outData.logo;
    }
    
    if (!outData.media_file && value.media_file) {
      outData.media_file = value.media_file;
    }
    if (formType === 'SINGLE_VIDEO_TYPE') {
      outData.media_type = 'video';
      outData.widget_id = 3;
      outData.video_earn = 0;
      outData.widget_type = 'single_video';
      outData.media_source = 'AWS';
      outData.video_thumbnail = singleVideo[0].thumbPath;
    }
    
    Object.keys(outData).map((el) => {
      if ((outData[`${el}`] == null)||(outData[`${el}`] == "")) {
        delete outData[`${el}`];
      }
    });



    if (mode === 'CREATE') {
      if (tsType === 'WALLET_PRODUCT') {
        // dispatch(addProduct(outData));
        await dispatch(addWalletProductAction(outData));
        productTemplate[0].filePath = '';
        dispatch(getProduct({ walletId, qc_status: filter }));
        dispatch(setModalState(false));
      } else if (tsType === 'WALLET_CATEGORY') {
        await dispatch(addWalletCategoryAction(outData));
        dispatch(getCategory({ walletId, qc_status: filter }));
        dispatch(setModalState(false));
        categoryTemplate[0].filePath = '';
      } else if (tsType === 'WALLET_FEED') {
        _serveAPI({
          method: 'POST',
          endPoint: 'api/wallet/banner/v2',
          data: outData
        })
          .then((res) => {
            notify('success', res.message);
            dispatch(getFeedCards({ walletId, qc_status: filter }));
            dispatch(setModalState(false));
          })
          .catch((err) => console.log('error adding feed', err));
      } else if (tsType === 'ADD_OFFER') {
        _serveAPI({
          method: 'POST',
          endPoint: 'api/wallet/offer/v2',
          data: outData
        })
          .then((res) => {
            notify('success', res.message);
            dispatch(getOffer({ walletId, qc_status: filter }));
            dispatch(setModalState(false));
            addOfferTemplate[0].filePath = '';
          })
          .catch((err) => console.log('error adding feed', err));
      } else {
      }
    } else {
      if (tsType === 'WALLET_PRODUCT') {
        // dispatch(editProductAction(outData));
        await dispatch(updateProduct(outData));
        dispatch(getProduct({ walletId, qc_status: filter }));
        productTemplate[0].filePath = '';
        dispatch(setModalState(false));
      } else if (tsType === 'WALLET_CATEGORY') {
        // dispatch(editCategoryAction(outData));
        await dispatch(updateCategory(outData));
        dispatch(getCategory({ walletId, qc_status: filter }));
        dispatch(setModalState(false));
        categoryTemplate[0].filePath = '';
      } else if (tsType === 'WALLET_FEED') {
        _serveAPI({
          method: 'PUT',
          endPoint: `api/wallet/banner/v2/${outData.id}`,
          data: outData
        })
          .then((res) => {
            notify('success', res.message);
            dispatch(getFeedCards({ walletId, qc_status: filter }));
            dispatch(setModalState(false));
            singleVideo[0].filePath = '';
            singleVideo[0].thumbPath = '';
            singleOfferOne[0].filePath = '';
          })
          .catch((err) => console.log('error adding feed', err));
      } else if (tsType === 'ADD_OFFER') {
        _serveAPI({
          method: 'PUT',
          endPoint: `api/wallet/offer/v2/${outData.id}`,
          data: outData
        })
          .then((res) => {
            notify('success', res.message);
            dispatch(getOffer({ walletId, qc_status: filter }));
            dispatch(setModalState(false));
            addOfferTemplate[0].filePath = '';
          })
          .catch((err) => console.log('error adding feed', err));
      } else {
        console.log('selection type not available');
      }
    }
  };

  const [dataOne, setdataOne] = useState({
    purpose:"",
    defaultValues: {
      id: 0,
      name: '',
      weblink_url: '',
      gender: 'M',
      to_age: null,
      from_age: null,
      media_type: 'image',
      media_file: '',
      start_date: null,
      end_date: null,
      text: '',
      description: '',
      category_ids: '',
      category_ids_with_name: '',
      sub_category_ids: '',
      sub_category_ids_with_name: '',
      theme_ids: '',
      theme_ids_with_name: '',
      tag_ids: '',
      tag_ids_with_name: '',
      image_resolution: '',
      widget_type: '',
      widget_id: 5,
      campaign_id: '',
      wallet_id: '',
      display_order: 0,
      qc_status: '',
      qc_status_asset: '',
      // created_by: 0,
      // created_on: "",
      updated_by: null,
      updated_on: null,
      is_active: 1,
      state_status: 2,
      video_thumbnail: null,
      video_earn: null,
      image_color: '',
      validity_of_cashback: null,
      api_video_key: null,
      media_source: null,
      tracking_url: ''
    }
  });
  const [dataTwo, setdataTwo] = useState({
    purpose:"",
    defaultValues: {
      id: 0,
      name: '',
      weblink_url: '',
      gender: 'M',
      to_age: null,
      from_age: null,
      media_type: 'image',
      media_file: '',
      start_date: null,
      end_date: null,
      text: '',
      description: '',
      category_ids: '',
      category_ids_with_name: '',
      sub_category_ids: '',
      sub_category_ids_with_name: '',
      theme_ids: '',
      theme_ids_with_name: '',
      tag_ids: '',
      tag_ids_with_name: '',
      image_resolution: '',
      widget_type: '',
      widget_id: 5,
      campaign_id: '',
      wallet_id: '',
      display_order: 0,
      qc_status: '',
      qc_status_asset: '',
      // created_by: 0,
      // created_on: "",
      updated_by: null,
      updated_on: null,
      is_active: 1,
      state_status: 2,
      video_thumbnail: null,
      video_earn: null,
      image_color: '',
      validity_of_cashback: null,
      api_video_key: null,
      media_source: null,
      tracking_url: ''
    }
  });

  const submitDoubleOfferOne = (values) => {
    let data = {
      ...values,
      category_ids: values.category_ids.map((el) => el.id),
      created_by: 100,
      gender: 'M',
      category_ids_with_name: values.category_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      sub_category_ids: values.sub_category_ids.map((el) => el.id),
      sub_category_ids_with_name: values.sub_category_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      theme_ids: values.theme_ids.map((el) => el.id),
      theme_ids_with_name: values.theme_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      tag_ids: values.tag_ids.map((el) => el.id),
      tag_ids_with_name: values.tag_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(',')
    };
    data.media_file = doubleOfferOne[0].filePath;
    delete data.logo;
    data.media_type = 'image';
    data.widget_id = 5;
    data.widget_type = 'double_offer';
    data.image_color = '204,164,148';
    data.image_resolution = 'landscape';

    Object.keys(data).map((el) => {
      if (data[`${el}`] == null) {
        delete data[`${el}`];
      }
    });
    setdataOne(data);
    setExpanded('panel2');
  };

  const submitDoubleOfferTwo = (values) => {
    let data = {
      ...values,
      gender: 'M',
      category_ids: values.category_ids.map((el) => el.id),
      created_by: 100,
      category_ids_with_name: values.category_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      sub_category_ids: values.sub_category_ids.map((el) => el.id),
      sub_category_ids_with_name: values.sub_category_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      theme_ids: values.theme_ids.map((el) => el.id),
      theme_ids_with_name: values.theme_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(','),
      tag_ids: values.tag_ids.map((el) => el.id),
      tag_ids_with_name: values.tag_ids
        .map((el) => `${el.id}#${el.name}`)
        .join(',')
    };
    data.media_file = doubleOfferTwo[0].filePath;
    delete data.logo;
    data.media_type = 'image';
    data.widget_id = 5;
    data.widget_type = 'double_offer';
    data.image_color = '204,164,148';
    data.image_resolution = 'landscape';

    Object.keys(data).map((el) => {
      if ((data[`${el}`] == null)||(data[`${el}`] == "")) {
        delete data[`${el}`];
      }
    });
    data.sibling_item = dataOne;
    setdataTwo(data);
    if (mode === 'CREATE') {
      _serveAPI({
        method: 'POST',
        endPoint: 'api/wallet/banner',
        data: data
      })
        .then((res) => {
          notify('success', res.message);
          dispatch(getFeedCards({ walletId, qc_status: filter }));
          dispatch(setModalState(false));
          doubleOfferOne[0].filePath = '';
          doubleOfferTwo[0].filePath = '';
        })
        .catch((err) => console.log('error adding feed', err));
    } else {
      data.updated_by = 100;
      delete data.created_by;
      delete data.created_on;
      delete data.qc_status;
      delete data.qc_status_asset;

      _serveAPI({
        method: 'PUT',
        endPoint: `api/wallet/offer/v2/${data.id}`,
        data: data
      })
        .then((res) => {
          notify('success', res.message);
          dispatch(getOffer({ walletId, qc_status: filter }));
          dispatch(setModalState(false));
          doubleOfferOne[0].filePath = '';
          doubleOfferTwo[0].filePath = '';
        })
        .catch((err) => console.log('error adding feed', err));
    }
  };

  const handleChangeAcc =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChange = (event: SelectChangeEvent) => {
    setformType(event.target.value);
  };

  const approveProduct = (id) => {
    let data = {
      approver_id: 255,
      approver_name: 'Vipin_admin',
      approver_notes: 'data approved'
    };

    _serveAPI({
      method: 'PATCH',
      endPoint: `api/qcintegration/approve/${id}`,
      data
    })
      .then((res) => {
        notify('success', res.message);
        dispatch(getProduct({ walletId, qc_status: filter }));
        dispatch(setModalState(false));
      })
      .catch((err) => console.log('error adding feed', err));
  };

  const rejectProduct = (id) => {
    let data = {
      approver_id: 255,
      approver_name: 'Vipin_admin',
      approver_notes: 'data rejected'
    };

    _serveAPI({
      method: 'PATCH',
      endPoint: `api/qcintegration/reject/${id}`,
      data
    })
      .then((res) => {
        notify('success', res.message);
        dispatch(getProduct({ walletId: 279, qc_status: filter }));
        dispatch(setModalState(false));
      })
      .catch((err) => console.log('error adding feed', err));
  };

  const prodWithDraw = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/product/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => {
      notify('success', res.message);
      dispatch(getProduct({ walletId, qc_status: filter }));
    });
  };
  const categoryWithDraw = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/category/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => {
      notify('success', res.message);
      dispatch(getCategory({ walletId: 279, qc_status: filter }));
    });
  };

  const feedWithDraw = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/banner/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => {
      notify('success', res.message);
      dispatch(getFeedCards({ walletId, qc_status: filter }));
    });
  };

  const addOfferWithDraw = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/offer/v2/withdrawn/${id}`,
      method: 'PUT'
    }).then((res) => {
      notify('success', res.message);
      dispatch(getOffer({ walletId, qc_status: filter }));
    });
  };

  const fetchProdEditRequest = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/product/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => {
      const prodEditedVal = JSON.parse(res.data[0].reference_payload);
      if (prodEditedVal?.qc_status_asset) {
        delete prodEditedVal.qc_status_asset;
      }
      setEditProdDefault({
        ...editProdDefault,
        purpose: res.data[0].purpose,
        defaultValues: {
          ...prodDefault.defaultValues,
          ...prodEditedVal
        }
      });
      prodDefault.purpose = res.data[0].purpose;
      console.log(prodDefault.defaultValues);
      setProdDefault({
        ...prodDefault
      });
    });
  };
  const fetchCategoryEditRequest = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/category/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => {
      const categoryEditedVal = JSON.parse(res.data[0].reference_payload);
      delete categoryEditedVal.qc_status_asset;
      setEditCategoryDefault({
        ...editCategoryDefault,
        purpose: res.data[0].purpose,
        defaultValues: {
          ...categoryDefault.defaultValues,
          ...categoryEditedVal
        }
      });
      categoryDefault.purpose = res.data[0].purpose;
      setCategoryDefault({
        ...categoryDefault
      });
    });
  };
  const fetchFeedEditRequest = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/banner/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => {
      const feedEditedVal = JSON.parse(res.data[0].reference_payload);
      delete feedEditedVal.qc_status_asset;
      setEditFeedDefault({
        ...editFeedDefault,
        purpose: res.data[0].purpose,
        defaultValues: {
          ...feedDefault.defaultValues,
          ...feedEditedVal
        }
      });
      feedDefault.purpose = res.data[0].purpose;
      setFeedDefault({
        ...feedDefault
        // purpose:res.data[0].purpose
      });
    });
  };
  const fetchAddOfferEditRequest = async (id) => {
    _serveAPI({
      endPoint: `api/wallet/offer/v2/getEditedRequest/${id}`,
      method: 'GET'
    }).then((res) => {
      const addOfferEditedVal = JSON.parse(res.data[0].reference_payload);
      delete addOfferEditedVal.qc_status_asset;
      setEditAddOfferDefault({
        ...editAddOfferDefault,
        purpose: res.data[0].purpose,
        defaultValues: {
          ...addOfferDefault.defaultValues,
          ...addOfferEditedVal
        }
      });
      addOfferDefault.purpose = res.data[0].purpose;
      setAddOfferDefault({
        ...addOfferDefault
        // purpose:res.data[0].purpose
      });
    });
  };

  const [filter, setFilter] = useState('');
  const filterHandleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const renderMSForm = () => {
    return (
      <div>
        <Accordion
          expanded={mode === 'EDIT' ? true : expanded === 'panel1'}
          onChange={handleChangeAcc('panel1')}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Here is Offer #1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommonForm
              containerStyle={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: '30px',
                backgroundColor: '#070C27',
                borderWidth: '1px',
                borderColor: '#111633',
                borderRadius: '10px',
                collectionName: 'subcategory'
              }}
              // defaultValues={}
              mode={mode}
              onWithdrawClick={(id: number) => {
                console.log(id);
              }}
              onApproveClick={(id) => {
                console.log(id);
              }}
              onRejectClick={(id) => {
                console.log('reject id', id);
              }}
              disabled={false}
              subCategoryListData={subCategoryListData}
              categoryListData={categoryListData}
              themeListData={themeListData}
              tagListData={tagListData}
              genderOption={genderOption}
              activeTab={activeTab}
              defaultValues={dataOne}
              setUploadFilePath={setUploadFilePath}
              uploadFilePath={uploadFilePath}
              onSubmitForm={submitDoubleOfferOne}
              onResetForm={onResetForm}
              template={doubleOfferOne}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={mode === 'EDIT' ? true : expanded === 'panel2'}
          // onChange={handleChangeAcc("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Here is Offer #2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommonForm
              containerStyle={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: '30px',
                backgroundColor: '#070C27',
                borderWidth: '1px',
                borderColor: '#111633',
                borderRadius: '10px',
                collectionName: 'subcategory'
              }}
              categoryListData={categoryListData}
              subCategoryListData={subCategoryListData}
              themeListData={themeListData}
              tagListData={tagListData}
              genderOption={genderOption}
              onWithdrawClick={(id: number) => {
                console.log(id);
              }}
              onApproveClick={(id) => {
                console.log(id);
              }}
              onRejectClick={(id) => {
                console.log('reject id', id);
              }}
              disabled={false}
              mode={mode}
              activeTab={activeTab}
              defaultValues={dataTwo}
              uploadFilePath={uploadFilePath}
              onSubmitForm={submitDoubleOfferTwo}
              onResetForm={onResetForm}
              template={doubleOfferTwo}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  useEffect(() => {
    setTabValue('live_asset');
    if (!modalState) {
      prodDefault.purpose = '';
      categoryDefault.purpose = '';
      feedDefault.purpose = '';
      addOfferDefault.purpose = '';
      setProdDefault({...prodDefault });
      setCategoryDefault({...categoryDefault });
      setFeedDefault({...feedDefault });
      setAddOfferDefault({...addOfferDefault });
      setEditProdDefault({
        ...editProdDefault,
        purpose: ''
      });
      setEditCategoryDefault({
        ...editCategoryDefault,
        purpose: ''
      });
      setEditFeedDefault({
        ...editFeedDefault,
        purpose: ''
      });
      setEditAddOfferDefault({
        ...editAddOfferDefault,
        purpose: ''
      });
    }
  }, [modalState, mode]);

  useEffect(() => {
    dispatch(getProduct({ walletId, qc_status: filter }));
    dispatch(getCategory({ walletId, qc_status: filter }));
    dispatch(getFeedCards({ walletId, qc_status: filter }));
    dispatch(getOffer({ walletId, qc_status: filter }));
    dispatch(getFeedCategory());
    dispatch(getFeedSubCategory());
    dispatch(getFeedTheme());
    dispatch(getFeedTags());
  }, [dispatch, filter]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FormControlWrap variant="outlined" fullWidth></FormControlWrap>
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          {/* <Typography variant="subtitle2">
            Showing{" "}
            <Text color="black">
              <b>All Brands</b>
            </Text>
          </Typography> */}

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Showing
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filter}
              onChange={filterHandleChange}
              autoWidth
              label="Showing"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value=" ">All</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              tsType === 'WALLET_PRODUCT'
                ? setcreateType('Add_Product')
                : tsType === 'WALLET_CATEGORY'
                ? setcreateType('Add_Category')
                : tsType === 'WALLET_FEED'
                ? setcreateType('Add_Feed')
                : null;
              setmode('CREATE');
              dispatch(setModalState(true));
            }}
            startIcon={<AddCircleIcon />}
            sx={{
              borderWidth: '2px',
              borderColor: '#57CA22',
              color: '#57CA22',
              '&:hover': {
                borderWidth: '2px',
                borderColor: '#57CA22',
                bgcolor: '#57CA22',
                color: '#fff'
              }
            }}
          >
            Add New{' '}
            {tsType === 'WALLET_FEED'
              ? 'Feed Item'
              : tsType === 'WALLET_PRODUCT'
              ? 'Product Item'
              : tsType === 'WALLET_CATEGORY'
              ? 'Category Item'
              : tsType === 'ADD_OFFER'
              ? 'Offer'
              : null}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {tsType === 'WALLET_FEED' && (
          <FeedGrid
            data={data}
            loadingData={loadingFeedData}
            onEditClick={(value) => {
              feedDefault.defaultValues={...feedDefault.defaultValues,...value};
              feedDefault.purpose="";
              setFeedDefault({
                ...feedDefault,
              });
              setselectionType('Feed');
              setmode('EDIT');
              dispatch(setModalState(true));
              if (value.qc_status_asset === 'pending') {
                fetchFeedEditRequest(value.id);
              }
              if (value.widget_type === 'single_offer') {
                setformType('SINGLE_OFFER_TYPE');
              }
              if (value.widget_type === 'single_video') {
                setformType('SINGLE_VIDEO_TYPE');
              }
              if (value.widget_type === 'double_offer') {
                setformType('DOUBLE_OFFER_TYPE');
                let doubleOfferDefault = { ...value };
                dataOne.defaultValues={...dataOne.defaultValues,...JSON.parse(doubleOfferDefault.sibling_item)}
                setdataOne({
                  ...dataOne,
                  // defaultValues: JSON.parse(doubleOfferDefault.sibling_item)
                });
                dataTwo.defaultValues={...dataTwo.defaultValues,...doubleOfferDefault}
                setdataTwo({
                  ...dataTwo
                });
              }
            }}
            onDeleteClick={async (id) => {
              await dispatch(deleteOffer(id));
              dispatch(getOffer({ walletId, qc_status: filter }));
              dispatch(getFeedCards({ walletId, qc_status: filter }));
            }}
            onWithdrawClick={(id: number) => {
              return console.log(id);
            }}
            defaultValue={feedDefault}
            setDefaultValue={setFeedDefault}
          />
        )}

        {tsType === 'WALLET_PRODUCT' && (
          <ProductGrid
            productData={data}
            loadingData={loadingProductData}
            onEditClick={(value) => {
              prodDefault.defaultValues={...prodDefault.defaultValues,...value};
              prodDefault.purpose="";
              setProdDefault({
                ...prodDefault
                }
              );
              setselectionType('Product');
              setmode('EDIT');
              dispatch(setModalState(true));
              if (value.qc_status_asset === 'pending') {
                fetchProdEditRequest(value.id);
              }
            }}
            prodDefault={prodDefault}
            setProdDefault={setProdDefault}
            getProduct={getProduct}
            dispatch={dispatch}
            onDeleteClick={deleteProductAction}
          />
        )}

        {tsType === 'WALLET_CATEGORY' && (
          <CategoryGrid
            categoryData={data}
            loadingData={loadingCategoryData}
            onEditClick={(value) => {
              categoryDefault.defaultValues={...categoryDefault.defaultValues,...value}
              categoryDefault.purpose="";
              setCategoryDefault({
                ...categoryDefault
              });
              setselectionType('Category');
              setmode('EDIT');
              dispatch(setModalState(true));
              if (value.qc_status_asset === 'pending') {
                fetchCategoryEditRequest(value.id);
              }
            }}
            categoryDefault={categoryDefault}
            getCategory={getCategory}
            dispatch={dispatch}
            setCategoryDefault={setCategoryDefault}
            onDeleteClick={deleteCategoryAction}
          />
        )}
        {tsType === 'ADD_OFFER' && (
          <FeedGrid
            data={data}
            loadingData={loadingAddOfferData}
            onEditClick={(value) => {
              addOfferDefault.defaultValues={...addOfferDefault.defaultValues,...value}
              addOfferDefault.purpose=""
              setAddOfferDefault({
                ...addOfferDefault
              });
              setmode('EDIT');
              dispatch(setModalState(true));
              if (value.qc_status_asset === 'pending') {
                fetchAddOfferEditRequest(value.id);
              }
            }}
            onDeleteClick={async (id) => {
              await dispatch(deleteOffer(id));
              dispatch(getOffer({ walletId, qc_status: filter }));
            }}
            defaultValue={addOfferDefault}
            setDefaultValue={setAddOfferDefault}
          />
        )}
      </Grid>
      <CommonModal
        open={modalState}
        onClose={() => dispatch(setModalState(false))}
        width="60%"
        title={getSelectionType(mode, tsType)}
        purpose={mode === 'EDIT' ? 'EDIT' : mode === 'CREATE' ? 'CREATE' : null}
        titleColor={
          mode === 'EDIT' ? '#8C7CF0' : mode === 'CREATE' ? '#11d67e' : 'grey'
        }
        color={
          mode === 'EDIT' ? '#8C7CF0' : mode === 'CREATE' ? '#11d67e' : 'error'
        }
      >
        {mode === 'EDIT' ? (
          <>
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab value="live_asset" label="Showing Live asset details" />
                {(editCategoryDefault.purpose === 'update' ||
                  editProdDefault.purpose === 'update' ||
                  editFeedDefault.purpose === 'update' ||
                  editAddOfferDefault.purpose === 'update') && (
                  <Tab
                    value="edit_asset"
                    label="Showing Edit Request details"
                  />
                )}
              </Tabs>
            </Box>
            {activeTab === 'live_asset' && (
              <>
                {tsType === 'WALLET_FEED' && (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{
                      margin: '30px 0 0'
                    }}
                  >
                    <FormControl>
                      <InputLabel id="demo-multiple-chip-label">
                        Select Offer
                      </InputLabel>
                      <Select
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formType}
                        label="Form Type"
                        onChange={handleChange}
                        style={{
                          height: '50px',
                          width: '200px'
                        }}
                      >
                        <MenuItem value={'SINGLE_OFFER_TYPE'}>
                          Single Offer
                        </MenuItem>
                        <MenuItem value={'DOUBLE_OFFER_TYPE'}>
                          Double Offer
                        </MenuItem>
                        <MenuItem value={'SINGLE_VIDEO_TYPE'}>
                          Single Video
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {/* {selectionType === 'Feed' || createType === 'Add_Feed' ? (
          <Feed feedType={formType} />
        ) : ( */}

                {tsType === 'WALLET_FEED' &&
                formType === 'DOUBLE_OFFER_TYPE' ? (
                  renderMSForm()
                ) : (
                  <CommonForm
                    containerStyle={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: '30px',
                      backgroundColor: '#070C27',
                      borderWidth: '1px',
                      borderColor: '#111633',
                      borderRadius: '10px',
                      collectionName: 'subcategory'
                    }}
                    categoryListData={categoryListData}
                    subCategoryListData={subCategoryListData}
                    themeListData={themeListData}
                    tagListData={tagListData}
                    genderOption={genderOption}
                    onWithdrawClick={(id: number) => {
                      if (tsType === 'WALLET_CATEGORY') {
                        categoryWithDraw(id);
                      } else if (tsType === 'WALLET_PRODUCT') {
                        prodWithDraw(id);
                      } else if (tsType === 'WALLET_FEED') {
                        feedWithDraw(id);
                      } else if (tsType === 'ADD_OFFER') {
                        addOfferWithDraw(id);
                      } else {
                      }
                    }}
                    onApproveClick={(id) => {
                      console.log(id);
                    }}
                    onRejectClick={(id) => {
                      console.log('reject id', id);
                    }}
                    disabled={
                      categoryDefault.defaultValues.qc_status_asset ===
                        'pending' ||
                      // &&
                      // categoryDefault.defaultValues.qc_status ===
                      //   'approved'
                      prodDefault.defaultValues.qc_status_asset === 'pending' ||
                      // &&
                      // prodDefault.defaultValues.qc_status === 'approved'
                      feedDefault.defaultValues.qc_status_asset === 'pending' ||
                      // &&
                      // feedDefault.defaultValues.qc_status === 'approved'
                      addOfferDefault.defaultValues.qc_status_asset ===
                        'pending'
                      // &&
                      // addOfferDefault.defaultValues.qc_status === 'approved'
                        ? true
                        : categoryDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // categoryDefault.defaultValues.qc_status ===
                          //   'pending'
                          prodDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // prodDefault.defaultValues.qc_status ===
                          //   'pending'
                          feedDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // feedDefault.defaultValues.qc_status ===
                          //   'pending'
                          addOfferDefault.defaultValues.qc_status_asset ===
                            'pending'
                          // &&
                          // addOfferDefault.defaultValues.qc_status ===
                          //   'pending'
                        ? true
                        : false
                    }
                    activeTab={activeTab}
                    defaultValues={
                      tsType === 'WALLET_CATEGORY'
                        ? activeTab === 'edit_asset'
                          ? editCategoryDefault
                          : categoryDefault
                        : tsType === 'WALLET_PRODUCT'
                        ? activeTab === 'edit_asset'
                          ? editProdDefault
                          : prodDefault
                        : tsType === 'WALLET_FEED'
                        ? activeTab === 'edit_asset'
                          ? editFeedDefault
                          : feedDefault
                        : tsType === 'ADD_OFFER'
                        ? activeTab === 'edit_asset'
                          ? editAddOfferDefault
                          : addOfferDefault
                        : null
                    }
                    mode={mode}
                    setProdDefault={setProdDefault}
                    setCategoryDefault={setCategoryDefault}
                    setUploadFilePath={setUploadFilePath}
                    uploadFilePath={uploadFilePath}
                    onSubmitForm={onFormSubmit}
                    onResetForm={onResetForm}
                    template={
                      tsType === 'WALLET_FEED' &&
                      formType === 'SINGLE_OFFER_TYPE'
                        ? singleOfferOne
                        : tsType === 'WALLET_FEED' &&
                          formType === 'SINGLE_VIDEO_TYPE'
                        ? singleVideo
                        : tsType === 'WALLET_PRODUCT'
                        ? productTemplate
                        : tsType === 'WALLET_CATEGORY'
                        ? categoryTemplate
                        : tsType === 'ADD_OFFER'
                        ? addOfferTemplate
                        : null
                    }
                  />
                )}
              </>
            )}
            {activeTab === 'edit_asset' && (
              <>
                {tsType === 'WALLET_FEED' && (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{
                      margin: 5
                    }}
                  >
                    <FormControl>
                      <InputLabel id="demo-multiple-chip-label">
                        Select Offer
                      </InputLabel>
                      <Select
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formType}
                        label="Form Type"
                        onChange={handleChange}
                        style={{
                          height: '50px',
                          width: '200px'
                        }}
                      >
                        <MenuItem value={'SINGLE_OFFER_TYPE'}>
                          Single Offer
                        </MenuItem>
                        <MenuItem value={'DOUBLE_OFFER_TYPE'}>
                          Double Offer
                        </MenuItem>
                        <MenuItem value={'SINGLE_VIDEO_TYPE'}>
                          Single Video
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {/* {selectionType === 'Feed' || createType === 'Add_Feed' ? (
          <Feed feedType={formType} />
        ) : ( */}

                {tsType === 'WALLET_FEED' &&
                formType === 'DOUBLE_OFFER_TYPE' ? (
                  renderMSForm()
                ) : (
                  <CommonForm
                    containerStyle={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: '30px',
                      backgroundColor: '#070C27',
                      borderWidth: '1px',
                      borderColor: '#111633',
                      borderRadius: '10px',
                      collectionName: 'subcategory'
                    }}
                    categoryListData={categoryListData}
                    subCategoryListData={subCategoryListData}
                    themeListData={themeListData}
                    tagListData={tagListData}
                    genderOption={genderOption}
                    onWithdrawClick={(id: number) => {
                      if (tsType === 'WALLET_CATEGORY') {
                        categoryWithDraw(id);
                      } else if (tsType === 'WALLET_PRODUCT') {
                        prodWithDraw(id);
                      } else if (tsType === 'WALLET_FEED') {
                        feedWithDraw(id);
                      } else if (tsType === 'ADD_OFFER') {
                        addOfferWithDraw(id);
                      } else {
                      }
                    }}
                    onApproveClick={(id) => {
                      approveProduct(id);
                      console.log(id);
                    }}
                    onRejectClick={(id) => {
                      rejectProduct(id);
                      console.log('reject id', id);
                    }}
                    defaultValues={
                      tsType === 'WALLET_CATEGORY'
                        ? activeTab === 'edit_asset'
                          ? editCategoryDefault
                          : categoryDefault
                        : tsType === 'WALLET_PRODUCT'
                        ? activeTab === 'edit_asset'
                          ? editProdDefault
                          : prodDefault
                        : tsType === 'WALLET_FEED'
                        ? activeTab === 'edit_asset'
                          ? editFeedDefault
                          : feedDefault
                        : tsType === 'ADD_OFFER'
                        ? activeTab === 'edit_asset'
                          ? editAddOfferDefault
                          : addOfferDefault
                        : null
                    }
                    mode={mode}
                    disabled={
                      categoryDefault.defaultValues.qc_status_asset ===
                        'pending' ||
                      // &&
                      // categoryDefault.defaultValues.qc_status ===
                      //   'approved'
                      prodDefault.defaultValues.qc_status_asset === 'pending' ||
                      // &&
                      // prodDefault.defaultValues.qc_status === 'approved'
                      feedDefault.defaultValues.qc_status_asset === 'pending' ||
                      // &&
                      // feedDefault.defaultValues.qc_status === 'approved'
                      addOfferDefault.defaultValues.qc_status_asset ===
                        'pending'
                      // &&
                      // addOfferDefault.defaultValues.qc_status === 'approved'
                        ? true
                        : categoryDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // categoryDefault.defaultValues.qc_status ===
                          //   'pending'
                          prodDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // prodDefault.defaultValues.qc_status ===
                          //   'pending'
                          feedDefault.defaultValues.qc_status_asset ===
                            'pending' ||
                          // &&
                          // feedDefault.defaultValues.qc_status ===
                          //   'pending'
                          addOfferDefault.defaultValues.qc_status_asset ===
                            'pending'
                          // &&
                          // addOfferDefault.defaultValues.qc_status ===
                          //   'pending'
                        ? true
                        : false
                    }
                    activeTab={activeTab}
                    setProdDefault={setProdDefault}
                    setCategoryDefault={setCategoryDefault}
                    setUploadFilePath={setUploadFilePath}
                    uploadFilePath={uploadFilePath}
                    onSubmitForm={onFormSubmit}
                    onResetForm={onResetForm}
                    template={
                      tsType === 'WALLET_FEED' &&
                      formType === 'SINGLE_OFFER_TYPE'
                        ? singleOfferOne
                        : tsType === 'WALLET_FEED' &&
                          formType === 'SINGLE_VIDEO_TYPE'
                        ? singleVideo
                        : tsType === 'WALLET_PRODUCT'
                        ? productTemplate
                        : tsType === 'WALLET_CATEGORY'
                        ? categoryTemplate
                        : tsType === 'ADD_OFFER'
                        ? addOfferTemplate
                        : null
                    }
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {tsType === 'WALLET_FEED' && (
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                style={{
                  margin: 5
                }}
              >
                <FormControl>
                  <InputLabel id="demo-multiple-chip-label">
                    Select Offer
                  </InputLabel>
                  <Select
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formType}
                    label="Form Type"
                    onChange={handleChange}
                    style={{
                      height: '50px',
                      width: '200px'
                    }}
                  >
                    <MenuItem value={'SINGLE_OFFER_TYPE'}>
                      Single Offer
                    </MenuItem>
                    <MenuItem value={'DOUBLE_OFFER_TYPE'}>
                      Double Offer
                    </MenuItem>
                    <MenuItem value={'SINGLE_VIDEO_TYPE'}>
                      Single Video
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {/* {selectionType === 'Feed' || createType === 'Add_Feed' ? (
          <Feed feedType={formType} />
        ) : ( */}

            {tsType === 'WALLET_FEED' && formType === 'DOUBLE_OFFER_TYPE' ? (
              renderMSForm()
            ) : (
              <CommonForm
                containerStyle={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: '30px',
                  backgroundColor: '#070C27',
                  borderWidth: '1px',
                  borderColor: '#111633',
                  borderRadius: '10px',
                  collectionName: 'subcategory'
                }}
                categoryListData={categoryListData}
                subCategoryListData={subCategoryListData}
                themeListData={themeListData}
                tagListData={tagListData}
                genderOption={genderOption}
                onWithdrawClick={(id: number) => {
                  console.log(id);
                }}
                defaultValues={
                  tsType === 'WALLET_CATEGORY'
                    ? categoryDefault
                    : tsType === 'WALLET_PRODUCT'
                    ? prodDefault
                    : tsType === 'WALLET_FEED'
                    ? feedDefault
                    : tsType === 'ADD_OFFER'
                    ? addOfferDefault
                    : null
                }
                disabled={false}
                mode={mode}
                activeTab={activeTab}
                setProdDefault={setProdDefault}
                setCategoryDefault={setCategoryDefault}
                setUploadFilePath={setUploadFilePath}
                uploadFilePath={uploadFilePath}
                onSubmitForm={onFormSubmit}
                onResetForm={onResetForm}
                template={
                  tsType === 'WALLET_FEED' && formType === 'SINGLE_OFFER_TYPE'
                    ? singleOfferOne
                    : tsType === 'WALLET_FEED' &&
                      formType === 'SINGLE_VIDEO_TYPE'
                    ? singleVideo
                    : tsType === 'WALLET_PRODUCT'
                    ? productTemplate
                    : tsType === 'WALLET_CATEGORY'
                    ? categoryTemplate
                    : tsType === 'ADD_OFFER'
                    ? addOfferTemplate
                    : null
                }
              />
            )}
          </>
        )}
      </CommonModal>
    </>
  );
};

export default TaskSearch;
