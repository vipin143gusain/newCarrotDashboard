import { Box, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';


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
  const { fieldData, formTitle, handleFileChange } = props;

  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log('FROM WATCHER', value, name, type)
    );
    return () => subscription.unsubscribe();
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

  console.log(errors);
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
          return (
            <Controller
              control={control ? control : null}
              key={i.name}
              name={i.name}
              rules={i.rules}
              render={({ field }) => (
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
                  helperText={errors[i.name]?.message.toString()}
                />
              )}
            />
          );
        })}
      </Grid>
    </>
  );
};
