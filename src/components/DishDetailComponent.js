import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleComment = (values) => {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}>✎Submit comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleComment(values)}>
                            <Row className="field">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Control.select>
                            </Row>
                            
                            <Row>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                    model=".author" 
                                    id="author" 
                                    name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators={{required, minLength:minLength(3),maxLength:maxLength(15)}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 numbers',
                                        maxLength: 'Must be 15 numbers or less',
                                    }}
                                />
                            </Row>
                            <br/>
                            <Row>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea 
                                    model=".comment" 
                                    id="comment" name="comment"
                                    rows="6"
                                    className="form-control" 
                                />
                            </Row>
                            <Row>
                                <Button type="submit">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const RenderDish = ({dish}) => {
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

const RenderComments = ({comments, addComment, dishId}) => {
    if(comments){
        const commentList = comments.map(({id, comment, author, date}) => {
            const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)));
            return(
                <div className="list-unstyled" key={id}>
                    <div>{comment}</div>
                    <div>--- {author} {formattedDate}</div>
                </div>
            )
        });
        return(
            <div>
                <h4>Comments</h4>
                <div>{commentList}</div>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}


const DishDetail = (props) => {
    const { dish, comments, addComment } = props;
    console.log(addComment);
    if(dish){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} addComment={addComment} dishId={dish.id}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
};

export default DishDetail;