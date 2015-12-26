// var HelloMessage = React.createClass({
//   render: function() {
//     return <h1>Hello, {this.props.name}!</h1>;
//   }
// });

var Row = React.createClass({
  getInitialState: function() {
    return this.props;
  },
  render: function() {
    return <li>{this.state.item.name} ({this.state.item.quantity})</li>;
  }
});

var List = React.createClass({
  getInitialState: function() {
    return {init: this.props.items, items: this.props.items};
  },
  addItem: function() {
    // New items must be added to init
    this.setState({
      items: this.state.items.concat([{name: 'Whatever', quantity: 0}])
    });
  },
  search: function(e) {
    var value = e.target.value;
    // If no search term is given, skip the filter
    if (!value) {
      this.setState({items: this.state.init});
      return;
    }

    var sanitizedValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Use a regex to quickly perform a case-insensitive match
    var re = new RegExp(sanitizedValue, 'i');
    var items = this.state.init.filter(function(item) {
        return re.test(item.name);
    });
    this.setState({items: items});
  },
  render: function() {
    return (
    <div>
      <input type="text" placeholder="Search" value={this.state.search} onChange={this.search.bind(this)}/>
      <button onClick={this.addItem}>Add</button>
      <ul>
        {this.state.items.map(function(item) {
          return <Row key={item.name} item={item}/>;
        }.bind(this))}
      </ul>
    </div>
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
  {name: 'Desk', quantity: 2},
  {name: 'Drawer', quantity: 1}
];

$(function() {
  ReactDOM.render(<List items={items}/>, $('body')[0]);
  // ReactDOM.render(<Row item={items[0]}/>, $('body')[0]);
});
