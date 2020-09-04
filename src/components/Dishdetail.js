import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModel: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  }

  handleSubmit(dishId, values) {
    console.log(JSON.stringify(values));
    this.props.addComment(dishId, values.rating, values.author, values.comment);
  }

  render() {
    const CommentForm = ({ dishId }) => {
      return (
        <Modal isOpen={this.state.isOpenModel} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm
                onSubmit={(values) => this.handleSubmit(dishId, values)}
              >
                <Row className="from-group mb-0">
                  <Label htmlFor="rating">Rating</Label>
                </Row>
                <Row className="form-group">
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group mb-0">
                  <Label htmlFor="author">Your Name</Label>
                </Row>
                <Row className="form-group">
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Row>
                <Row className="form-group mb-0">
                  <Label htmlFor="comment">Comment</Label>
                </Row>
                <Row className="form-group">
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  ></Control.textarea>
                </Row>

                <Row className="form-group">
                  <Col>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      );
    };

    const RenderDish = ({ dish }) => {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    };

    const RenderComments = ({ comments, dishId }) => {
      const dishComment = comments.map((c) => {
        return (
          <div key={c.id} className="col-12 m-1">
            <ul className="list-unstyled">
              <li>{c.comment}</li>
              <li>
                -- {c.author} ,
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(c.date)))}
              </li>
            </ul>
          </div>
        );
      });
      return (
        <div>
          {dishComment}
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
          <CommentForm dishId={dishId} />
        </div>
      );
    };

    return (
      <div>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={this.props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={this.props.comments}
              dishId={this.props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
