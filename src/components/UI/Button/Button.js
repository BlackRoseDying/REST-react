import React from 'react';

const Button = (props) => {
	return <button className={ props.styles } onClick={ props.click }>{ props.children }</button>;
};

export default Button;