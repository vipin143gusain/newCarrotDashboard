//@ts-nocheck
import { _serveAPI } from '@/api/service';
import CommonModal from '@/components/common_modal.component';
import { ControlledForm } from '@/components/controlled_form.component';
import MultiPartForm from '@/components/multi_step_form.component';
import { ProfileCoverProps } from '@/models/interfaces/ProfileCoverInterface/about';
import { allSteps } from '@/models/templates/forms/about_page/all_steps';
import { BrandOne } from '@/models/templates/forms/about_page/brand_page_one';
import { BrandPageTwo } from '@/models/templates/forms/about_page/brand_page_two';
import { adminPageThree } from '@/models/templates/forms/about_page/admin_page_three';
import { getBrand, updateBrand, UPDATE_BRAND } from '@/store/slices/brand';
import { getFileUpload, setBanner, setLogo } from '@/store/slices/file_upload';
import { getModalState, setModalState } from '@/store/slices/modal_watcher';
import { fileUpload as fileUploadApi } from '@/utils/common_upload_image';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import {
  categoryList,
  subCategoryList,
} from '@/store/slices/feed';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AvatarWrapper,
  ButtonUploadWrapper,
  CardCover,
  CardCoverAction
} from '../styles/about';

const ProfileCover = (props: ProfileCoverProps) => {
  const { user, onProfileImageClick, onCoverImageClick } = props;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const modalState = useSelector(getModalState);
  const fileUpload = useSelector(getFileUpload);
  const categoryListData = useSelector(categoryList);
  const subCategoryListData = useSelector(subCategoryList);

  const _theBrand = useSelector((state) => state.brand.brand);
  const loading = useSelector((state) => state.brand.loading);
  const error = useSelector((state) => state.brand.error);
  // const { brand, loading, error } = useSelector((state) => state.brand.brand)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [abtValues, setAbtValues] = useState({
    defaultValues: {
      name: '',
      about: '',
      description: '',
      tags: '',
      website_url: '',
      brand_colour: '',
      primary_offer: '',
      banner: '',
      logo: ''
    }
  });

  const handleFileChange = async (e: any) => {
    try {
      const s3Detail = await fileUploadApi(
        e.target.files[0],
        'subcategory',
        'images',
        ''
      );

      if (e.target.name === 'logo') {
        dispatch(setLogo(`${IMAGE_URL}${s3Detail.path}`));
      } else if (e.target.name === 'banner') {
        dispatch(setBanner(`${IMAGE_URL}${s3Detail.path}`));
      }
    } catch (error) {}
  };


  //THIS IS IMPORTANT
  const stepsData = [
    {
      id: 1,
      renderForm: (
        <ControlledForm
          fieldData={BrandOne}
          defaultValue={BrandOne}
          formTitle="Here we generally define the identity of your brand."
          handleFileChange={handleFileChange}
          categoryListData={categoryListData}
        subCategoryListData={subCategoryListData}
        />
      )
    },
    {
      id: 2,
      renderForm: (
        <ControlledForm
          fieldData={BrandPageTwo}
          defaultValue={BrandPageTwo}
          formTitle="Your uniqueness for the user."
          handleFileChange={handleFileChange}
          categoryListData={categoryListData}
          subCategoryListData={subCategoryListData}
        />
      )
    },
    {
      id: 3,
      renderForm: (
        <ControlledForm
          fieldData={adminPageThree}
          defaultValue={adminPageThree}
          formTitle="Your uniqueness for the user."
          handleFileChange={handleFileChange}
          categoryListData={categoryListData}
        subCategoryListData={subCategoryListData}
        />
      )
    },
  ];

  const handleNext = async (values) => {
    try {
      if (activeStep == allSteps.length - 1) {
        setActiveStep(activeStep + 1);

        console.log('last step');

        let payload = {
          ...values,
          website_url: values.website_url,
          banner_file_key: fileUpload.banner.split(IMAGE_URL)[1],
          logo_file_key: fileUpload.logo.split(IMAGE_URL)[1],
          walletid: _theBrand.walletid,
          id: _theBrand.id
        };
        payload.logo_file_key=payload.logo_file_key?payload.logo_file_key:payload.logo_file_key_edit;
        payload.banner_file_key=payload.banner_file_key?payload.banner_file_key:payload.banner_file_key_edit;

        // Object.keys(payload).map((el) => {
        //   if ((payload[`${el}`] == null)||(payload[`${el}`] == "")) {
        //     delete payload[`${el}`];
        //   }
        // });
        console.log(payload);

        if (_theBrand?.walletid) {
          // await updateWalletByToken(payload);
          await dispatch(updateBrand(payload));
          dispatch(getBrand());
        } else {
          await _serveAPI({
            endPoint: '/admin/wallet/create',
            method: 'POST',
            data: payload
          });
        
        }

       
        setIsComplete(true);

        let timeOut;
        timeOut = setTimeout(()=>{
          dispatch(setModalState(false));
          setActiveStep(0);
          setIsComplete(false);
          setediting(false)
          if(timeOut){
            clearTimeout(timeOut)
          }

        },2000)

      } else {
        setActiveStep(activeStep + 1);
        // console.log('first step');
        // console.log({
        //   ...values,
        //   banner: fileUpload.banner,
        //   logo: fileUpload.logo
        // });
        // dispatch(
        //   UPDATE_BRAND({
        //     about: values.about,
        //     name: values.name,
        //     description: values.description,
        //     tags: values.tags,
        //     website_url: values.website_url
        //     // banner: fileUpload.banner,
        //     // logo: fileUpload.logo,
        //   })
        // );
      }
    } catch (error) {
      console.log('api failed',error.message);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    // console.log('Brand', _theBrand);
  }, [_theBrand]);
  // Checking the available redux state
  useEffect(() => {
    if (_theBrand?.name !== '') {
      setAbtValues({
        defaultValues: {
          name: _theBrand?.name,
          about: _theBrand?.about,
          description: _theBrand?.description,
          tags: _theBrand?.tags,
          website_url: _theBrand?.website_url,
          brand_colour: _theBrand?.brand_colour,
          primary_offer: _theBrand?.primary_offer,
          logo_file_key_edit:_theBrand?.logo_file_key,
          banner_file_key_edit:_theBrand?.banner_file_key
          // banner: _theBrand.banner,
        }
      });
    }
  }, [_theBrand]);

  //renderint updated form
  const renderMSForm = () => {
    // console.log(abtValues);
    return abtValues.defaultValues.name !== '' ? (
      <MultiPartForm
        isFormComplete={isComplete}
        stepData={stepsData}
        allSteps={allSteps}
        handleFileChange={handleFileChange}
        defaultValues={abtValues}
        activeStep={activeStep}
        handleNextBtn={handleNext}
        handleBackBtn={handleBack}
        categoryListData={categoryListData}
        subCategoryListData={categoryListData}
      />
    ) : null;
  };

  const [editing, setediting] = useState(false);

  useEffect(() => {
    // console.log('edit', editing);
    // renderMSForm();
    setActiveStep(0)
  }, [editing,modalState]);

  // useEffect(() => {
  //   fetchBrandDetail();
  // }, []);

  return (
    <>
      <>
     
        {loading && <h2>Loading Your brand...</h2>}
        {loading && error ? <p>Error:{error}</p> : null}
        <Box display="flex" mb={3}></Box>
        {_theBrand?.name !== '' && !loading ? (
          <>
            <CardCover>
              <CardMedia
                image={
                  _theBrand?.banner_file_key
                    ? 'https://d3nk16lz1ssvqj.cloudfront.net/' +
                      _theBrand?.banner_file_key
                    : fileUpload.banner
                    ? fileUpload.banner
                    : user?.coverImg
                }
              />
              <CardCoverAction>
                <Button
                  startIcon={<UploadTwoToneIcon />}
                  variant="contained"
                  component="span"
                  onClick={onCoverImageClick}
                >
                  {user?.banner === '' ? 'Upload Banner' : 'Change Banner'}
                </Button>
              </CardCoverAction>
            </CardCover>
            <AvatarWrapper>
              <Avatar
                variant="rounded"
                alt={user?.name}
                src={
                  _theBrand?.logo_file_key
                    ? 'https://d3nk16lz1ssvqj.cloudfront.net/' +
                      _theBrand?.logo_file_key
                    : fileUpload.logo
                    ? fileUpload.logo
                    : user?.logo
                }
              />
              <ButtonUploadWrapper>
                <IconButton
                  component="span"
                  color="primary"
                  onClick={onProfileImageClick}
                >
                  <UploadTwoToneIcon />
                </IconButton>
              </ButtonUploadWrapper>
            </AvatarWrapper>
          </>
        ) : null}

        <Box>
          <Typography variant="h3" component="h3" gutterBottom marginLeft={2}>
            {user?.name}
          </Typography>
        </Box>
        <Box py={2} pl={2} mb={3}>
          <Typography gutterBottom variant="h4">
            {user?.about}
          </Typography>
          <Typography variant="subtitle2">{user?.description}</Typography>

          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
            marginTop={2}
          >
            <Box>
              {user?.name ? (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ModeEditOutlineTwoToneIcon />}
                  onClick={() => {
                    setediting(() => true), dispatch(setModalState(true));
                  }}
                >
                  Edit
                </Button>
              ) : null}

              {user?.website_url && (
                <Button size="small" sx={{ mx: 1 }} variant="outlined">
                  {user?.website_url}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </>

      <CommonModal
        open={modalState}
        onClose={() => dispatch(setModalState(false))}
        width="60%"
        title={!user?.name ? 'Adding Details' : 'Editing Your Details'}
        purpose="EDIT"
        titleColor="#8C7CF0"
        color="#8C7CF0"
      >
        {renderMSForm()}
      </CommonModal>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
