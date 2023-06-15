import { Component } from 'react';
import { render } from 'react-dom';

const random = (max) => Math.round(Math.random() * 1000) % max;

const A = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean",
  "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive",
  "cheap", "expensive", "fancy"];
const C = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const N = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse",
  "keyboard"];

let nextId = 1;

const buildData = (count) => {
  const data = new Array(count);

  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`,
    };
  }

  return data;
};

const initialState = { data: [], selected: 0 };

class Row extends Component {
  shouldComponentUpdate(nextProps) {
    const { item, selected } = this.props;

    return nextProps.item !== item || nextProps.selected !== selected;
  }

  constructor(props) {
    super(props);

    this.onSelect = () => {
      const { item, dispatch } = this.props;

      dispatch({ type: 'SELECT', id: item.id });
    };

    this.onRemove = () => {
      const { item, dispatch } = this.props;

      dispatch({ type: 'REMOVE', id: item.id });
    };
  }

  handleAction = () => {
    console.log('action');
  }

  render() {
    const { selected, item } = this.props;

    return (
        <tr className={selected ? "danger" : ""}>
          <td className="col-md-1">{item.id}</td>
          <td className="col-md-4">
            <a onClick={this.onSelect}>{item.label}</a>
          </td>
          <td className="col-md-1">
            <a onClick={this.onRemove}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true" />
            </a>
          </td>
          <td className="col-md-6" >
            {[...Array(3).keys()].map(x => 
               <div class="deep-nested-node-level-1">
                <div class="deep-nested-node-level-2">
                  <div class="deep-nested-node-level-3">
                      <div class="deep-nested-node-level-4">
                          <div class="deep-nested-node-level-5">
                            {((item.id + x) % 9 === 1)? <p>label</p> : null}
                            {((item.id + x) % 9 === 2)? <input type="text" placeholder="text input" onClick={this.handleAction}/>: null}
                            {((item.id + x) % 9 === 3)? <input type="button" value="input button" onClick={this.handleAction}/> : null}
                            {((item.id + x) % 9 === 4)? <input type="checkbox" value="checkbox" onClick={this.handleAction}/> : null}
                            {((item.id + x) % 9 === 6)? <input type="date" value="date" onClick={this.handleAction}/> : null}
                            {((item.id + x) % 9 === 5)? <input type="color" value="red" onClick={this.handleAction}/> : null}
                            {((item.id + x) % 9 === 8)? <button onClick={this.handleAction}>button button</button> : null}
                            {((item.id + x) % 9 === 7)? <input type="email" value="abc@test.com" onClick={this.handleAction}/> : null}
                            {((item.id + x) % 9 === 0)? <select onSelect={this.handleAction}><option>1</option><option>2</option></select>: null}
                          </div>
                        </div>
                    </div>
                </div>
            </div>               
            )}
          </td>
        </tr>
    );
  }
}

class Button extends Component {
  render() {
    const { id, cb, title } = this.props;

    return (
        <div className="col-sm-6 smallpad">
          <button type="button" className="btn btn-primary btn-block" id={id} onClick={cb}>{title}</button>
        </div>
    );
  }
}

class Jumbotron extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { dispatch } = this.props;

    return (
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <h1>React keyed</h1>
            </div>
            <div className="col-md-6">
              <div className="row">
                <Button id="run" title="Create 1,000 rows" cb={() => dispatch({ type: 'RUN' })} />
                <Button id="runlots" title="Create 10,000 rows" cb={() => dispatch({ type: 'RUN_LOTS' })} />
                <Button id="add" title="Append 1,000 rows" cb={() => dispatch({ type: 'ADD' })} />
                <Button id="update" title="Update every 10th row" cb={() => dispatch({ type: 'UPDATE' })} />
                <Button id="clear" title="Clear" cb={() => dispatch({ type: 'CLEAR' })} />
                <Button id="swaprows" title="Swap Rows" cb={() => dispatch({ type: 'SWAP_ROWS' })} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.dispatch = (action) => {
      const { data } = this.state;

      switch (action.type) {
        case 'RUN':
          return this.setState({ data: buildData(1000), selected: 0 });
        case 'RUN_LOTS':
          return this.setState({ data: buildData(10000), selected: 0 });
        case 'ADD':
          return this.setState({ data: data.concat(buildData(1000))});
        case 'UPDATE': {
          const newData = data.slice(0);

          for (let i = 0; i < newData.length; i += 10) {
            const r = newData[i];

            newData[i] = { id: r.id, label: r.label + " !!!" };
          }

          return this.setState({ data: newData });
        }
        case 'CLEAR':
          return this.setState({ data: [], selected: 0 });
        case 'SWAP_ROWS': {
          if (data.length > 998) {
            return this.setState({ data: [data[0], data[998], ...data.slice(2, 998), data[1], data[999]] });
          }

          return;
        }
        case 'REMOVE': {
          const idx = data.findIndex((d) => d.id === action.id);

          return this.setState({ data: [...data.slice(0, idx), ...data.slice(idx + 1)] });
        }
        case 'SELECT':
          return this.setState({ selected: action.id });
      }
    };
  }

  render() {
    const { data, selected } = this.state;

    return (
        <div className="container">
          <Jumbotron dispatch={this.dispatch} />
          <table className="table table-hover table-striped test-data">
            <tbody>
              {data.map((item) => (
                <Row key={item.id} item={item} selected={selected === item.id} dispatch={this.dispatch} />
              ))}
            </tbody>
          </table>
          <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
        </div>
    );
  }
}

render(
  <Main />,
  document.getElementById('main'),
);
