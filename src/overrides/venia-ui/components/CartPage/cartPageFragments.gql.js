import { gql } from '@apollo/client';

import { GiftCardFragment } from '@magento/venia-ui/lib/components/CartPage/GiftCards/giftCardFragments';
import { ProductListingFragment } from '@magento/venia-ui/lib/components/CartPage/ProductListing/productListingFragments';
import { PriceSummaryFragment } from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummaryFragments';
import { AppliedCouponsFragment } from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCodeFragments';

export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        is_virtual
        ...AppliedCouponsFragment
        ...GiftCardFragment
        ...ProductListingFragment
        ...PriceSummaryFragment
    }
    ${AppliedCouponsFragment}
    ${GiftCardFragment}
    ${ProductListingFragment}
    ${PriceSummaryFragment}
`;
