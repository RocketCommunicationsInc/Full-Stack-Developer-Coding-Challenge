import React, {Component} from 'react'


class HomePage extends Component {

   state = {
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data.user.username
            })
        }))
     : this.props.history.push("/") 
    }

    


    render() {
        return(
            <div>
                <p>made it to this page!</p>
            </div>  
        )
    }
}

export default HomePage