import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import FittedImage from 'react-fitted-image';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    display: "inline-block"
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: 10,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function ButtonBases(props) {
  const { url, title, width, height } = props;

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width: width, height: height }}>
      <ButtonBase
        focusRipple
        key={title}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <FittedImage
          fit="cover"
          loader={<div>Loading</div>}
          onLoad={(...args) => console.log(...args)}
          onError={(...args) => console.log(...args)}
          src={url}
          className={classes.imageSrc}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            <h2 style={{ color: 'white' }}>
              {title}
            </h2>
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    </div>
  );
}
