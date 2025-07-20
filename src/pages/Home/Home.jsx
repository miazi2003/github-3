import React from 'react';
import Banner from './Banner/Banner';
import HomeOverview from './websiteOverview section/HomeOverview';
import AllTab from './Tab/AllTab';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeOverview></HomeOverview>
            <AllTab></AllTab>
        </div>
    );
};

export default Home;