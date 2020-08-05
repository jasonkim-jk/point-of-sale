import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class ViewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
  }

  componentDidMount() {
    fetch('/api/restaurant')
      .then(response => response.json())
      .then(data => {
        this.setState({ tables: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { tables } = this.state;
    return (

      <Grid container spacing={3}>
        {
          tables.map(table => {
            const { tableId } = table;
            return (
              <Grid item xs={3} key={tableId}>
                <Button variant="contained">T{tableId}</Button>
              </Grid>

            );
          })
        }
      </Grid>

    );
  }
}
