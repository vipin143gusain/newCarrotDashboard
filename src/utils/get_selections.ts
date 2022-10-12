import { BrandTabTypes } from "@/models/types/brand_tabtype";
export  const getSelectionType = (mode:string,selectionType:BrandTabTypes) => {
    let title = '';
    switch (mode) {
      case 'EDIT':
        switch (selectionType) {
          case "WALLET_PRODUCT":
            title = 'Updating this Product Item';
            break;

          case "WALLET_CATEGORY":
            title = 'Updating this Category Item';
            break;

          case "WALLET_FEED":
            title = 'Updating this Feed Item';
            break;
          case "ADD_OFFER":
            title = 'Updating this Offer Item';
            break;
        }
        break;

      case 'CREATE':
        switch (selectionType) {
          case "WALLET_PRODUCT":
            title = 'Lets add a new Product Item';
            break;

          case 'WALLET_CATEGORY':
            title = 'Lets add a new Category Item';
            break;

          case 'WALLET_FEED':
            title = 'Lets add a new Feed Item';
            break;
          case 'ADD_OFFER':
            title = 'Lets add a new Offer Item';
            break;
        }
    }

    console.log(title);
    return title;
  };