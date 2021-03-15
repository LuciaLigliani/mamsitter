import React from 'react';
import '..//App.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tata from '..//tata.jpg';
import viso from '..//viso.jpg';
import viso1 from '..//viso1.jpeg';
import bimbo from '..//bimbo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    height: '30vh',
    width:'130%',
    display: 'block',
    justifyContent: 'center',
    alignItems:'stretch',
    overflow: 'hidden',
    backgroundColor: 'rgb(255, 101, 195);',
  },
  gridList: {
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 
      'linear-gradient(to top, rgb(246, 218, 243) 90%, rgb(246, 218, 243) 90%, rgb(246, 218, 243) 100%)',
  },
  
}));

const ciao = [
     {
       img: tata,
       title: 'Carla Rossi, 24',
       author: 'author',
     },
     {
      img: viso,
      title: 'Carla Rossi, 30',
      author: 'author',
     },
     {
      img: viso1,
      title: 'CArla, 21',
      author: 'author',
     },
   
   ];

function Grid() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <h6><font face='Times New Roman' color='black'>Le babysitter della città:</font></h6>
      <GridList className={classes.gridList} cols={5}>
        {ciao.map((ciao) => (
          <GridListTile key={ciao.img}>
            <img src={ciao.img} alt={ciao.title} />
            <GridListTileBar
              title={ciao.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${ciao.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
            }

export default Grid;