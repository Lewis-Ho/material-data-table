import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

/** Set dialog component build-in styling */
const dialogStyle = {
  maxWidth: 'none'
};

export default class PopupDialog extends React.Component {
	/**
     * Bind event handlers for top bar component.
     * @constructor
     */
	constructor() {
    	this.handleDialogTextChange = this.handleDialogTextChange.bind(this);
    	this.handleDialogSave = this.handleDialogSave.bind(this);

        this.state = {
        	text: ''
        };
    }

    /**
     * Handle dialog's textfield update 
     * @param {string} event - Event handler which targeting to textfield itself.
     */
    handleDialogTextChange(event) {
    	this.setState({
          text: event.target.value,
        });
    }

    /**
     * Handle dialog save text to item's title
     */
    handleDialogSave(event) {
    	this.props.changeTitle(this.props.selectedItem, this.state.text);
        this.props.handleDialogClose();
        this.setState({
            text: ''
        });
    }

    render() {
    	// Dialog action button set
    	const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.props.handleDialogClose}
			/>,
			<FlatButton
				label="Save"
				primary={true}
				onClick={this.handleDialogSave}
			/>,
		];

        return (
        	<Dialog
				title="Title"
				actions={actions}
				modal={false}
				open={this.props.dialogStatus}
				contentStyle={dialogStyle}
				onRequestClose={this.props.handleDialogClose}
	        >
	        <TextField
	        	fullWidth={true}
  				hintText="Input Text"
  				value={this.state.text}
  				onChange={this.handleDialogTextChange}
			/>
	        </Dialog>
		);
    }
}
