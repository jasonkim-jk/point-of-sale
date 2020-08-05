import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function MenuCard(props) {
  if (props.menuItem === undefined) return (<></>);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          alt={props.menuItem.item}
          image={props.menuItem.imageUrl}
          title={props.menuItem.item}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {`${props.menuItem.item}`}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p" noWrap>
            {`${props.menuItem.cost}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">Add</Button>
      </CardActions>
    </Card>
  );
}
