import { ActionButton, CompoundButton, DefaultButton, Label, PrimaryButton, TextField } from '@fluentui/react';
import React, { Component, FormEvent } from 'react';
import './Login.css';

interface Istate{
    username:string,
    password:string,
    isLogedIn:boolean,
    user:string
}

export default class Login extends React.PureComponent<{},Istate>{

    constructor(props:any){
        super(props);
        this.state={
            username:"no-user",
            password:"",
            isLogedIn:false,
            user:"no-user"
        }

        this.onUserNameChange=this.onUserNameChange.bind(this)
        this.onPasswordChange=this.onPasswordChange.bind(this)
        this.authenticate=this.authenticate.bind(this)
        this.logout=this.logout.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    async logout(){
        await fetch("/logout").then(res=>{
            if(res.ok){
                this.setState({isLogedIn:false,user:"no-user",username:"no-user"})
            }
        });
    }

    onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        this.authenticate()

    }

    async authenticate(){
        
        var userinfo={UserName:this.state.username,Password:this.state.password}
        await fetch("/authenticate",{method:"POST",credentials: 'same-origin',headers:{"Content-Type": "application/json"},body:JSON.stringify( userinfo)})
            .then((res)=>(res.text())).then(data=>{
                if(data===this.state.username){
                    console.log(data)
                    this.setState({user:data,isLogedIn:true})
                }
            });
    }

    onUserNameChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({username:newValue||""})
        
    }
    onPasswordChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({password:newValue||""})
    }
    render(){
        return(
            <div >
                {
                this.state.isLogedIn?
                (
                    <div className="buttons">
                        <Label disabled className="singlebutton">{this.state.user}</Label>
                        <ActionButton onClick={this.logout}>Logout</ActionButton>
                    </div>
                ):
                (
                    <form onSubmit={this.onSubmit}>
                        <div className="buttons">
                            <div className="inputs">
                                <TextField className="singlebutton" label="Username" required onChange={this.onUserNameChange}/>
                                <TextField className="singlebutton" label="Password" required onChange={this.onPasswordChange} />
                            </div>
                            <PrimaryButton type="submit" onClick={this.authenticate}>Login</PrimaryButton>
                        </div>
                    </form>
                )
                }
            </div>
        )
    }
}