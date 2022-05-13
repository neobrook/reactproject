import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderMenuItem = ({dish, onClick}) => {
    const {id, image, name} = dish;
    return(
        <Card>
            <Link to={`/menu/${id}`} >
                <CardImg width="100%" src={image} alt={name} />
                <CardImgOverlay>
                    <CardTitle>{name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

const Menu = (props) => {
    const {dishes, onClick} = props;
    if(dishes){
        const menu = dishes.map((dish) =>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} onClick={onClick} />
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>   
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }else{
        return(
            <div></div>
        )
    }
}
export default Menu;