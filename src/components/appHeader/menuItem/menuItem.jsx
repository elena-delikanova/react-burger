import React from 'react';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    this.text = props.text;
    this.icon = props.icon;
    this.state = {
      isActive: props.isActive || false,
    };
  }

  render() {
    const Icon = this.icon;
    const isActive = this.state.isActive;
    return (
      <li className={this.className} role="button">
        <Icon type={isActive ? 'primary' : 'secondary'} />
        <span className={`text text_type_main-default ${!isActive ? 'text_color_inactive' : ''} pl-2`}>
          {this.text}
        </span>
      </li>
    );
  }
}

export default MenuItem;
