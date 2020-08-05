import React from 'react';

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
      <div>
        {
          tables.map(table => {
            const { tableId } = table;
            return (
              <div key={tableId}>
                {tableId}
              </div>

            );
          })
        }
      </div>
    );
  }
}
