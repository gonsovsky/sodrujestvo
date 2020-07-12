var React = require('react');
var FilterBox = require('./filterBox.jsx');
var Contact = require('./contact.jsx');

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        this.filterList("");
    }

    filterList(text) {
        fetch('http://localhost:5000/' + text)
            .then(res => res.json())
            .then((data) => {
                this.setState({contacts: data});
            })
            .catch(console.log)
    }

    render() {
        if (!this.state || !this.state.contacts)
            return <h2>Loading...</h2>
        return(
            <div>
                <h2>{"Contact List"}</h2>
            <FilterBox filter={this.filterList} />
        <ul>
        {
            this.state.contacts.map(function(contact){

                    return   <Contact contact={contact} />

            })
        }
        </ul>
        </div>);
    }
}

module.exports = ContactList;