import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Comments from "./Comments";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "70ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const UserDetails = () => {
  const { userid } = useParams();
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [comments,setComments]= useState([]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/${userid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(()=>{
    const url=`https://jsonplaceholder.typicode.com/posts/${userid}/comments`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setComments(data);
      for (let i = 0; i < data.length; i++) {
        comments[i] = data[i];
      }
    })
  },[])

  let picLink= `https://randomuser.me/portraits/men/${userid}.jpg`;

    if (userid > 99) {
    let randomNumber = Math.round(Math.random() * 100);
    picLink = `https://randomuser.me/portraits/men/${randomNumber}.jpg`;
  }

  return (
    <Container className="Border" maxWidth="sm">
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {" "}
            <Avatar alt="" src={picLink}></Avatar>{" "}
          </ListItemAvatar>
          <ListItemText
            primary={user.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {" "}
                  Post : {user.id} <br /> <br />{" "}
                </Typography>
                <br />
                {user.body}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Button variant="contained">
        {" "}
        <Link to="/"> Return </Link>{" "}
      </Button>
      <Container maxWidth="sm">
        {" "}
        <Typography paragraph><h5 align="right" style={{color:"gray"}}> {comments.length} Comments </h5></Typography>

            {
                comments.map(comment =><Comments key={comment.postid} id={comment.id} name={comment.name} email={comment.email} body={comment.body}/>)
            }
      </Container>
    </Container>
  );
};

export default UserDetails;
