import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './components/TopBar.jsx';
import TableContent from './components/TableContent.jsx';

/**
 * Customizing mui theme color for components
 */
let muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#0047bb',
    },
});

/**
 * Get saved local items from localStorage
 */
function getSavedItems() {
    if ( localStorage.items == undefined ) {
        return []
    } else {
        return JSON.parse(localStorage.items);
    }
}

export default class DataTable extends React.Component {
    /**
     * Bind event handlers for data table component
     * @constructor
     */
    constructor() {
        this.addItems = this.addItems.bind(this);
        this.addSelectedItems = this.addSelectedItems.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
        this.changeTitle = this.changeTitle.bind(this);

        this.state = {
            items: getSavedItems(),
            selectedItems: []
        };
    }

    /**
     * Handle adding item to item list in state
     * @param {object} newItems - Json object represented data item
     */
    addItems(newItems) {
        this.setState ({
            items: newItems
        });
    }

    /**
     * Handle adding selected item to selected item list in state
     * @param {object} newSelectedItems - Json object represented data item
     */
    addSelectedItems(newSelectedItems) {
        this.setState ({
            selectedItems: newSelectedItems
        });
    }

    /**
     * Handle selected item list deletion and update localStorage
     */
    deleteSelectedItem() {
        var localItems = JSON.parse(localStorage.items);

        for (var i = this.state.selectedItems.length-1; i >= 0; i--) {
            localItems.splice(this.state.selectedItems[i],1);
        }

        // Save new item object to localStorage
        localStorage.setItem('items', JSON.stringify(localItems));

        this.setState ({
            items: localItems,
            selectedItems: []
        });
    }

    /**
     * Handle title change for selected item and updating view and localStorage
     */
    changeTitle(itemIndex, newTitle) {
        var localItems = JSON.parse(localStorage.items);

        // Save new item object to localStorage
        localItems[parseInt(itemIndex)].title = newTitle;
        localStorage.setItem('items', JSON.stringify(localItems));

        this.state.items[parseInt(itemIndex)].title = newTitle;
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <TopBar 
                            items={this.state.items}
                            selectedItems={this.state.selectedItems}
                            addNewItem={this.addItems} 
                            deleteSelectedItem={this.deleteSelectedItem}
                        />
                        <TableContent 
                            items={this.state.items}
                            selectedItems={this.state.selectedItems}
                            addSelectedItems={this.addSelectedItems}
                            changeTitle={this.changeTitle}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
};
