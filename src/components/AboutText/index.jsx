import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
import Header from '../Header';
import { Container } from '@material-ui/core';

export default function AboutText(props) {


  const useStyles = makeStyles((theme) => ({
    p: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'monospace',
    color: 'white',
    fontSize: '15px',
    }, 
    }));

    const classes = useStyles()

    return(
        <div>
          <Header {...props}/>

          <div className="dashboardAbout" >
              <div className="box-1">
                <h2>Nosso Prduto:</h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum convallis rhoncus. Vivamus cursus ligula a erat dictum eleifend. Sed at erat eget leo pulvinar cursus in et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue ante id bibendum semper. In sagittis ut quam ut rutrum. Sed ac finibus urna, eu luctus purus. Nullam blandit magna sit amet porttitor vulputate. Nullam urna erat, finibus ac tempor auctor, posuere nec magna. Fusce euismod ante venenatis leo consequat sagittis. Donec eu ligula sapien. Mauris tristique felis vel sem condimentum rhoncus. Cras id tortor dictum, feugiat leo at, ullamcorper magna.
              </div>
              <div className="box-2">
                <h2>Nossa Empresa:</h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum convallis rhoncus. Vivamus cursus ligula a erat dictum eleifend. Sed at erat eget leo pulvinar cursus in et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue ante id bibendum semper. In sagittis ut quam ut rutrum. Sed ac finibus urna, eu luctus purus. Nullam blandit magna sit amet porttitor vulputate. Nullam urna erat, finibus ac tempor auctor, posuere nec magna. Fusce euismod ante venenatis leo consequat sagittis. Donec eu ligula sapien. Mauris tristique felis vel sem condimentum rhoncus. Cras id tortor dictum, feugiat leo at, ullamcorper magna.
              </div>
              <hr className="hr"/>
              <div className="box-3">
                <h1>Quem Somos:</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum convallis rhoncus. Vivamus cursus ligula a erat dictum eleifend. Sed at erat eget leo pulvinar cursus in et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue ante id bibendum semper. In sagittis ut quam ut rutrum. Sed ac finibus urna, eu luctus purus. Nullam blandit magna sit amet porttitor vulputate. Nullam urna erat, finibus ac tempor auctor, posuere nec magna. Fusce euismod ante venenatis leo consequat sagittis. Donec eu ligula sapien. Mauris tristique felis vel sem condimentum rhoncus. Cras id tortor dictum, feugiat leo at, ullamcorper magna.
                
              </div>
          </div>  
        </div>
    );
}