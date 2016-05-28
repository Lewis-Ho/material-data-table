var React = require('react');
var Table = require('material-ui/Table').Table;
var TableBody = require('material-ui/Table').TableBody;
var TableRowColumn = require('material-ui/Table').TableRowColumn;
var TableHeader = require('material-ui/Table').TableHeader;
var TableRow = require('material-ui/Table').TableRow;
var TableHeaderColumn = require('material-ui/Table').TableHeaderColumn;

var MoreVertIcon = require('material-ui/svg-icons/navigation/more-vert');
var NavigationClose = require('material-ui/svg-icons/navigation/close');

export default class TableContent extends React.Component({
    getInitialState: function() {
        return {
            fixedHeader: true,
            selectable: true,
            multiSelectable: true
        };
    },
    render: function() {
        return (
        <Table
            fixedHeader={this.state.fixedHeader}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
        >
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>John Smith</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>2</TableRowColumn>
                    <TableRowColumn>Randal White</TableRowColumn>
                    <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>3</TableRowColumn>
                    <TableRowColumn>Stephanie Sanders</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>4</TableRowColumn>
                    <TableRowColumn>Steve Brown</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
        );
        }
    });
