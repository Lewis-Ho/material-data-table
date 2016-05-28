var React = require('react');
var getMuiTheme = require('material-ui/styles').getMuiTheme;
var MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;

var TopBar = require('./TopBar.jsx');
var TableContent = require('./TableContent.jsx');
var FootorBar = require('./FootorBar.jsx');

var muiTheme = getMuiTheme({
    palette: {
        accent1Color: '#EF9A9A',
    },
});

export default class DataTable extends React.Component {
    constructor() {
        var savedItems;
        if ( localStorage.items == undefined ) {
            savedItems = []
        } else {
            savedItems = JSON.parse(localStorage.items);
        }

        this.state = {
            items: savedItems
        };
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <TopBar />
                        <TableContent items={this.state.items}/>
                        <FootorBar />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
};
