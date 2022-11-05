import { _serveAPI } from '@/api/service';
import { carrotCategoryTemplate } from '@/models/templates/Forms/carrot_category/carrot_category_template';
import { carrotSubCategoryTemplate } from '@/models/templates/Forms/carrot_subcategory/carrot_subcategory';
import {
  categoryList,
  getFeedCategory,
  getFeedSubCategory,
  subCategoryList
} from '@/store/slices/feed';
import { getModalState, setModalState } from '@/store/slices/modal_watcher';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Label from 'src/components/labelNow.component';
import { CommonForm } from './common_form.component';
import CommonModal from './common_modal.component';
import { notify } from '@/utils/toaster';
import { ToastContainer } from 'react-toastify';

interface TableProps {
  gridType: 'CATEGORY' | 'SUBCATEGORY' | 'QC';
  gridHeaders: Array<{ name: string }>;
  data:
    | Array<{
        id: number;
        name: string;
        small_image: string;
        display_order: number;
        banner_image: string;
        search_image: string;
        created_by: number;
        created_on: string;
        updated_by: number;
        updated_on: string;
        hexa_colour_code: string;
        is_active: number;
      }>
    | Array<{
        id: number;
        name: string;
        display_order: number;
        small_image: string;
        banner_image: string;
        is_active: number;
        category: Array<{
          id: number;
          name: string;
          is_active: number;
          small_image: string;
          search_image: string;
          banner_image: string;
        }>;
      }>;
  title: string;
  filters_suited: Array<{
    id: string;
    name: string;
  }>;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customStatusLabel?: {};
}

