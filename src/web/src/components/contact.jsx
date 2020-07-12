var React = require('react');

class Contact extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return <div className="card">
            <table><tr>
                <td width="30px">
                    {this.props.contact.id}
                </td>
                <td>
                    <img width="60px" height="60px" src={this.props.contact.avatar}></img>
                </td>
                <td>
                    <h5>{this.props.contact.first_name} {this.props.contact.last_name}</h5>
                    <h6>{this.props.contact.email}</h6>
                </td>
            </tr></table>
        </div>
    }
}

module.exports = Contact;