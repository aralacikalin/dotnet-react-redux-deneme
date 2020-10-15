import { DetailsList,SelectionMode,IColumn, CompoundButton } from '@fluentui/react';
import * as React from 'react';
import "./Adventureworks.css";

interface IState{
    adventureworks:Object[],
    columns:IColumn[],
    currentIndex:number,
    departmentstoShow:Object[],
    oldIndex:number
}

export default class Adventureworks extends React.PureComponent<{},IState>{
    isUnmounted: boolean=false;

    constructor(props:any) {
        super(props);

        const columns: IColumn[] = [
            {
              key:"column1",
              name:"Name",
              maxWidth:300,
              minWidth:100,
              fieldName:"name",
              className:"list",
              headerClassName:"header"
            },
            {
              key:"column2",
              name:"Group Name",
              maxWidth:300,
              minWidth:100,
              fieldName:"groupName",
              className:"list",
              headerClassName:"header"
            },
            {
              key:"column3",
              name:"Date Modified",
              maxWidth:300,
              minWidth:100,
              fieldName:"modifiedDate",
              className:"list",
              headerClassName:"header"
            }
          ];
        
        this.state={
            adventureworks:[],
            columns:columns,
            currentIndex:5,
            departmentstoShow:[],
            oldIndex:0
        }
        this.nextButtonHandle=this.nextButtonHandle.bind(this);
        this.prevButtonHandle=this.prevButtonHandle.bind(this);
    }

    async componentDidMount(){
        const res = await fetch("/adventureworks")
        const data =await res.json()
        console.log(data)
        if(this.isUnmounted){
            return;
        }
        else{

            this.setState({adventureworks:data,departmentstoShow:data.slice(0,5)})
        }
        
    }
    componentWillUnmount(){
        this.isUnmounted=true;
    }

    renderDepartmentTable(){
        return(
            <div>
                <DetailsList
                    items={this.state.departmentstoShow}
                    selectionMode={SelectionMode.none}
                    columns={this.state.columns}
                />

            </div>
        );
    }

    nextButtonHandle(){


        if(!(this.state.currentIndex>=this.state.adventureworks.length)){
        this.setState({currentIndex:this.state.currentIndex+5},()=>{
            this.setState({departmentstoShow:this.state.adventureworks.slice(this.state.currentIndex-5,this.state.currentIndex)})
        });
    }

        
    }
    prevButtonHandle(){

        this.setState({currentIndex:this.state.currentIndex-5},()=>{
            if(this.state.currentIndex<=5){
                this.setState({currentIndex:5},()=>{

                    this.setState({departmentstoShow:this.state.adventureworks.slice(0,5)})
                });
            }
            else{
                this.setState({departmentstoShow:this.state.adventureworks.slice(this.state.currentIndex-5,this.state.currentIndex)})
            }
        });

        
    }
    renderButtons(){
        return(
            <div className="d-flex justify-content-between">
                <CompoundButton primary onClick={this.prevButtonHandle} >Previous</CompoundButton>
                <CompoundButton primary onClick={this.nextButtonHandle}>Next</CompoundButton>
            </div>
        );
    }

    render(){
        return(
            <React.Fragment>
            <h1 id="tabelLabel">Human Recourses Departments</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            {this.renderDepartmentTable()}
            {this.renderButtons()}
          </React.Fragment>
        );
    }


}