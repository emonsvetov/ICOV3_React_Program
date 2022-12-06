import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
} from "reactstrap";
import StarIcon from "mdi-react/StarFaceIcon";

const RewardItem = (props) => {
  const { name, event, template, from, timestamp, comments } = props.data;
  const [status, setStatus] = React.useState("post");
  return (
    <div className="reward-item ">
      <div className="d-flex justify-content-between">
        <div className="icon">
          <StarIcon size={40} />
        </div>
        <div className="d-flex flex-column">
          <h3>{`${name} has earned a ${event} Award`}</h3>
          <span>{template}</span>
        </div>
        <div className="d-flex flex-column">
          <span>
            From: <strong>{from}</strong>
          </span>
          <span>{timestamp}</span>
        </div>
      </div>

      {comments.map((item, index) => {
        return (
          <Card key={`comment-${index}`} className="w-100 mt-1">
            <CardBody className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>
                  From: <strong>{item.from}</strong>
                </span>
                <span>{item.timestamp}</span>
              </div>
              <div>{item.content}</div>
              <div>
                <span
                  className="cursor-pointer"
                  onClick={() => alert("Are you sure to delete this comment?")}
                >
                  Delete
                </span>
              </div>
            </CardBody>
          </Card>
        );
      })}
      {status == "comment" && (
        <Card className="mt-3">
          <CardHeader>Edit Comment</CardHeader>
          <CardBody contenteditable="true"></CardBody>
        </Card>
      )}
      <ButtonGroup className="w-25 mt-3">
        {status == "post" && (
          <Button
            color="success"
            onClick={() => {
              setStatus("comment");
            }}
          >
            {" "}
            Comment{" "}
          </Button>
        )}
        {status == "comment" && (
          <Button
            color="success"
            onClick={() => {
              setStatus("post");
            }}
          >
            {" "}
            Post{" "}
          </Button>
        )}
        <Button
          color="danger"
          onClick={() => alert("Are you sure to delete this activity?")}
        >
          Delete Activity
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RewardItem;
