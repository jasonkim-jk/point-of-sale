import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class ViewCheckItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: {}
    };
  }

  componentDidMount() {
    fetch('/api/checks/:checkId')
      .then(res => res.json())
      .then(data => this.setState({ menus: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const { params } = this.props.match;
    return (
      <Typography component="div">
       Check {params.checkId}
      </Typography>
    );
  }
}
