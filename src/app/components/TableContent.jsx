import React from 'react';
import _lo from 'lodash';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRow from 'material-ui/Table/TableRow';
import TableFooter from 'material-ui/Table/TableFooter';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import PencilIcon from 'material-ui/svg-icons/content/create';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import $ from 'jquery';
import PopupDialog from './PopupDialog.jsx';

export default class TableContent extends React.Component{
    /**
     * Bind event handlers for table component.
     * @constructor
     */
    constructor(props) {
        super(props);

        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleLabelTextChange = this.handleLabelTextChange.bind(this);
        this._onRowSelection = this._onRowSelection.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);

        this.state = {
            dialogOpen: false,

            /** Table component state */
            wrapperStyle: {
                height: '600px',
                'overflowX': 'auto',
            },
            deselectOnClickaway: false,
            fixedFooter: true,
            fixedHeader: true,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,

            /** Popover component state */
            popoverOpen: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },
            labelText: '',
        };
    }

    /**
     * Handle open dialog box
     */
    handlePopoverOpen(event) {
        this.setState({
            anchorEl: event.currentTarget,
            popoverOpen: true
        });
    }

    /**
     * Handle close dialog box
     */
    handlePopoverClose() {
        this.setState({
            popoverOpen: false
        });
    }

    /**
     * Handle label text field value change
     */
    handleLabelTextChange(event) {
        this.setState({
          labelText: event.target.value,
        });
    }

    /**
     * Handle open dialog box
     */
    handleDialogOpen() {
        this.setState({
            dialogOpen: true
        });
    }

    /**
     * Handle close dialog box
     */
    handleDialogClose() {
        this.setState({
            dialogOpen: false
        });
    }

    /**
     * Get selected table row's key from tableBody; Material-ui table component pre-define function
     */
    _onRowSelection(key) {
        if (typeof key === 'string') {
            if (key === 'all') {
                var itemIndexList = [];
                this.props.items.map(function(item,i) {
                    itemIndexList.push(i);
                });
                this.props.addSelectedItems(itemIndexList);
            } else {
                this.props.addSelectedItems([]);
            }
        } else {
            this.props.addSelectedItems(key);
        }
    }

    render() {
        /** Present each data on one row */
        var TableItemsRow = [];

        for (var i = 0; i < this.props.items.length; i++) {
            TableItemsRow.push(
                <TableRow 
                    key={i}
                    selected={this.props.selectedItems.indexOf(i) !== -1}
                >
                    <TableRowColumn>{this.props.items[i].title}</TableRowColumn>
                    <TableRowColumn>{this.props.items[i].label1}</TableRowColumn>
                    <TableRowColumn>{this.props.items[i].label2}</TableRowColumn>
                    <TableRowColumn>{this.props.items[i].label3}</TableRowColumn>
                    <TableRowColumn>{this.props.items[i].label4}</TableRowColumn>
                    <TableRowColumn>
                        <TextField 
                            hintText="Input Text"
                            value={this.state.labelText}
                            underlineShow={false}
                            onChange={this.handleLabelTextChange}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <IconButton 
                            className="change-title-btn"
                            onClick={this.handleDialogOpen}
                        >
                            <PencilIcon />
                        </IconButton>
                        <PopupDialog
                            dialogStatus={this.state.dialogOpen}
                            handleDialogClose={this.handleDialogClose}
                            changeTitle={this.props.changeTitle}
                            selectedItem={this.props.selectedItems[0]}
                        />
                        
                    </TableRowColumn>
                </TableRow>
            );
        }

        /** Header component for data table */
        const TableHeaderRow = (
            <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn>Label (n)</TableHeaderColumn>
                <TableHeaderColumn>Label (%)</TableHeaderColumn>
                <TableHeaderColumn><CommentIcon /> Label</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
        );

        return (
            <Table
                className="table"
                height={this.state.height}
                style={this.state.style}
                wrapperStyle={this.state.wrapperStyle}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                onRowSelection={this._onRowSelection}
            >
                <TableHeader className="table-header" >
                    {TableHeaderRow}
                </TableHeader>
                <TableBody
                    className="table-body"
                    wrapperStyle={this.state.wrapperStyle}
                    showRowHover={this.state.showRowHover}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                >
                    {TableItemsRow}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableRowColumn style={{textAlign: 'right'}}>
                            <div className="footer-container" >
                                <span>Rows per page: 10</span>
                                <span>
                                    <IconButton>
                                        <ArrowLeft />
                                    </IconButton>
                                    <IconButton>
                                        <ArrowRight />
                                    </IconButton>
                                </span>
                            </div>
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
};
