import { CompoundButton, Stack, TextField } from '@fluentui/react';
import * as React from 'react';

interface IState{
    name:string,
    groupName:string,
    date:string
}

export default class AdventureworksItem extends React.PureComponent<{},IState>{


    constructor(props:any) {
        super(props);
        this.state={
            name:"",
            groupName:"",
            date:""
        }
        this.onNameChange=this.onNameChange.bind(this)
        this.onGroupNameChange=this.onGroupNameChange.bind(this)
        this.onDateChange=this.onDateChange.bind(this)
        this.clicked=this.clicked.bind(this)
    }
    onDateChange(event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({
            date:newValue||""
        })
    }
    onNameChange(event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({
            name:newValue||""
        })
    }
    onGroupNameChange(event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({
            groupName:newValue||""
        })
    }
    clicked(){
        console.log(this.state.date,this.state.name,this.state.groupName)
    }
    render(){
        return(
            <div>
                <Stack>
                    <TextField label="Department Name" value={this.state.name} onChange={this.onNameChange} underlined  />
                    <TextField label="Department Group Name" value={this.state.groupName} onChange={this.onGroupNameChange} underlined  />
                    <TextField label="Date" value={this.state.date} onChange={this.onDateChange} underlined />
                </Stack>
                <CompoundButton primary onClick={this.clicked}>Add Item</CompoundButton>
            </div>
        );
    }
}