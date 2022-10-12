import {
  Avatar, Card,
  CardHeader,
  Divider,
  List,
  ListItem, ListItemAvatar, ListItemText, styled,
  Typography, useTheme
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

interface PopularTagsProps {
  display_type: 'tags' | 'category';
  tags?: Array<{ id: number; tag: string }>;
  categories?: Array<{ id: number; category: string; avatar: string }>;
}

const PopularTags = (props: PopularTagsProps) => {
  const { tags, categories, display_type } = props;
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          display_type === 'tags'
            ? 'Your Top Tags'
            : display_type == 'category'
            ? 'Your Top Categories'
            : 'UNDEFINED'
        }
      />
      <Divider />

      {display_type === 'category' ? (
        <ListWrapper>
          {categories.length > 0 ? (
            categories.map((category) => (
              <>
                <ListItem button key={category.id}>
                  <ListItemAvatar key={category.id}>
                    <Avatar
                      src={category.avatar}
                      sx={{
                        width: 38,
                        height: 38,
                        background: `${theme.colors.info.main}`,
                        color: `${theme.palette.info.contrastText}`
                      }}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                      color: `${theme.colors.alpha.black[100]}`
                    }}
                    primary={category.category}
                  />
                </ListItem>
              </>
            ))
          ) : (
            <Typography sx={{ p: 2 }} variant="subtitle2" color="text.primary">
              {' '}
              All your Categories are displayed here
            </Typography>
          )}
        </ListWrapper>
      ) : (
        <>
          <ListWrapper disablePadding>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <ListItem
                  key={tag.id}
                  sx={{
                    color: `${theme.colors.primary.main}`,
                    '&:hover': { color: `${theme.colors.primary.dark}` }
                  }}
                  button
                >
                  <ListItemText key={tag.id} primary={tag.tag} />
                </ListItem>
              ))
            ) : (
              <Typography
                sx={{ p: 2 }}
                variant="subtitle2"
                color="text.primary"
              >
                {' '}
                All your top tags are displayed here
              </Typography>
            )}
          </ListWrapper>
        </>
      )}
    </Card>
  );
};

export default PopularTags;
