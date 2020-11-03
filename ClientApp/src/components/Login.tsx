import { CompoundButton, TextField } from '@fluentui/react';
import React, { Component } from 'react';

interface Istate{
    username:string,
    password:string
}

export default class Login extends React.PureComponent<{},Istate>{

    constructor(props:any){
        super(props);
        this.state={
            username:"",
            password:""
        }

        this.onUserNameChange=this.onUserNameChange.bind(this)
        this.onPasswordChange=this.onPasswordChange.bind(this)
        this.authenticate=this.authenticate.bind(this)
        this.logout=this.logout.bind(this)
    }

    logout(){
        fetch("/logout")
    }
    authenticate(){
        var userinfo={UserName:this.state.username,Password:this.state.password}
        fetch("/authenticate",{method:"POST",credentials: 'same-origin',headers:{"Content-Type": "application/json"},body:JSON.stringify( userinfo)})
            .then(res=>{console.log(res.headers.forEach((value,key)=>{console.log(value,key)}))})
    }

    onUserNameChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({username:newValue||""})
        
    }
    onPasswordChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({password:newValue||""})
    }
    render(){
        return(
            <div>
                <TextField label="Username" required onChange={this.onUserNameChange}/>
                <TextField label="Password" required onChange={this.onPasswordChange} />
                <CompoundButton primary onClick={this.authenticate}>Login</CompoundButton>
                <CompoundButton primary onClick={this.logout}>logout</CompoundButton>
            </div>
        )
    }
}