import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { ShareSocial } from 'react-share-social';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

const style = {
	border: 0,
	color: 'white',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '0 30px',
};

function getModalStyle() {
	const top = 45 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 300,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		border: 'none',
		outline: 'none',
		paddingBottom: 20,
		borderRadius: 5,
	},
}));

export default function SimpleModal({ pageURL }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<ShareSocial
				style={style}
				url={pageURL}
				socialTypes={['facebook', 'linkedin', 'twitter', 'reddit']}
			/>
		</div>
	);

	return (
		<div>
			<ShareOutlinedIcon onClick={handleOpen} className='react_icons' />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				{body}
			</Modal>
		</div>
	);
}
