import React from 'react';

import './Homepage.scss';
import BasicTable from '../Component/Table';

const Homepage = () => {
     return (
          <div className="homepage-outer">
               <div className="table-outer">
                    <BasicTable />
               </div>
          </div>
     );
};

export default Homepage;
