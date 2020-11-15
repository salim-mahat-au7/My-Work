import React from 'react';

import {Card , CardContent,Typography,Grid} from '@material-ui/core';
import styles from './Card.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';


const Cards = ({data:{confirmed , recovered ,deaths , lastUpdate }}) => {
    
 if (!confirmed){
     return '....Loading'
 }
 else if (!recovered){
    return '....Loading'
}
else if (!deaths){
    return '....Loading'
}
 
    return (
        <div className={styles.container}>
        <Grid container spacing={3} justify = "center">
            <Grid item component={Card} xs={12} md ={3} className={cx(styles.card,styles.infect)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom    >Infected</Typography>
                    <Typography variant ="h5"><CountUp start={0} end =  {confirmed.value} duration={2.5} separator = {','}/></Typography>
                    <Typography color ="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant = "body2">Numer of active cases in Covid-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md ={3} className={cx(styles.card,styles.recover)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom  >Recovered</Typography>
                    <Typography variant ="h5"><CountUp start={0} end =  {recovered.value} duration={2.5} separator = {','}/></Typography>
                    <Typography color ="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant = "body2">Numer of Recoveries  in Covid-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md ={3} className={cx(styles.card,styles.death)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom >Deaths</Typography>
                    <Typography variant ="h5"><CountUp start={0} end =  {deaths.value} duration={2.5} separator = {','}/></Typography>
                    <Typography color ="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant = "body2">Numer of Deaths cases in Covid-19</Typography>
                </CardContent>
            </Grid>
            
        </Grid>
            
        </div>
    )
}

export default Cards;

