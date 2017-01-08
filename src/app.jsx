import React from 'react';
import boot from './css/bootstrap.css';
import bootex from './css/bootstrap-ext.css';
import Select from './controls/select';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span>module</span> local styles.</p>
        <p>Enjoy!</p>
        <p>What if I modified something?</p>
        <div className="panel panel-primary">
          <div className='panel-heading'>
            Hello
          </div>
          <div className='panel-body'>
            This is a panel!
            <div className="btn-group">
            <Select placeholder="Select an option">
              <option value='1'>An option</option>
              <option value='2'>Another option</option>
            </Select>
            <Select placeholder="Select an option">
              <optgroup label="First">
                <option value='1'>An option</option>
                <option value='2'>Another option</option>
              </optgroup>
              <optgroup label="Second">
                <option value='3'>An option</option>
                <option value='4'>Another option</option>
              </optgroup>
            </Select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
