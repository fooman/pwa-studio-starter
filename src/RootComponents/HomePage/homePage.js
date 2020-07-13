import React from "react";

import HeroComponent from '../../overrides/venia-ui/components/HeroComponent/heroComponent'
import Button from "@magento/venia-ui/lib/components/Button";

const HomePage = () => {
    return (
        <div>
            <HeroComponent/>
            <Button
                priority='high'
            >
                {'View Magento extensions'}
            </Button>
        </div>
    );
}

export default HomePage;
