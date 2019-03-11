import React from 'react';
import { connect } from 'react-redux';
import './../scripts/jscolor.js';
import { chooseColor } from './../actions';
import { fetchColorName } from './../actions';
import { fontColor } from './../actions';
import './styles/ChooseColor.css';

const mapStateToProps = state => {
  return {
    state: state
  };
};


function ChooseColor(props) {
  let primaryColor;
  let secondaryColor;
  // let colorScheme;

  function handleChooseColor(event) {
    const { dispatch } = props;
    event.preventDefault();
    let colors = [primaryColor.value, secondaryColor.value]
    let promises = [];
    for (let c of colors) {
      let promise = new Promise(
        (resolve, reject) => {
          let result = fetchColorName(c)
          resolve(result);
        });
      promises.push(promise);
    }

    Promise.all(promises).then((color) => {
      if (color[0] && color[1]) {
        console.log(color[0], color[1])
        let primaryTextColor = fontColor(color[0]);
        let secondaryTextColor = fontColor(color[1]);
        dispatch(chooseColor(
          primaryColor.value,
          secondaryColor.value,
          color[0].name.value,
          color[1].name.value,
          [color[0].rgb.r, color[0].rgb.g, color[0].rgb.b],
          [color[1].rgb.r, color[1].rgb.g, color[1].rgb.b],
          primaryTextColor,
          secondaryTextColor))
      }
    })
  }

  return (
    <div className='chooseColorForm'>
      <style>{`

        .primaryColor {
          background-color: #${props.state.primaryColor.hex};
          color: #${props.state.primaryColor.font};
        }
        .secondaryColor {
          background-color: #${props.state.secondaryColor.hex};
          color: #${props.state.secondaryColor.font};
        }

      `}</style>
        <h3>Choose Color works</h3>
        <form onSubmit={handleChooseColor}>

          <button className="jscolor {valueElement:'primary-chosen-value'}">
            Pick text color
          </button>

          HEX value:
          <input id="primary-chosen-value"
            ref={(input) => { primaryColor = input; }} /> <br />

          <button className="jscolor {valueElement:'secondary-chosen-value'}">
            Pick text color
          </button>

          HEX value:
          <input id="secondary-chosen-value"
            ref={(input) => { secondaryColor = input; }} /> <br />
          <button type='submit'>Submit</button>

        </form>
        <div className='chooseColorGrid'>
          <div>
            <p className="primaryColor">
            <span className='colorHeader'>Primary Color: </span><br />
              Name: <em> {props.state.primaryColor.name}</em><br />
              Hexidecimal: #{props.state.primaryColor.hex} <br />
              RGB: ({props.state.primaryColor.rgb.r}, {props.state.primaryColor.rgb.g}, {props.state.primaryColor.rgb.b}) <br />
            </p>
          </div>
          <div>
          <p className="secondaryColor">
              <span className='colorHeader'>Secondary Color: </span><br />
              Name: <em> {props.state.secondaryColor.name}</em><br />
              Hexidecimal: #{props.state.secondaryColor.hex} <br />
              RGB: ({props.state.secondaryColor.rgb.r}, {props.state.secondaryColor.rgb.g}, {props.state.secondaryColor.rgb.b}) <br />
            </p>
          </div>
        </div>
      </div>

  )

}

export default connect(mapStateToProps)(ChooseColor);