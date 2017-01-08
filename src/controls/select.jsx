import React from 'react';
import ReactDOM from 'react-dom';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      value: this.props.value,
      data: this.getChildData(),
      query: ''
    }
  }
  selectionChanged(value) {
    this.setState({
      value: value
    })
  }
  getChildData(){
    var _this = this;
    var data = this.props.children.map(function(element, idx){
      if(element.type === "option") {
        return _this.getOptionData(element, idx);
      } else if(element.type === "optgroup") {
        var item = {
          label: element.props.label,
          options: element.props.children.map(_this.getOptionData)
        }
        console.log(item);
        return item;
      }
      return null;
    });
    return data;
  }
  getOptgroupData(element, idx) {
    return {
      label: element.props.label,
      options: element.props.children.map(this.getOptionData)
    }
  }
  getOptionData(element, idx) {
    var label = element.props.children;
    var value = element.props.value;
    return { label: label, value: value };
  }
  getSelectedLabel(){
    const {value, data} = this.state;
    var items = [];
    var optData = data.forEach((e)=> {
      e.options ? e.options.forEach((i)=>items.push(i)) : items.push(e);
    });
    var selected = value ? items.filter((e) => e.value === value) : null;
    if(selected && selected.length >=0) return selected[0].label;
    return null;
  }
  changeQuery(event){
    this.setState({
      query: event.target.value
    })
  }
  drawOption(e, i){
    const {query, value} = this.state;
    var hidden = (query.length>0 && e.label.toLowerCase().indexOf(query.toLowerCase()) < 0) ? "hidden" : "";
    var active = (e.value === value) ? " active" : "";
    return (
      <li key={i} className={hidden + active}><a href="#" onClick={()=>this.selectionChanged(e.value)}>{e.label}</a></li>
    )
  }
  drawOptionList() {
    const {data} = this.state;
    var _this = this;
    var listItems = [];
    for(var i=0; i< data.length; i++) {
      if(data[i].options) {
        listItems.push(<li key={i+'s'} className="dropdown-header">{data[i].label}</li>);
        listItems.push(data[i].options.map(_this.drawOption.bind(_this)));
        if(i + 1 < data.length) listItems.push(<li key={i+'e'} className="divider"></li>);
      }
      else {
        listItems.push([data[i]].map(_this.drawOption.bind(_this)));
      }
    }
    return listItems;
  }
  render() {
    const {query, data, expanded, value} = this.state;
    var open = expanded ? " open" : "";
    var _this = this;
    var label = this.getSelectedLabel();
    return(
      <div className={"btn-group btn-select" + open}>
        <button className="btn dropdown-toggle btn-default"
                onClick={()=>this.setState({expanded: !expanded})}>
          <span className="pull-left">{label ? label : this.props.placeholder}</span>
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <input type="text"
                   className="form-control"
                   style={{margin: '0 6px 6px 6px', width: 'auto'}}
                   value={query}
                   onChange={this.changeQuery.bind(this)}/>
          </li>
          { this.drawOptionList() }
        </ul>
        <select name={this.props.name} className="hidden" value={this.state.value}>
          {
            this.state.data.map((e,i)=>(
              <option key={i} value={e.value}>{e.label}</option>
            ))
          }
        </select>
      </div>
    )
  }

}
