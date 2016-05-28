var React = require('react');
var _lo = require('lodash');
var Table = require('material-ui/Table').Table;
var TableBody = require('material-ui/Table').TableBody;
var TableRowColumn = require('material-ui/Table').TableRowColumn;

var TableHeader = require('material-ui/Table').TableHeader;
var TableRow = require('material-ui/Table').TableRow;
var TableHeaderColumn = require('material-ui/Table').TableHeaderColumn;

import CommentIcon from 'material-ui/svg-icons/communication/comment';

export default class TableContent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            selectable: true,
            multiSelectable: true
        };
    }

    render() {
        const TableHeaderRow = (
            <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn>Label (n)</TableHeaderColumn>
                <TableHeaderColumn>Label (%)</TableHeaderColumn>
                <TableHeaderColumn><CommentIcon /> Label</TableHeaderColumn>
            </TableRow>
        );

        const TableItemsRow = this.props.items.map(function(item) {
            return (
                <TableRow>
                    <TableRowColumn>{item.title}</TableRowColumn>
                    <TableRowColumn>{item.label1}</TableRowColumn>
                    <TableRowColumn>{item.label2}</TableRowColumn>
                    <TableRowColumn>{item.label3}</TableRowColumn>
                    <TableRowColumn>{item.label4}</TableRowColumn>
                    <TableRowColumn>{item.label5}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Table
                fixedHeader={this.state.fixedHeader}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
            >
                <TableHeader>
                    {TableHeaderRow}
                </TableHeader>
                <TableBody>
                    {TableItemsRow}
                </TableBody>
            </Table>
        );
    }
};
