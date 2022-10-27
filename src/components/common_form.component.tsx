import { getModalState } from '@/store/slices/modal_watcher';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import * as loaderIcon from '@/public/static/images/loaders/carrot-loader-2x.json';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


interface CommonFormProps {
  template: Array<{
    title: string;
    type: string;
    name: string;
    placeholder?: string;
    startIcon?: any;
    validationProps?: any;
    filePath?: string;
    helperText?: any;
  }>;
  // helperText: any;
  onResetForm: any;
  onSubmitForm: any;
  containerStyle?: any;
  setUploadFilePath?: any;
  uploadFilePath?: any;
  // collectionName?: string;
  filePath?: any;
  defaultValues?: any;
  mode?: 'EDIT' | 'CREATE';
  setProdDefault?: any;
  disabled?: boolean;
  onWithdrawClick?: any;
  activeTab?: any;
  categoryListData?: any;
  subCategoryListData?: any;
  themeListData?: any;
  tagListData?: any;
  genderOption?: any;
  onApproveClick?: any;
  onRejectClick?: any;

  //selectValues?: [] | any
}

// const MenuProps = {
//   variant: 'menu',
//   anchorOrigin: {
//     vertical: 'bottom',
//     horizontal: 'left',
//   },
//   transformOrigin: {
//     vertical: 'top',
//     horizontal: 'left',
//   },
//   getContentAnchorEl: null,
// };