const applyFilters = (arr, filters) => {
  return arr.filter((data) => {
    let matches = true;
    let status = data.is_active == 1 ? 'active' : 'inactive';
    if (filters.status && status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (arr, page, limit) => {
  return arr.slice(page * limit, page * limit + limit);
};

const GridTable = (props: TableProps) => {
  const {
    data,
    title,
    onAdd,
    onEdit,
    onDelete,
    filters_suited,
    customStatusLabel,
    gridType,
    gridHeaders
  } = props;

  const getStatusLabel = (cryptoOrderStatus) => {
    const map = customStatusLabel;

    const { text, color } = map[cryptoOrderStatus];

    return (
      <Label className="helper" color={color}>
        {text}
      </Label>
    );
  };
  const dispatch = useDispatch();
  const categoryListData = useSelector(categoryList);
  const subCategoryListData = useSelector(subCategoryList);
  const [activeTab, setTabValue] = useState('live_asset');
  const modalCurrentState = useSelector(getModalState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setmode] = useState<string>('CREATE');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [carrotCategoryDefault, setCarrotCategoryDefault] = useState({
    purpose: '',
    defaultValues: {
      name: '',
      created_by: 200,
      small_image_key: '',
      banner_image_key: '',
      search_image_key: '',
      display_order: '',
      hexa_colour_code: '',
      is_active: 'InActive',
      id: 0
    }
  });

  const [carrotSubCategoryDefault, setCarrotSubCategoryDefault] = useState({
    purpose: '',
    defaultValues: {
      name: '',
      created_by: 200,
      category: [],
      small_image_key: '',
      small_image_key_edit: '',
      banner_image_key: '',
      banner_image_key_edit: '',
      display_order: '',
      hexa_colour_code: '',
      is_active: 'InActive',
      id: 0
    }
  });

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  1;
  const filteredData = applyFilters(data, filters);
  const paginatedData = applyPagination(filteredData, page, limit);
  const theme = useTheme();

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const onResetForm = (value) => {
    return (value = null);
  };

  const submitCategory = async (value) => {
    try {
      let message;
      setIsSubmitting(true);
      let outVal = {
        ...value
      };
      outVal.small_image_key = carrotCategoryTemplate[1].filePath;
      outVal.banner_image_key = carrotCategoryTemplate[2].filePath;
      outVal.search_image_key = carrotCategoryTemplate[3].filePath;
      outVal.is_active = outVal.is_active === 'Active' ? 1 : 0;
      outVal.created_by = 200;

      if (mode === 'CREATE') {
        let addedC = await _serveAPI({
          endPoint: 'api/category',
          data: outVal,
          method: 'POST'
        });
        message=addedC.message
      } else if (mode === 'EDIT') {
        let editedC = await _serveAPI({
          endPoint: `api/category/${outVal.id}`,
          data: outVal,
          method: 'PUT'
        });
        message=editedC.message
      } else {
        setIsSubmitting(false);
        return null;
      }
      if(message){
        notify("success",message)
      }
      dispatch(getFeedCategory());
      setIsSubmitting(false);
      dispatch(setModalState(false));
    } catch (error) {
      setIsSubmitting(false);
      dispatch(setModalState(false));
    }
  };

  const deleteCategory = async (value) => {
    try {
      let message;
      let outData = {
        deleted_by: 100
      };
      const deletedC = await _serveAPI({
        endPoint: `api/category/${value.id}`,
        data: outData,
        method: 'DELETE'
      });
      message=deletedC.message;
      if(message){
        notify("success",message)
      }
      dispatch(getFeedCategory());
    } catch (error) {}
  };

    const deleteSubCategory = async (value) => {
    try {
      let message;
      let outData = {
        deleted_by: 100
      };
      let deleteSC = await _serveAPI({
        endPoint: `api/subcategory/${value.id}`,
        data: outData,
        method: 'DELETE'
      });
      message=deleteSC.message;
      if(message){
        notify("success",message)
      }
      dispatch(getFeedSubCategory());
    } catch (error) {}
  };

  const submitSubCategory = async (value) => {
    try {
      let message;
      setIsSubmitting(true);
      let outVal = {
        ...value
      };

      outVal.small_image_key = carrotSubCategoryTemplate[1].filePath;
      outVal.banner_image_key = carrotSubCategoryTemplate[2].filePath;
      outVal.is_active = outVal.is_active === 'Active' ? 1 : 0;
      outVal.created_by = 200;
      outVal.category_ids = outVal.category_ids.map((cat) => {
        return { id: cat.id, display_order: cat.display_order };
      });

      console.log(outVal);

      if (mode === 'CREATE') {
        const addedSC = await _serveAPI({
          endPoint: 'api/subcategory',
          data: outVal,
          method: 'POST'
        });
        message=addedSC.message;
      } else if (mode === 'EDIT') {
        outVal.add_category_ids = value.category_ids.map((cat) => {
          return { id: cat.id, display_order: cat.display_order };
        });
        delete outVal.banner_image;
        delete outVal.small_image;
        delete outVal.banner_image_key_edit;
        delete outVal.small_image_key_edit;
        delete outVal.category_ids;
        delete outVal.category;
        delete outVal.created_by;
        outVal.updated_by = 200;
        const editedSC = await _serveAPI({
          endPoint: `api/subcategory/${outVal.id}`,
          data: outVal,
          method: 'PUT'
        });
        message=editedSC.message;
      } else {
        setIsSubmitting(false);
        return null;
      }

      if(message){
        notify("success",message)
      }
      dispatch(getFeedSubCategory());
      setIsSubmitting(false);
      dispatch(setModalState(false));
    } catch (error) {
      dispatch(getFeedSubCategory());
      setIsSubmitting(false);
    }
  };

  const onFormSubmit = async (value) => {
    if (gridType === 'CATEGORY') {
      submitCategory(value);
    } else if (gridType === 'SUBCATEGORY') {
      submitSubCategory(value);
    } else {
      null;
    }
  };

  useEffect(() => {
    if (!modalCurrentState) {
      for (const catDefV in carrotCategoryDefault.defaultValues) {
        carrotCategoryDefault.defaultValues[catDefV] = '';
      }
      carrotCategoryDefault.purpose=""
      setCarrotCategoryDefault({ ...carrotCategoryDefault });

      // for (const subcatDefV in carrotSubCategoryDefault.defaultValues) {
      //   if(Array.isArray(carrotSubCategoryDefault.defaultValues[subcatDefV])){
      //     carrotSubCategoryDefault.defaultValues[subcatDefV]=[]
      //   }else{
      //     carrotSubCategoryDefault.defaultValues[subcatDefV]="";
      //   }
      // }
      // setCarrotSubCategoryDefault({...carrotSubCategoryDefault})
    }
  }, [modalCurrentState, mode]);

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
      <Card>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ padding: 3 }}>
            <CardHeader
              action={
                <Box width={250}>
                  <div
                    style={{
                      width: 250,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<AddCircleIcon />}
                      sx={{
                        borderWidth: "2px",
                        marginRight: "5px",
                        borderColor: "#57CA22",
                        color: "#57CA22",
                        "&:hover": {
                          borderWidth: "2px",
                          borderColor: "#57CA22",
                          bgcolor: "#57CA22",
                          color: "#fff",
                        },
                      }}
                      onClick={() => {
                        setmode("CREATE");
                        dispatch(setModalState(true));
                      }}
                    >
                      Add New
                    </Button>
                    <FormControl variant="outlined">
                      <InputLabel>Show</InputLabel>
                      <Select
                        value={filters.status || "all"}
                        onChange={handleStatusChange}
                        label="Show"
                        autoWidth
                      >
                        {filters_suited.map((statusOption) => (
                          <MenuItem
                            key={statusOption.id}
                            value={statusOption.id}
                          >
                            {statusOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              }
              title={title}
            />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {gridHeaders.map((i) => (
                      <TableCell>{i.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((data) => {
                    return (
                      <TableRow hover key={data.id}>
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {data.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {data.name}
                          </Typography>
                        </TableCell>

                        {gridType == "CATEGORY" ? (
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {data.hexa_colour_code}
                            </Typography>
                          </TableCell>
                        ) : gridType == "SUBCATEGORY" ? (
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {data.category.length > 8 ? (
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  <Chip
                                    sx={{ margin: 0.2 }}
                                    label={data.category[0].name}
                                  />
                                  <Chip
                                    sx={{ margin: 0.2 }}
                                    label={data.category[1].name}
                                  />
                                  <Chip
                                    sx={{ margin: 0.2 }}
                                    label={data.category[2].name}
                                  />
                                  <p>...</p>
                                </Grid>
                              ) : (
                                data.category.map((i) => (
                                  <Chip sx={{ margin: 0.2 }} label={i.name} />
                                ))
                              )}
                            </Typography>
                          </TableCell>
                        ) : null}

                        <TableCell>{getStatusLabel(data.is_active)}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit Order" arrow>
                            <IconButton
                              onClick={() => {
                                setmode("EDIT");
                                setTabValue("edit_asset");
                                dispatch(setModalState(true));
                                if (gridType === "CATEGORY") {
                                  carrotCategoryTemplate[1].filePath =
                                    data.small_image;
                                  carrotCategoryDefault.purpose = "update";
                                  carrotCategoryDefault.defaultValues = data;
                                  carrotCategoryDefault.defaultValues = {
                                    ...carrotCategoryDefault.defaultValues,
                                    is_active:
                                      data.is_active == 1
                                        ? "Active"
                                        : "InActive",
                                  };
                                  setCarrotCategoryDefault({
                                    ...carrotCategoryDefault,
                                  });
                                } else if (gridType === "SUBCATEGORY") {
                                  carrotSubCategoryTemplate[1].filePath =
                                    data.small_image;
                                  carrotSubCategoryTemplate[2].filePath =
                                    data.banner_image;
                                  carrotSubCategoryDefault.purpose = "update";
                                  carrotSubCategoryDefault.defaultValues = data;
                                  carrotSubCategoryDefault.defaultValues = {
                                    ...carrotSubCategoryDefault.defaultValues,
                                    small_image_key_edit: data.small_image,
                                    banner_image_key_edit: data.banner_image,
                                    is_active:
                                      data.is_active == 1
                                        ? "Active"
                                        : "InActive",
                                  };
                                  setCarrotSubCategoryDefault({
                                    ...carrotSubCategoryDefault,
                                  });
                                } else {
                                  null;
                                }
                              }}
                              sx={{
                                "&:hover": {
                                  background: theme.colors.primary.lighter,
                                },
                                color: theme.palette.primary.main,
                              }}
                              color="inherit"
                              size="small"
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Order" arrow>
                            <IconButton
                              onClick={() => {
                                if (gridType === "CATEGORY") {
                                  deleteCategory(data);
                                } else if (gridType === "SUBCATEGORY") {
                                  deleteSubCategory(data);
                                } else {
                                  null;
                                }
                              }}
                              sx={{
                                "&:hover": {
                                  background: theme.colors.error.lighter,
                                },
                                color: theme.palette.error.main,
                              }}
                              color="inherit"
                              size="small"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredData.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30]}
              />
            </Box>
          </Card>
        </Box>
      </Card>

      <CommonModal
        open={modalCurrentState}
        onClose={() => dispatch(setModalState(false))}
        width="60%"
        title={gridType === "CATEGORY" ? "Add Category" : "Add Sub Category"}
        purpose={mode === "EDIT" ? "EDIT" : mode === "CREATE" ? "CREATE" : null}
        titleColor={
          mode === "EDIT" ? "#8C7CF0" : mode === "CREATE" ? "#11d67e" : "grey"
        }
        color={
          mode === "EDIT" ? "#8C7CF0" : mode === "CREATE" ? "#11d67e" : "error"
        }
      >

        {
          mode==="EDIT"&&
          <>
        <Box sx={{ width: "100%", marginTop: "10px" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="live_asset" label="Showing Live asset details" />
            {(carrotCategoryDefault.purpose === "update" ||
              carrotSubCategoryDefault.purpose === "update") && (
              <Tab value="edit_asset" label="Showing Edit Request details" />
            )}
          </Tabs>
        </Box>

        <CommonForm
          containerStyle={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "30px",
            backgroundColor: "#070C27",
            borderWidth: "1px",
            borderColor: "#111633",
            borderRadius: "10px",
            collectionName: "subcategory",
          }}
          isSubmitting={isSubmitting}
          onWithdrawClick={(id: number) => {}}
          onApproveClick={(id) => {}}
          onRejectClick={(id) => {}}
          categoryListData={categoryListData}
          subCategoryListData={subCategoryListData}
          defaultValues={
            gridType === "CATEGORY"
              ? carrotCategoryDefault
              : carrotSubCategoryDefault
          }
          mode={mode}
          disabled={false}
          activeTab={activeTab}
          onSubmitForm={onFormSubmit}
          onResetForm={onResetForm}
          template={
            gridType == "CATEGORY"
              ? carrotCategoryTemplate
              : carrotSubCategoryTemplate
          }
        />
          
          </>
        }



{
  mode==="CREATE"&&
        <CommonForm
          containerStyle={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "30px",
            backgroundColor: "#070C27",
            borderWidth: "1px",
            borderColor: "#111633",
            borderRadius: "10px",
            collectionName: "subcategory",
          }}
          isSubmitting={isSubmitting}
          onWithdrawClick={(id: number) => {}}
          onApproveClick={(id) => {}}
          onRejectClick={(id) => {}}
          categoryListData={categoryListData}
          subCategoryListData={subCategoryListData}
          defaultValues={
            gridType === "CATEGORY"
              ? carrotCategoryDefault
              : carrotSubCategoryDefault
          }
          mode={mode}
          disabled={false}
          activeTab={activeTab}
          onSubmitForm={onFormSubmit}
          onResetForm={onResetForm}
          template={
            gridType == "CATEGORY"
              ? carrotCategoryTemplate
              : carrotSubCategoryTemplate
          }
        />

}
      </CommonModal>
    </>
  );
};

export default GridTable;
