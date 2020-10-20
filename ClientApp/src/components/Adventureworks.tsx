import { DetailsList,SelectionMode,IColumn, CompoundButton, Selection, DialogType, Dialog, DialogFooter, PrimaryButton, DefaultButton, MessageBar, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import "./Adventureworks.css";

interface IState{
    adventureworks:Object[],
    columns:IColumn[],
    currentIndex:number,
    departmentstoShow:Object[],
    oldIndex:number,
    idToDelte:number,
    isdeletedialoghidden:boolean,
    deletedItem:IDepartment,
    isMessageBar:boolean
}
interface IDepartment {
    id: number,
    name: string,
    groupName: string,
    modifiedDate: string,
}
const dialogContentProps = {
    type: DialogType.normal,
    title: 'Confirmation',
    closeButtonAriaLabel: 'Close',
    subText: 'Do you want to delete the selected department?',
};

export default class Adventureworks extends React.PureComponent<{},IState>{
    isUnmounted: boolean=false;
    private _selection: Selection;

    constructor(props:any) {
        super(props);

        this._selection=new Selection({})

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
            oldIndex:0,
            idToDelte:0,
            isdeletedialoghidden:true,
            deletedItem:{name:"",groupName:"",id:0,modifiedDate:""},
            isMessageBar:false
        }
        this.nextButtonHandle=this.nextButtonHandle.bind(this);
        this.prevButtonHandle=this.prevButtonHandle.bind(this);
        this.oninvoked=this.oninvoked.bind(this);
        this.toggleHideDialog=this.toggleHideDialog.bind(this);
        this.deleteDepartment=this.deleteDepartment.bind(this);
        this.fetchAll=this.fetchAll.bind(this);
        this.messageBarDismiss=this.messageBarDismiss.bind(this);
    }

    async fetchAll(){
        const res = await fetch("/adventureworks")
        const data =await res.json()
        console.log(data)
        if(this.isUnmounted){
            return;
        }
        else{

            this.setState({adventureworks:data,departmentstoShow:data.slice(0,5),currentIndex:5})
        }

    }
    async componentDidMount(){
        this.fetchAll();
        
    }
    componentWillUnmount(){
        this.isUnmounted=true;
    }

    oninvoked(item: IDepartment){
        this.state.departmentstoShow.forEach((depart)=>{
            if(Object.values(depart)[1]==item.name){
                this.setState({idToDelte:Object.values(depart)[0]},()=>{
                    this.setState({isdeletedialoghidden:false})
                })
            }
        })
        
    }

    toggleHideDialog(){
        this.setState({isdeletedialoghidden:true})
    }
    async deleteDepartment(){
        const res = await fetch("/adventureworks/"+this.state.idToDelte)
        const data =await res.json()
        this.setState({deletedItem:data})
        console.log(this.state.deletedItem)


        await fetch(`https://localhost:5001/adventureworks/${this.state.idToDelte}`,{method:"DELETE"})

        this.fetchAll()
        //TODO add delete confirmation using get derpartment by id
        this.setState({isdeletedialoghidden:true})
        this.setState({isMessageBar:true})
    }
    messageBarDismiss(){
        this.setState({isMessageBar:false})
    }

    renderDepartmentTable(){
        return(
            <div>
                {(this.state.isMessageBar?
                    <MessageBar 
                        messageBarType={MessageBarType.success} 
                        dismissButtonAriaLabel="Close" 
                        onDismiss={this.messageBarDismiss}>
                            {this.state.deletedItem.name} is deleted succesfully.
                    </MessageBar>
                    :null)}
                <DetailsList
                    items={this.state.departmentstoShow}
                    selectionMode={SelectionMode.none}
                    selectionPreservedOnEmptyClick={true}
                    selection={this._selection}
                    columns={this.state.columns}
                    onItemInvoked={this.oninvoked}
                    />
                <Dialog
                    hidden={this.state.isdeletedialoghidden}
                    onDismiss={this.toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={this.deleteDepartment} text="Delete" />
                        <Link to={{pathname:"modifyadventure",state:{id:this.state.idToDelte}}}><PrimaryButton  text="Modify" /></Link>
                        <DefaultButton onClick={this.toggleHideDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
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
                <Link to="/addadventureworkitem">
                    <CompoundButton primary>Add New Department</CompoundButton>
                </Link>
                <CompoundButton primary onClick={this.nextButtonHandle}>Next</CompoundButton>
            </div>
        );
    }

    render(){
        return(
            <React.Fragment>
            <h1 id="tabelLabel">Human Recourses Departments</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            <p>To delete or modify a department from database, click it twice.</p>
            {this.renderDepartmentTable()}
            {this.renderButtons()}
          </React.Fragment>
        );
    }


}