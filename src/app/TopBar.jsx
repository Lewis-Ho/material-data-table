var React = require('react');
var IconButton = require('material-ui').IconButton;
var FlatButton = require('material-ui').FlatButton;
var Dialog = require('material-ui').Dialog;
var TextField = require('material-ui').TextField;

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavVert from 'material-ui/svg-icons/navigation/more-vert';

const dialogStyle = {
  width: '384px',
  maxWidth: 'none'
};

export default class TopBar extends React.Component {
	constructor() {
		this.handleOpen = this.handleOpen.bind(this);
    	this.handleClose = this.handleClose.bind(this);
    	this.handleSave = this.handleSave.bind(this);
    	this.handleDialogTextChange = this.handleDialogTextChange.bind(this);

        this.state = {
        	text: '',
            open: false
        };
    }

    handleDialogTextChange(event) {
    	this.setState({
          text: event.target.value,
        });
    }

    handleOpen() {
    	this.setState({
    		open: true
    	});
    }

    handleClose() {
    	this.setState({
    		open: false
    	});
    }

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

      //     	objects = JSON.parse(localStorage.getItem("savedData")));
      // //     	// Update item count
      // //       var itemSize = parseInt(localStorage.itemCount) + 1;
      // //       //var item = 'item' + itemSize;
      // //       localStorage.setItem('itemCount', itemSize);

    		

      //       // Save new item object to localStorage
		    // localStorage.setItem('item', JSON.stringify(newItem));
		} else {
		    console.log('No Web Storage Support.');
		}
		
		// Reset
		this.setState({
			text: '',
    		open: false
    	});
    }

    render() {
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

        return (
        	<div>
        		<span class="title">Title</span>
        		<IconButton onClick={this.handleOpen}>
					<ContentAdd	 />
			    </IconButton>
			    <IconButton>
					<NavVert />
			    </IconButton>

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
