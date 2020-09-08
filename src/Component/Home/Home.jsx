import React, { useEffect, useState }  from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Comments from '../User/Comments';
import {
  BrowserRouter as
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 345,
    marginTop:"20px",
    marginBottom: "30px",
    marginRight:"20px",
    float: "left"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Home = (props) => {
  const { userid } = useParams();
  const {body,id,title} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comments,setComments]= useState([]);
  let picLink= `https://randomuser.me/portraits/men/${id}.jpg`;

    if (id > 99) {
    let randomNumber = Math.round(Math.random() * 100);
    picLink = `https://randomuser.me/portraits/men/${randomNumber}.jpg`;
  }
  useEffect(()=>{
    const url=`https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setComments(data);
      for (let i = 0; i < data.length; i++) {
        comments[i] = data[i];
      }
    })
  },[])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 
  return (
    <>
    <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar className={classes.avatar} src={picLink}>
          
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={title}
      subheader={id}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {body}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <Button variant="contained">
        <Link to={`/about/${id}`}>See Details</Link>
      </Button>
      

      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
            

<h5 align="right" style={{color:"gray"}}> {comments.length} Comments   </h5>

            {
                comments.map(comment =><Comments key={comment.postid} id={comment.id} name={comment.name} email={comment.email} body={comment.body}/>)
            }
      </CardContent>
    </Collapse>
  </Card>
  </>
  );
};

export default Home;