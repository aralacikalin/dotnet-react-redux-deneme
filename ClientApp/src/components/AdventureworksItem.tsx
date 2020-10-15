import { TextField } from '@fluentui/react';
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
    }
    onchange(event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        if(event.currentTarget.className=="date"){
            this.setState({
                date:newValue||""
            })
        }
    }
    clicked(){
        alert(this.state.date)
    }
    render(){
        return(
            <div>
                <TextField label="Department Name" underlined required value={this.state.name}/>
                <TextField label="Department Group Name" underlined required value={this.state.groupName}/>
                <TextField className="date" label="Date" value={this.state.date} onChange={this.onchange} underlined required/>
                <button onClick={this.clicked}></button>
            </div>
        );
    }
}