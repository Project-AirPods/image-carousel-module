const React = require('react');

const Save = (props) => {
  return (
    <div>
      <br/>
      <input type="button" value="Save" onClick={props.click} />
    </div>
    );
};

export default Save;