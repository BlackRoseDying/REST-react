import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = ({ isVisible, changeVisible }) => {
	return isVisible ? (
		<div className={styles.Backdrop}
		     onClick={changeVisible}>
		</div>
	) : null;
};

export default Backdrop;