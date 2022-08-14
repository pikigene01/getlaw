import React from 'react';
import sponsor_law from '../../imgs/curb.png'
import sponsor_fav from '../../imgs/curbfav.png'

const Sponsors = () => {
    return (
        <div className='lawyers'>
         <div className='lawyers_head '>
         WE WORK WITH OTHER COMMUNITIES AND STARTUPS
     </div>
   <div className='one_grid' style={{display: "flex",alignItems: "center",justifyContent: 'center',padding: "20px"}}>
            <div><img src={sponsor_law} alt=""  style={{width: "70%"}}/></div>
            <div><img src={sponsor_fav} alt="" style={{width: "70%"}}/></div>
        </div>
        </div>
     
    );
}

export default Sponsors;
