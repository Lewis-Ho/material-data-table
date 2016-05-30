import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavVert from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';

export default class TopBarSelected extends React.Component {
	/**
     * Bind event handlers for top bar when selected item Component.
     * @constructor
     */
	constructor() {
		this.handleDeleteSeleted = this.handleDeleteSeleted.bind(this);
    }

    /**
     * Handle selected item/s deletion
     */
    handleDeleteSeleted() {
        this.props.deleteSelectedItem();
    }

    render() {
        return (
        	<div className="top-bar-container blue-back">
                <div className="top-bar-buttons">
                    <IconButton onClick={this.handleDeleteSeleted}>
                        <Delete/>
                    </IconButton>
                    <IconButton>
                        <NavVert />
                    </IconButton>
                </div>
                <div className="top-bar-title">{this.props.selectedItems.length} item selected</div>
            </div>
        );
    }
}
