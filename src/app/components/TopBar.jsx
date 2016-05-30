import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavVert from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import TopBarSelected from './TopBarSelected.jsx';

/** Set dialog component build-in styling */
const dialogStyle = {
  maxWidth: 'none'
};

export default class TopBar extends React.Component {
    /**
     * Bind event handlers for top bar component.
     * @constructor
     */
	constructor() {
		this.handleOpen = this.handleOpen.bind(this);
    	this.handleClose = this.handleClose.bind(this);
    	this.handleSave = this.handleSave.bind(this);
    	this.handleDialogTextChange = this.handleDialogTextChange.bind(this);

        this.state = {
        	text: '',
            open: false,
            blueBack: false
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
     * Handle open dialog box
     */
    handleOpen() {
    	this.setState({
    		open: true
    	});
    }

    /**
     * Handle close dialog box
     */
    handleClose() {
    	this.setState({
    		open: false
    	});
    }

    /**
     * Handle save text action from dialog box to localstorage and update state
     */
    handleSave() {
    	if (typeof(Storage) !== "undefined") {
    		var items = [];
            var newItem = {
                title: this.state.text,
                label1: 0,
                label2: 'Value',
                label3: '5',
                label4: '32%',
                label5: ''
            };

    		if ( localStorage.items == undefined ) {
    			items.push(newItem);
    		} else {
          		items = JSON.parse(localStorage.items);
          		items.push(newItem);
          	}

          	// Save new item object to localStorage
		    localStorage.setItem('items', JSON.stringify(items));

            // Callback function to update item list from DataTable
            this.props.addNewItem(items);

		} else {
		    console.log('No Web Storage Support.');
		}
		
		/** Reset state */
		this.setState ({
			text: '',
    		open: false
    	});
    }

    render() {
        let topBarComponents;

        // Dialog action button set
    	const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Save"
				primary={true}
				onClick={this.handleSave}
			/>,
		];

        // Set title name if there is selected item 
        if (this.props.selectedItems.length === 0) {
            topBarComponents = (
                <div className="top-bar-container">
                    <div className="top-bar-buttons">
                        <IconButton onFocus={this.handleOpen}>
                            <ContentAdd  />
                        </IconButton>
                        <IconButton>
                            <NavVert />
                        </IconButton>
                    </div>
                    <div className="top-bar-title">Title</div>
                </div>
            )
        } else {
            topBarComponents = (
                <TopBarSelected 
                    selectedItems={this.props.selectedItems}
                    deleteSelectedItem={this.props.deleteSelectedItem}
                />
            )
        }

        return (
        	<div>
                {topBarComponents}
			    <Dialog
					title="Title"
					actions={actions}
					modal={false}
					open={this.state.open}
					contentStyle={dialogStyle}
					onRequestClose={this.handleClose}
		        >
		        <TextField
		        	fullWidth={true}
      				hintText="Input Text"
      				value={this.state.text}
      				onChange={this.handleDialogTextChange}
    			/>
		        </Dialog>
        	</div>
        );
    }
}
