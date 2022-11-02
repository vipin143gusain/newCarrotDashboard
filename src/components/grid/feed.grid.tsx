import FeedCard from '@/components/feed_card.component';
import { NoDataFound } from '@/styles/noDataFound';
import { CommonGridActions } from '@/utils/grid_actions';
import { Skeleton } from '@mui/material';

export interface FeedGridProps {
  data?: Array<{
    OfferTypes: string;
    image: string;
    secondary_image?: string;
    title: string;
    name?: string;
    logo: string;
    media_type: string;
    qc_status_asset: string;
    widget_type?: any;
    video_thumbnail?: any;
    media_file: string;
    display_order?: number;
    description: string;
    id: number;
  }>;
  defaultValue?: any;
  setDefaultValue?: any;
  qc_status_asset?: string;
  loadingData?: any;
}

const FeedGrid = (props: FeedGridProps & CommonGridActions) => {
  const { data, onEditClick, onDeleteClick, defaultValue, loadingData } = props;

  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <>
      {loadingData ? (
   
     <Skeleton>
      <FeedCard
      key={'random'}
      id={1}
      type={'widget_type'}
      secondary_image={'i.secondary_image'}
    
      title={'i.name || i.title'}
      feed_id={'i.display_order'}
      logo={'i.logo'}
      description={'i.description'}
      cardInfo={'i'}
      qc_status_asset={'i.qc_status_asset'}
      defaultValue={defaultValue}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      />
     </Skeleton>
    

      ) : (
        data &&
        data.map((i) => (
          <FeedCard
            key={i.id}
            id={i.id}
            type={i.widget_type}
            secondary_image={i.secondary_image}
            image={`${IMAGE_URL}${
              i?.image
                ? i.image
                : i.widget_type === 'single_video'
                ? i.video_thumbnail
                : i.media_file
            }`}
            title={i.name || i.title}
            feed_id={i.display_order}
            logo={i.logo}
            description={i.description}
            cardInfo={i}
            qc_status_asset={i.qc_status_asset}
            defaultValue={defaultValue}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))
      )}
      {!loadingData && data && data.length === 0 && (
        <NoDataFound>
          <p>--------------------- No Data Found ---------------------</p>
        </NoDataFound>
      )}
    </>
  );
};

export default FeedGrid;
