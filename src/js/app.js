// var HelloMessage = React.createClass({
//   render: function() {
//     return <h1>Hello, {this.props.name}!</h1>;
//   }
// });

var Row = React.createClass({
  render: function() {
    return <li>{this.props.item.name} ({this.props.item.quantity})</li>;
  }
});

var List = React.createClass({
  render: function() {
    return (
    <ul>
      {this.props.items.map(function(item) {
        return <Row item={item}/>;
      }.bind(this))}
    </ul>
    );
  }
});

// var ItemView = Backbone.View.extend({
//   initialize: function(options) {
//     this.listenTo(this.model, 'change', this.render)
//   },
//   render: function() {}
// })

var items = [
  {name: 'Lamp', quantity: 2},
  {name: 'Chair', quantity: 12},
  {name: 'Desk', quantity: 2}
];

$(function() {
  ReactDOM.render(<List items={items}/>, $('body')[0]);
  // ReactDOM.render(<Row item={items[0]}/>, $('body')[0]);
});
