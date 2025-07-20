import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OverViewTab from './OverViewTab';
import TourGuideTab from './TourGuideTab';
const AllTab = () => {
    return (
        <div>
             <Tabs>
    <TabList>
      <Tab>Overview Our packages</Tab>
      <Tab>See Our Tour Guides</Tab>
    </TabList>

    <TabPanel>
      <OverViewTab></OverViewTab>
    </TabPanel>
    <TabPanel>
      <TourGuideTab></TourGuideTab>
    </TabPanel>
  </Tabs> 
        </div>
    );
};

export default AllTab;