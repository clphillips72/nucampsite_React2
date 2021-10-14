import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderDirectoryItem({campsite}) {
    return(
        //The arrow function is being used below only to avoid the extra work of binding 
        //which would be required when not using an arrow function
        <Card>            
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    )
}

/*  The Directory component used to be a class Component, but it has now been changed to be a function(al) component */

// function Directory (props) {

//     const directory = props.campsites.map(campsite => {
//         return(
//             <div key={campsite.id} className="col-md-5 m-1">
//                 <RenderDirectoryItem campsite={campsite} onClick={props.onClick} />
//             </div>                
//         );
//     })

//     return(
//         <div className="container">
//             <div className="row">
//                 {directory}
//             </div>
//         </div>            
//     );
// }  

function Directory ({campsites, onClick}) {     //doing object destructuring here

    const directory = campsites.map(campsite => {
        return(
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>                
        );
    })

    return(
        <div className="container">
            <div className="row">
                {directory}
            </div>
        </div>            
    );
}  

export default Directory;