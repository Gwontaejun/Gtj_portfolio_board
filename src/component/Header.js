import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import store from '../store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const { header_Background } = props;
  const classes = useStyles();

  return (
    <div className={"header"}>
        <div className={header_Background}>
        <AppBar position="static">
            <Toolbar className={header_Background}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h3" className={classes.title}>
                <Link to="/" style={{color:"white"}}>
                    GTJ
                </Link>
            </Typography>
            <Button color="inherit" onClick={function() {
                store.dispatch({type:'ModeConverter'});
            }}
            >다크모드</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </div>
    </div>
  );
}