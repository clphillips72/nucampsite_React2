import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDirectoryItem({campsite}) {
    return(
        <Card>    
            {/* THe Link code below is creating a dynamic link using the campsite id that was passed in to this function, which is the campsite that was clicked on within this page/component */}
            <Link to={`directory/${campsite.id}`}>        
                <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
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

function Directory ({campsites}) {     //doing object destructuring here

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
            <div className="col">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Directory</BreadcrumbItem>
                </Breadcrumb>
                <h2>Directory</h2>
                <hr />
            </div>
        </div>

            <div className="row">
                {directory}
            </div>
        </div>            
    );
}  

export default Directory;