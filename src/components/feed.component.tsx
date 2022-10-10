import { singleOfferOne } from '@/models/templates/forms/feed_page/single_offer';
import { OfferTypes } from '@/models/types/offers';
import { CommonForm } from '../CommonForm/common_form';

interface FeedProps {
  feedType: OfferTypes;
  defaultFeedValues?: any;
}
const Feed = (props: FeedProps) => {
  const { feedType, defaultFeedValues } = props;

  const toggleFeedType = () => {
    switch (feedType) {
      case 'SINGLE_OFFER_TYPE':
        return (
          <>
            <CommonForm
              template={singleOfferOne}
              onSubmitForm={() => console.log('Form Submitted')}
              defaultValues={defaultFeedValues}
              onResetForm={() => console.log('REset')}
            />
          </>
        );

      case 'DOUBLE_OFFER_TYPE':
        return (<>DOUBLE_OFFER_TYPE</>);

      case 'SINGLE_VIDEO_TYPE':
        // return (
        //   <>
        //     <CommonForm
        //       template={singleVideo}
        //       onSubmitForm={() => console.log('Form Submitted')}
        //       defaultValues={defaultFeedValues}
        //       onResetForm={() => console.log('REset')}
        //     />
        //   </>
        // );
        return( <>SINGLE_VIDEO_TYPE</>)

      default:
        return <p>Unknown Feed Type</p>;
    }
  };
  return <>{toggleFeedType()}</>;
};

export default Feed;
