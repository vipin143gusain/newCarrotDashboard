import { Box, Grid, TextField, Typography,Select,  FormControl,InputLabel,MenuItem,Chip} from '@mui/material';
import { ChangeEvent,useState, useEffect } from 'react';
import { Controller, useFormContext,useForm } from 'react-hook-form';


interface ControlledFormProps {
  fieldData: Array<{
    name?: string;
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    rules?: any;
  }>;

  handleFileChange?: any;
  formTitle?: string;
}

export const ControlledForm = (props: ControlledFormProps) => {
  const { fieldData, formTitle, handleFileChange,categoryListData,
    subCategoryListData, } = props;

  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
    getValues,
  } = useFormContext();

  const [market, setMarket] = useState({
    category_ids: [],
    gender: '',
    tag_ids: [],
    theme_ids: [],
    sub_category_ids: [],
    channels:[]
  });

  useEffect(() => {
    // const subscription = watch((value, { name, type }) =>
    //   console.log('FROM WATCHER', value, name, type)
    // );
    // return () => subscription.unsubscribe();
  }, [watch]);

  let onChangeDest = {
    onChangeVal: (type: string) => {
      if (type == 'file') {
        return {
          onChange: (e: ChangeEvent | any) => {
            handleFileChange(e);
            setValue(e.target.name, e.target.value);
          },
        };
      }
    },
  };

  // console.log(errors);
  return (
    <>
      <Box sx={{ mt: 3, mb: 3, padding: 1 }}>
        <Typography variant="h4">{formTitle}</Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {fieldData.map((i) => {
          if(i.name==="logo"&&getValues('logo_file_key_edit')){
            delete i.rules.required
          }
          if(i.name==="banner"&&getValues('banner_file_key_edit')){
            delete i.rules.required
          }
          return (
            <Controller
              control={control ? control : null}
              key={i.name}
              name={i.name}
              rules={i.rules}
              render={({ field }) => (
                <>
                {
                  i.type==="select"&&(
                    <>

                    {

                      i.multiple?

                        (
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
                              {i.title}
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
                              disabled={i?.disabled}
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              label={i.label}
                              placeholder={i.placeholder}
                              // helperText={errors[name]?.message}
                              error={errors[i.name] ? true : null}
                              multiple={i.multiple}
                              variant="outlined"
                              value={market[`${i.name}`]}
                              // {...register(i.name, validationProps)}
                              onChange={(event: any) => {
                                setMarket({
                                  ...market,
                                  [i.name]: event.target.value
                                });
                                setValue(i.name, event.target.value);
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
                              {i.name === 'category_ids' &&
                                categoryListData.map((option) => (
                                  <MenuItem key={option.id} value={option}>
                                    {option?.name ? option.name : option}
                                  </MenuItem>
                                ))}
                              {i.name === 'channels' &&
                                i.options.map((option) => (
                                  <MenuItem key={option.id} value={option}>
                                    {option?.name ? option.name : option}
                                  </MenuItem>
                                ))}
                              
  
                              {i.name === 'sub_category_ids' &&
                                subCategoryListData.map((option) => (
                                  <MenuItem key={option.id} value={option}>
                                    {option?.name ? option.name : option}
                                  </MenuItem>
                                ))}
  
                            </Select>
                          </FormControl>
                          {errors[i.name] && (
                            <p
                              style={{
                                color: '#FF1943',
                                marginLeft: '3px',
                                marginTop: '2px',
                                paddingLeft: '9px',
                                fontWeight: 'bold'
                              }}
                            >
                              {errors[i.name].message.toString()}
                            </p>
                          )}
                        </div>
                      )}
                      name={i.name}
                      control={control}
                    />
                        
                      )

                      :
                      (
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
                            {i.title}
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
                           
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            label={i.label}
                            placeholder={i.placeholder }
                            // helperText={errors[name]?.message}
                            error={errors[i.name] ? true : null}
                            multiple={false}
                            variant="outlined"
                            value={market[`${name}`]}
                            // {...register(i.name, validationProps)}
                            onChange={(event: any) => {
                              setMarket({
                                ...market,
                                [i.name]: event.target.value
                              });
                              setValue(i.name, event.target.value);
                            }}
                          >
                            {i.name === 'price_rating' &&
                              i.options.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            {i.name === 'brand_rating' &&
                              i.options.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}

                            {i.name === 'category_ids' &&
                              categoryListData.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                  {option?.name ? option.name : option}
                                </MenuItem>
                              ))}
                            

                            {i.name === 'sub_category_ids' &&
                              subCategoryListData.map((option) => (
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
                        {errors[i.name] && (
                          <p
                            style={{
                              color: '#FF1943',
                              marginLeft: '3px',
                              marginTop: '3px',
                              paddingLeft: '9px',
                              fontWeight: 'bold'
                            }}
                          >
                            {errors[i.name].message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                    name={name}
                    control={control}
                  />
                      )


                    }
                    </>

                  )
                }
                {
                  ((i.type==="text")||(i.type==="file"))&&
                  <TextField
                    inputProps={{ accept: 'image/png, image/jpeg' }}
                    id={i.id}
                    type={i.type}
                    label={i.label}
                    variant="outlined"
                    sx={{ width: 350, margin: '10px' }}
                    placeholder={i.placeholder}
                    {...register(i.name)}
                    fullWidth
                    margin="normal"
                    {...field}
                    {...onChangeDest.onChangeVal(i.type)}
                    error={Boolean(errors?.[i.name])}
                    helperText={
                      field.name==="logo"?
                    getValues('logo_file_key_edit'):
                    field.name==="banner"?getValues('banner_file_key_edit'):
                      errors[i.name]?.message.toString()
                    
                    }
                  />

                }
                
              
                </>
              )}
            />
          );
        })}
      </Grid>
    </>
  );
};
