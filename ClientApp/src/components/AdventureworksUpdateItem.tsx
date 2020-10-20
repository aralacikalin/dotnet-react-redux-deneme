import { CompoundButton, DatePicker, initializeIcons, MaskedTextField, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IState{
    name:string,
    groupName:string,
    date: Date|undefined
}
interface loc{
    state:{id:number}
}
interface IProps{
    location:loc
}

export default class AdventureworksUpdateItem extends React.PureComponent<IProps,IState>{
    isUnmounted: boolean=false;


    constructor(props:IProps) {
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
    async fetchAll(){
        const res = await fetch(`/adventureworks/${this.props.location.state.id}`)
        const data =await res.json()
        console.log(data)
        if(this.isUnmounted){
            return;
        }
        else{

            this.setState({name:data.name,groupName:data.groupName,date:new Date(data.modifiedDate)})
        }

    }
    async componentDidMount(){
    this.fetchAll();
    
    }
    componentWillUnmount(){
    this.isUnmounted=true;
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
        if(this.state.name!==""&&this.state.groupName!==""){
            var body={}

            if(this.state.date==undefined){

                body={Name:this.state.name,GroupName:this.state.groupName}
            }
            else{

                body={DepartmentId:this.props.location.state.id,Name:this.state.name,GroupName:this.state.groupName,ModifiedDate:this.state.date}
            }

            fetch(`/adventureworks/${this.props.location.state.id}`,
            {method: 'PUT',headers:{"Content-Type": "application/json"},
                body:JSON.stringify(body)
            })
            .then((res)=>
            {
                console.log(res)
                if(res.ok){
                    alert("Department is modified")
                }
                else{
                    alert("Department is not modified")
    
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
            var newdate=date
            newdate.setHours(0,0,0,0)
            newdate.setUTCHours(0,0,0,0)
            this.setState({
                date:newdate
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
                <div className="d-flex justify-content-between">
                    <Link to="/adventurework">
                        <CompoundButton primary onClick={this.clicked}>Modify Item</CompoundButton>
                    </Link>
                    <Link to="/adventurework">
                        <CompoundButton primary >Cancel</CompoundButton>
                    </Link>
                </div>
            </div>
        );
    }
}