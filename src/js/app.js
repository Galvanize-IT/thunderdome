var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="React" />, $('body')[0]);

$(function() {
  console.log('js environment loaded?');
});
