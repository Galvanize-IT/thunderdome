// var HelloMessage = React.createClass({
//   render: function() {
//     return <h1>Hello, {this.props.name}!</h1>;
//   }
// });

var Row = React.createClass({
  getInitialState: function() {
    return this.props.item;
  },
  upQuantity: function() {
    this.setState({quantity: this.state.quantity + 1});
  },
  render: function() {
    return (<li>
      <span>{this.state.name} ({this.state.quantity})</span>
      <button onClick={this.upQuantity}>+</button>
    </li>);
  }
});

var List = React.createClass({
  update: function() {
    console.log('updating')
    this.setState({items: this.props.items.toJSON()});
  },
  getInitialState: function() {
    this.props.items.on('add', this.update, this);
    return {items: this.props.items.toJSON()};
  },
  addItem: function() {
    console.log('add item');
    this.props.items.add({name: 'Huh', quantity: 1});
    // New items must be added to init
    // this.setState({
    //   items: this.state.items.concat([{name: 'Whatever', quantity: 0}])
    // });
  },
  search: function(e) {
    var value = e.target.value;
    // If no search term is given, skip the filter
    if (!value) {
      this.setState({items: this.state.init.toJSON()});
      return;
    }

    var sanitizedValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Use a regex to quickly perform a case-insensitive match
    var re = new RegExp(sanitizedValue, 'i');
    var items = this.state.init.toJSON().filter(function(item) {
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
          return <Row key={item.id} item={item}/>;
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
  {id: 2, name: 'Chair', quantity: 12},
  {id: 3, name: 'Desk', quantity: 2},
  {id: 4, name: 'Drawer', quantity: 1},
  {id: 1, name: 'Lamp', quantity: 2}
];

var Items = Backbone.Collection.extend({});

$(function() {
  var list = new Items(items);
  list.on('change', function() {});
  ReactDOM.render(<List items={list}/>, $('body')[0]);
});
