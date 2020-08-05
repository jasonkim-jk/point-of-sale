import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from './Table';

export default class FloorPlan extends React.Component {
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

      <Grid container spacing={3} className="floorplan-container">
        {
          tables.map(table => {
            const { tableId } = table;
            return (
              <Table key={tableId} tableData={table}/>

            );
          })
        }
      </Grid>

    );
  }
}
