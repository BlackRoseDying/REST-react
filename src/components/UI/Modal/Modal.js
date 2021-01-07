import React from 'react';

import Backdrop from "../Backdrop/Backdrop";

import styles from './Modal.module.css';

const Modal = ({ content, isVisible, changeVisible }) => {
	return isVisible ? (
		<div>
			<Backdrop isVisible={ isVisible } changeVisible={ changeVisible }/>
			<div className={ styles.Modal }>
				{ content }
			</div>
		</div>
	) : null;
};

export default Modal;