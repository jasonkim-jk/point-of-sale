import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function MenuCard(props) {
  if (props.menuItem === undefined) return (<></>);

  return (
    <Card
      onClick={() => {
        props.addItem(props.menuItem);
      }}
    >
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
            ${`${props.menuItem.salePrice}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
