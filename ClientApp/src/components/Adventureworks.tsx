import { DetailsList,SelectionMode,IColumn } from '@fluentui/react';
import * as React from 'react';
import "./Adventureworks.css";

interface IState{
    adventureworks:Object[],
    columns:IColumn[];
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
            columns:columns
        }
    }

    async componentDidMount(){
        const res = await fetch("/adventureworks")
        const data =await res.json()
        console.log(data)
        if(this.isUnmounted){
            return;
        }
        else{

            this.setState({adventureworks:data})
        }
        
    }
    componentWillUnmount(){
        this.isUnmounted=true;
    }

    renderDepartmentTable(){
        return(
            <div className="header">
                <DetailsList
                    items={this.state.adventureworks}
                    selectionMode={SelectionMode.none}
                    columns={this.state.columns}
                />
      </div>
        );
    }

    render(){
        return(
            <React.Fragment>
            <h1 id="tabelLabel">Human Recourses Departments</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            {this.renderDepartmentTable()}
          </React.Fragment>
        );
    }


}