export const CommonForm = (props: CommonFormProps) => {
  const {
    isSubmitting,
    template,
    onSubmitForm,
    onWithdrawClick,
    onApproveClick,
    onRejectClick,
    onResetForm,
    containerStyle,
    defaultValues,
    disabled,
    activeTab,
    categoryListData,
    subCategoryListData,
    themeListData,
    tagListData,
    genderOption,
    // collectionName,
    mode
  } = props;

  // console.log('default value',defaultValues)

  const [market, setMarket] = useState({
    category_ids: [],
    gender: '',
    tag_ids: [],
    theme_ids: [],
    sub_category_ids: [],
    start_date:null,
    end_date:null
  });

  // console.log({
  //   categoryListData,
  //   subCategoryListData,
  //   themeListData,
  //   tagListData,
  //   defaultValues,
  //   market,
  // });

  // const selectedOptions = options.filter(
  //   (option) => selectedOptionIds.indexOf(option.id) >= 0
  // );

  let {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    reset,
    setValue,
    control,
    getValues
  } = useForm({ defaultValues: defaultValues, shouldUnregister: true });

  const modalState = useSelector(getModalState);

  useEffect(() => {
    // console.log('MARKETS', market);
    console.log(defaultValues);
  }, [market, defaultValues]);

  useEffect(() => {
    if (mode === 'EDIT') {
      if (defaultValues?.defaultValues) {
        Object.keys(defaultValues.defaultValues).map((el) => {
          setValue(el, defaultValues.defaultValues[`${el}`]);
        });
      }

      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.category_ids_with_name
      ) {
        let categoryDefault = defaultValues.defaultValues.category_ids_with_name
          .split(',')
          .map((el) => {
            let [id, name] = el.split('#');

            return { id: Number(id), name };
          });
        market.category_ids = categoryDefault;
        setMarket({
          ...market
        });
        setValue('category_ids', categoryDefault);
      }

      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.end_date
      ) {
        market.end_date = new Date(defaultValues?.defaultValues?.end_date);
        setMarket({
          ...market
        })
        setValue('end_date', new Date(defaultValues.defaultValues.end_date) )
      }
      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.start_date
      ) {
        market.start_date = new Date(defaultValues?.defaultValues?.start_date);
        setMarket({
          ...market
        })
        setValue('start_date', new Date(defaultValues.defaultValues.start_date) )
      }

      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.gender
      ) {
        market.gender = defaultValues?.defaultValues?.gender;
        setMarket({
          ...market
        });
        setValue('gender', defaultValues?.defaultValues?.gender);
      }

      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.sub_category_ids_with_name
      ) {
        let subCarDefault =
          defaultValues.defaultValues.sub_category_ids_with_name
            .split(',')
            .map((el) => {
              let [id, name] = el.split('#');
              return { id: Number(id), name };
            });

        market.sub_category_ids = subCarDefault;
        setMarket({
          ...market
        });
        setValue('sub_category_ids', subCarDefault);
      }

      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.theme_ids_with_name
      ) {
        let themeDefault = defaultValues.defaultValues.theme_ids_with_name
          .split(',')
          .map((el) => {
            let [id, name] = el.split('#');
            return { id: Number(id), name };
          });
        setValue('theme_ids', themeDefault);
        market.theme_ids = themeDefault;
        setMarket({
          ...market
        });
      }
      if (
        defaultValues?.defaultValues &&
        defaultValues?.defaultValues?.tag_ids_with_name
      ) {
        let tagIdsDefault = defaultValues.defaultValues.tag_ids_with_name
          .split(',')
          .map((el) => {
            let [id, name] = el.split('#');
            return { id: Number(id), name };
          });
        setValue('tag_ids', tagIdsDefault);
        market.tag_ids = tagIdsDefault;
        setMarket({
          ...market
        });
      }
    } else if (mode === 'CREATE') {
      setMarket({
        category_ids: [],
        gender: '',
        tag_ids: [],
        theme_ids: [],
        sub_category_ids: [],
        start_date:new Date(),
        end_date:new Date()
      });
      reset();
      // setValue('start_date',null)
      // setValue('end_date',null)
    } else {
    }

    // const subscription = watch((value, { name, type }) =>
    //   console.log(value, name, type)
    // );
    // return () => subscription.unsubscribe();
  }, [modalState, mode]);
  const renderFields = (fields) => {
    return (
      fields &&
      fields.map((field) => {
        let {
          title,
          type,
          name,
          placeholder,
          startIcon,
          validationProps,
          options,
          multiple
          // key
        } = field;

        // const [market, setMarket] = useState<string[]>([]);

        return (
          <>
            {type === 'file' ? (
              <>
                <TextField
                  style={{ margin: '20px' }}
                  helperText={
                    defaultValues.defaultValues?.image?defaultValues.defaultValues?.image:
                    defaultValues.defaultValues?.media_file?defaultValues.defaultValues?.media_file:
                    errors[name]?.message.toString()
                      ? errors[name]?.message.toString()
                      : fields.filePath
                  }
                  error={errors[name] ? true : null}
                  key={name}
                  contentEditable={disabled}
                  disabled={disabled}
                  sx={{ width: 350, margin: '5px' }}
                  type={type}
                  name={name}
                  label={title}
                  placeholder={placeholder}
                  {...register(name, validationProps)}
                  inputProps={{
                    accept: field?.accept?field.accept:"*",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {startIcon}
                      </InputAdornment>
                      
                    )
                    // readOnly:disabled
                  }}
                />
              </>
            ) : type === 'select' ? (
              <>
                {multiple ? (
                  <Controller
                    render={() => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: '22px 16px 20px 20px'
                        }}
                      >
                        <FormControl>
                          <InputLabel id="demo-multiple-chip-label">
                            {title}
                          </InputLabel>

                          <Select
                            sx={{
                              width: 352,
                              // margin: '22px 16px 20px 20px',
                              padding: '0',
                              height: '56px',
                              border: '2px',
                              borderColor: 'green'
                            }}
                            disabled={disabled}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            label={name}
                            placeholder={name}
                            // helperText={errors[name]?.message}
                            error={errors[name] ? true : null}
                            multiple={multiple}
                            variant="outlined"
                            value={market[`${name}`]}
                            {...register(name, validationProps)}
                            onChange={(event: any) => {
                              setMarket({
                                ...market,
                                [name]: event.target.value
                              });
                              setValue(name, event.target.value);
                            }}
                            renderValue={(selected) => {
                              return (
                                <div>
                                  {selected.map((value) => (
                                    <Chip key={value.name} label={value.name} />
                                  ))}
                                </div>
                              );
                            }}
                          >
                            {name === 'category_ids' &&
                              categoryListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            {name === 'gender' &&
                              genderOption.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {name === 'sub_category_ids' &&
                              subCategoryListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {name === 'theme_ids' &&
                              themeListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            {name === 'tag_ids' &&
                              tagListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {/* {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option?.name?option.name:option}
                        </MenuItem>
                      ))} */}
                          </Select>
                        </FormControl>
                        {errors[name] && (
                          <p
                            style={{
                              color: '#FF1943',
                              marginLeft: '3px',
                              marginTop: '2px',
                              paddingLeft: '9px',
                              fontWeight: 'bold'
                            }}
                          >
                            {errors[name].message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                    name={name}
                    control={control}
                  />
                ) : (
                  <Controller
                    render={() => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: '22px 16px 20px 20px'
                        }}
                      >
                        <FormControl>
                          <InputLabel id="demo-multiple-chip-label">
                            {title}
                          </InputLabel>

                          <Select
                            sx={{
                              width: 352,
                              // margin: '22px 16px 20px 20px',
                              padding: '0',
                              height: '56px',
                              border: '2px',
                              borderColor: 'green'
                            }}
                            disabled={disabled}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            label={name}
                            placeholder={name}
                            // helperText={errors[name]?.message}
                            error={errors[name] ? true : null}
                            multiple={false}
                            variant="outlined"
                            value={market[`${name}`]}
                            {...register(name, validationProps)}
                            onChange={(event: any) => {
                              setMarket({
                                ...market,
                                [name]: event.target.value
                              });
                              setValue(name, event.target.value);
                            }}
                          >
                            {name === 'category_ids' &&
                              categoryListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            {name === 'gender' &&
                              genderOption.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {name === 'sub_category_ids' &&
                              subCategoryListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {name === 'theme_ids' &&
                              themeListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            {name === 'tag_ids' &&
                              tagListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {name === 'video_earn' &&
                              options.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}

                            {/* {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option?.name?option.name:option}
                        </MenuItem>
                      ))} */}
                          </Select>
                        </FormControl>
                        {errors[name] && (
                          <p
                            style={{
                              color: '#FF1943',
                              marginLeft: '3px',
                              marginTop: '3px',
                              paddingLeft: '9px',
                              fontWeight: 'bold'
                            }}
                          >
                            {errors[name].message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                    name={name}
                    control={control}
                  />
                )}
              </>
            ) :type==="date"?(
              <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: '22px 16px 20px 20px'
                        }}
                      >
              <Controller
              render={({ field, ...props })=>(
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={title}
                  inputFormat="MM/DD/YYYY"
                  
                  {...register(name, validationProps)}
                  renderInput={(params) => <TextField 
                    sx={{ width: 350, margin: '5px' }}
                    fullWidth
                    {...params} 
                    />
                  }
                  minDate={name=="end_date"?market.start_date:new Date()}
                  value={market[name]}
                  onChange={(date) => {
                    console.log(name)
                    field.onChange(date);
                    market[name]=date;
                    setMarket({...market})
                    
                  }}
                  // disablePast={true}
                  inputFormat="DD/MM/YYYY"
                  // {...field}
                />
            </LocalizationProvider>

              ) }
              name={name}
              control={control}
              />
              </div>

              ): (
              <TextField
                style={{ margin: '20px' }}
                helperText={errors[name]?.message}
                error={errors[name] ? true : null}
                key={title}
                sx={{ width: 350, margin: '5px' }}
                type={type}
                disabled={disabled}
                name={name}
                id="outlined-required"
                label={name}
                placeholder={placeholder}
                {...register(name, validationProps)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div>{startIcon}</div>
                    </InputAdornment>
                  )
                  // readOnly: disabled
                }}
                {...field}
              >
                <MenuItem value={field.defaultValue}>{field.label}</MenuItem>
                {field.options &&
                  field.options.map((el: { label: string; value: string }) => (
                    <MenuItem key={`select-${el.label}`} value={el.value}>
                      {el.label}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          </>
        );
      })
    );
  };

  if(isSubmitting){
    return (
<Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loaderIcon
      }}
      height={150}
      width={150}
      // isStopped={this.state.isStopped}
      // isPaused={this.state.isPaused}
    />
    )
  }else{
    

  return (
    // <FormProvider {...methods} >
    

    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl>
        <div style={containerStyle}>{
        renderFields(template)}</div>
        <Divider style={{ marginTop: 15 }} />
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          padding={3}
        >
          {
          (mode === 'EDIT' && defaultValues.defaultValues?.qc_status_asset === 'pending') ||
          defaultValues?.purpose === 'update' ||
          defaultValues?.purpose === 'create' ||
          defaultValues?.purpose === 'delete' 
          ? (
            <>
              {
              (activeTab === 'edit_asset' && defaultValues.purpose === 'update') ||
              (activeTab === 'live_asset' && defaultValues.purpose === 'create')||
              (activeTab === 'live_asset' && defaultValues.purpose === 'delete')
                  ? (
                <>
                  <div style={{ width: '100%', float: 'left', color: 'red' }}>
                    <p>
                      {
                        defaultValues.purpose === 'delete'?
                        "Your Withdraw request is already in queue"
                        :
                        "You can withdraw your request to click on the below button"

                      }
                    </p>
                  </div>
                  {
                    defaultValues.purpose === 'delete'?
                    null:
                  <>
                  <Button
                    onClick={() => {
                      onWithdrawClick(defaultValues?.defaultValues.id);
                    }}
                    variant="outlined"
                    startIcon={<CheckCircleTwoToneIcon />}
                    sx={{
                      borderWidth: '1px',
                      // borderColor: '#0cad5d',
                      borderColor: 'red',

                      // color: '#0cad5d',
                      color: 'red',
                      '&:hover': {
                        borderWidth: '1px',
                        borderColor: 'red',
                        // bgcolor: '#0cad5d',
                        bgcolor: 'red',
                        color: '#fff'
                      }
                    }}
                  >
                    Withdraw Request
                  </Button>
                  <Button
                    onClick={() =>
                      onApproveClick(defaultValues?.defaultValues.id)
                    }
                    variant="outlined"
                    startIcon={<CheckCircleTwoToneIcon />}
                    sx={{
                      borderWidth: '1px',
                      borderColor: '#0cad5d',
                      color: '#0cad5d',
                      '&:hover': {
                        borderWidth: '1px',
                        borderColor: '#0cad5d',
                        bgcolor: '#0cad5d',
                        color: '#fff'
                      }
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    sx={{
                      ml: 1
                    }}
                    onClick={() =>
                      onRejectClick(defaultValues?.defaultValues.id)
                    }
                  >
                    Reject
                  </Button>
                  </>
              }
                </>
              ) : null }
            </>) 
          :
           (
            // ======================================================
            
            (activeTab === 'edit_asset' ||
              defaultValues.defaultValues?.qc_status_asset === 'approved' ||
              mode === 'CREATE') && (
              // ||(defaultValues.defaultValues.qc_status_asset === 'approved')
              <>
                <Button
                  type="submit"
                  onClick={handleSubmit(onSubmitForm)}
                  variant="outlined"
                  startIcon={<CheckCircleTwoToneIcon />}
                  sx={{
                    borderWidth: '1px',
                    borderColor: '#0cad5d',
                    color: '#0cad5d',
                    '&:hover': {
                      borderWidth: '1px',
                      borderColor: '#0cad5d',
                      bgcolor: '#0cad5d',
                      color: '#fff'
                    }
                  }}
                >
                  Submit this data
                </Button>
                <Button
                  type="reset"
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  sx={{
                    ml: 1
                  }}
                  onClick={onResetForm}
                >
                  Reset the form
                </Button>
              </>
            )
          )}

          {/* {
          mode==="CREATE"&&
          <>
          <Button
          type="submit"
            onClick={handleSubmit(onSubmitForm)}
            variant="outlined"
            startIcon={<CheckCircleTwoToneIcon />}
            sx={{
              borderWidth: '1px',
              borderColor: '#0cad5d',
              color: '#0cad5d',
              '&:hover': {
                borderWidth: '1px',
                borderColor: '#0cad5d',
                bgcolor: '#0cad5d',
                color: '#fff'
              }
            }}
          >
            Submit this data
          </Button>
          <Button
            type="reset"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            sx={{
              ml: 1
            }}
            onClick={onResetForm}
          >
            Reset the form
          </Button>
          </>

        } */}
        </Grid>
      </FormControl>
    </form>
    

    // </FormProvider>
  );

      }
};
