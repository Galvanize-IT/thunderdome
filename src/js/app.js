var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
});

$(function() {
  ReactDOM.render(<HelloMessage name="React" />, $('body')[0]);
});
