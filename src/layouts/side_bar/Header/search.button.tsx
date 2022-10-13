import { forwardRef, Ref, useState, ReactElement, ChangeEvent,useCallback  } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { useSelector,useDispatch } from 'react-redux';
import { search, TOGGLE_RESULTS } from '@/store/slices/search';
import { UPDATE_BRAND_SEARCH } from '@/store/slices/brand';
import {throttle,debounce} from 'lodash';
import { _serveAPI } from '@/api/service';


const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const searchData = useSelector(search);
  const openSearchResults = useSelector(search).isResultOpen;


  const testFn = async(val)=>{

    _serveAPI({
      endPoint:"api/admin/wallet/search",
      method:"POST",
      data:{
        name:val
      }
    }).then(res=>{
      if(res.status==="success"){
        setSearchResult(res.data.data)
        return res.data.data
      }else{
        setSearchResult([])
        return []
      }
    })

    
  }

  const searchNow = useCallback(
		throttle(nextValue => testFn(nextValue), 1000),
		[],
	);
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);

    if (event.target.value&&event.target.value.length>=3) {

      searchNow(event.target.value)

      if (!openSearchResults) {
        dispatch(TOGGLE_RESULTS(true)); 

      }
    } else {
      dispatch(TOGGLE_RESULTS(false));
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(TOGGLE_RESULTS(false));
    setSearchValue("")
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(TOGGLE_RESULTS(false));
    setSearchValue("")
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              {/* <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link> */}
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {
                searchResult.map((searchItem)=>(
                  <>
              <ListItem button key={searchItem.id}
              onClick={()=>{
                setSearchValue(searchItem.name)
                dispatch(UPDATE_BRAND_SEARCH(searchItem));
                handleClose()
              }}
               >
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                      src={
                        searchItem?.logo_file_key
                    ? `https://d3nk16lz1ssvqj.cloudfront.net/${searchItem?.logo_file_key}`
                    :
                    <FindInPageTwoToneIcon />
                      }
                    >
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                     {searchItem.name}
                    </Link>
                  </Box>
                  {/* <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    This page contains all the necessary information for
                    managing all hospital staff.
                  </Typography> */}
                </Box>
                {/* <ChevronRightTwoToneIcon /> */}
              </ListItem>
              <Divider sx={{ my: 1 }} component="li" />
              </>

                ) )
              }
              {/* <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Example Projects Application
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    This is yet another search result pointing to a app page.
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem>
              <Divider sx={{ my: 1 }} component="li" />
              <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Search Results Page
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    Choose if you would like to show or not this typography
                    section here...
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem> */}
            </List>
            {/* <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button color="primary">View all search results</Button>
            </Box> */}
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
