import CommonCard from '@/components/common_card.component';
import * as loaderIcon from '@/public/static/images/loaders/carrot-loader-2x.json';
import { NoDataFound } from '@/styles/noDataFound';
import { CommonGridActions } from '@/utils/grid_actions';
import Lottie from 'react-lottie';

export interface ProductGridProps {
  productData?: Array<{
    name: string;
    order_number: number;
    image: string;
    url: string;
    logo: string;
    value: number;
    price: number;
    attribute: string;
    id: number;
    qc_status_asset: string;
  }>;
  collection_name?: string;
  setEditProduct?: Function;
  setProdDefault?: Function;
  prodDefault?: any;
  dispatch?: any;
  getProduct?: any;
  loadingData?: any;
}

const ProductGrid = (props: ProductGridProps & CommonGridActions) => {
  const {
    productData,
    onEditClick,
    onDeleteClick,
    getProduct,
    // collection_name,
    dispatch,
    setProdDefault,
    prodDefault,
    loadingData
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
        productData.map((i) => (
          <CommonCard
            key={i.id}
            cardType="WALLET_PRODUCT"
            name={i.name}
            url={i.url}
            image={`${IMAGE_URL}${i.image}`}
            order={i.order_number}
            logo={i.logo}
            price={i.price}
            value={i.value}
            qc_status_asset={i.qc_status_asset}
            attribute={i.attribute}
            cardDetail={i}
            onEditClick={onEditClick}
            setProdDefault={setProdDefault}
            prodDefault={prodDefault}
            onDeleteClick={async () => {
              await dispatch(onDeleteClick(i.id));
              dispatch(getProduct());
            }}
          />
        ))
      )}
      {!loadingData && productData && productData.length === 0 && (
        <NoDataFound>
          <p>--------------------- No Data Found ---------------------</p>
        </NoDataFound>
      )}
    </>
  );
};

export default ProductGrid;
  