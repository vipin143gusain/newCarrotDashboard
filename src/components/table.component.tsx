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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import Label from 'src/components/labelNow.component';


interface TableProps {
  gridType: 'CATEGORY' | 'SUBCATEGORY' | 'QC';
  gridHeaders: Array<{ name: string }>;
  data: Array<{
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
  }> | Array<{
    id:number;
    name:string;
    display_order:number;
    small_image:string;
    banner_image: string;
    is_active:number;
    category:Array<{id:number,name:string,is_active:number,small_image:string;search_image:string;banner_image:string}>

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

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState(filters_suited);

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

  return (
    <Card>
      <Box sx={{ mt: 5 }}>
        <Card sx={{ padding: 3 }}>
          <CardHeader
            action={
              <Box width={250}>
                <div
                  style={{
                    width: 250,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<AddCircleIcon />}
                    sx={{
                      borderWidth: '2px',
                      marginRight: '5px',
                      borderColor: '#57CA22',
                      color: '#57CA22',
                      '&:hover': {
                        borderWidth: '2px',
                        borderColor: '#57CA22',
                        bgcolor: '#57CA22',
                        color: '#fff'
                      }
                    }}
                    onClick={onAdd}
                  >
                    Add New
                  </Button>
                  <FormControl variant="outlined">
                    <InputLabel>Show</InputLabel>
                    <Select
                      value={filters.status || 'all'}
                      onChange={handleStatusChange}
                      label="Show"
                      autoWidth
                    >
                      {filters_suited.map((statusOption) => (
                        <MenuItem key={statusOption.id} value={statusOption.id}>
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
                {
                  gridHeaders.map((i)=>(
                    <TableCell>{i.name}</TableCell>
                  ))
                }
                  

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

                      {gridType == 'CATEGORY' ? (
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
                      ) : gridType == 'SUBCATEGORY' ? (
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
                            onClick={onEdit}
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order" arrow>
                          <IconButton
                            onClick={onDelete}
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
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
  );
};

export default GridTable;
