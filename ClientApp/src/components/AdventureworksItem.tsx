import { CompoundButton, DatePicker, initializeIcons, MaskedTextField, Stack, TextField } from '@fluentui/react';
import * as React from 'react';

interface IState{
    name:string,
    groupName:string,
    date:Date |undefined
}

export default class AdventureworksItem extends React.PureComponent<{},IState>{


    constructor(props:any) {
        super(props);
        initializeIcons()
        this.state={
            name:"",
            groupName:"",
            date: undefined
        }
        this.onNameChange=this.onNameChange.bind(this)
        this.onGroupNameChange=this.onGroupNameChange.bind(this)
        //this.onDateChange=this.onDateChange.bind(this)
        this.clicked=this.clicked.bind(this)
        this.onDateSelect=this.onDateSelect.bind(this)
    }
    /*
    onDateChange(event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string){
        this.setState({
            date:newValue||""
        })
    }
    */
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
        if(this.state.name!==""&&this.state.groupName!==""){
            var body={}

            if(this.state.date==undefined){

                body={Name:this.state.name,GroupName:this.state.groupName}
            }
            else{

                body={Name:this.state.name,GroupName:this.state.groupName,ModifiedDate:this.state.date}
            }

            fetch("https://localhost:5001/adventureworks",
            {method: 'POST',headers:{"Content-Type": "application/json"},
                body:JSON.stringify(body)
            })
            .then((res)=>
            {
                console.log(res)
                if(res.ok){
                    alert("Department is added")
                }
                else{
                    alert("Department is not added")
    
                }
            })
            console.log(this.state.date,this.state.name,this.state.groupName)
        }
        else{
            alert("Enter all required fields")
        }
    }
    onDateSelect(date: Date | null | undefined){
        if(date&&date){

            this.setState({
                date:date
            })
        }
        else{
            this.setState({
                date:undefined
            })
        }

    }
    render(){
        return(
            <div>
                <Stack>
                    <TextField label="Department Name" value={this.state.name} onChange={this.onNameChange} underlined required  />
                    <TextField label="Department Group Name" value={this.state.groupName} onChange={this.onGroupNameChange} underlined required />       
                    {/*<MaskedTextField label="Date" value={this.state.date} onChange={this.onDateChange} mask="9999-99-99" underlined maskChar="Y-M-D" />*/}
                    <DatePicker  label="Date" allowTextInput={true} onSelectDate={this.onDateSelect} value={this.state.date} underlined />
                </Stack>
                <CompoundButton primary onClick={this.clicked}>Add Item</CompoundButton>
            </div>
        );
    }
}