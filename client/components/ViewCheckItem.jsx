import React from 'react';

export default class ViewCheckItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: {}
    };
  }

  componentDidMount() {
    fetch('/api/checks')
      .then(res => res.json())
      .then(data => this.setState({ menus: data }))
      .catch(() => console.error('server response error'));
  }

  render() {
    const { params } = this.props.match;
    return (
      <div>
       Check {params.checkId}
      </div>
    );
  }
}
