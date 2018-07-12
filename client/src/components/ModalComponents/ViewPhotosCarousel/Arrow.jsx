import React from 'react';

const Arrow = ({ direction, clickFunction}) => {
  let icon = null;
  if (direction === 'right') {
    icon = (
      <img src="https://s3-us-west-1.amazonaws.com/projectnomadhrsf96/rightarrow.png" alt="right arrow" />
    );
  } else if (direction === 'left') {
    icon = (
      <img src="https://s3-us-west-1.amazonaws.com/projectnomadhrsf96/leftarrow.png" alt="left arrow" />
    );
  }

  return (
    <div className={`"Slide-arrow ${direction}`} onClick={clickFunction}>
      {icon}
    </div>
  );
};

export default Arrow