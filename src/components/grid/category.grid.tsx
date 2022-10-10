import CommonCard from '@/components/common_card.component';
import * as loaderIcon from '@/public/static/images/loaders/carrot-loader-2x.json';
import { CommonGridActions } from '@/utils/grid_actions';
import Lottie from 'react-lottie';


export interface CategoryGridProps {
  categoryData?:
    | Array<{
        name: string;
        tagline: string;
        display_order: number;
        image: string;
        url: string;
        logo: string;
        id: number;
        description: string;
        title: string;
        qc_status_asset: string;
      }>
    | any;
  setProdDefault?: Function;
  prodDefault?: any;
  categoryDefault?: [];
  setCategoryDefault?: any;
  loadingData?: any;
  dispatch?: any;
}

const CategoryGrid = (props: CategoryGridProps & CommonGridActions) => {
  const {
    categoryData,
    onEditClick,
    onDeleteClick,
    setCategoryDefault,
    dispatch,
    loadingData,
    categoryDefault
  } = props;

  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
  return (
    <>
      {loadingData ? (
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
      ) : (
        // <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
        //   Fetch data
        // </LoadingButton>
        categoryData.map((i) => (
          <CommonCard
            cardType="WALLET_CATEGORY"
            name={i?.name || i?.title || null}
            key={i.id}
            tagline={i?.tagline || i?.description || null}
            url={i.url}
            image={`${IMAGE_URL}${i.image}`}
            order={i.display_order}
            qc_status_asset={i.qc_status_asset}
            // logo={i.logo}
            cardDetail={i}
            onEditClick={onEditClick}
            onDeleteClick={async () => {
              await dispatch(onDeleteClick(i.id));
              // dispatch(getCategory())
            }}
            setProdDefault={setCategoryDefault}
            prodDefault={categoryDefault}
          />
        ))
      )}
      {!loadingData && categoryData && categoryData.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            width: '100%',
            margin: '100px auto',
            display: 'block',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'red'
          }}
        >
          --------------------- No Data Found ---------------------
        </p>
      )}
    </>
  );
};

export default CategoryGrid;
