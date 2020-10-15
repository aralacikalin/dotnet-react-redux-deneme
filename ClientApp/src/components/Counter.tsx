import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';
import {CompoundButton,Label} from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import Axios from 'axios';


type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;
interface IState{
    counter:number;
}

class Counter extends React.PureComponent<CounterProps,IState> {
    isUnmount: boolean=false;
    constructor(props:CounterProps){
        super(props);

        this.state={
            counter:0
        }
        this.onclick=this.onclick.bind(this);
    }

    async componentDidMount(){
        const res= await fetch("countervariable")
        const data= await res.json();
        if(this.isUnmount){
            return;
        }
        else{

            this.setState({counter:data})
        }
    }
    componentWillUnmount(){
        this.isUnmount=true;
    }

    onclick(){
        fetch("https://localhost:5001/countervariable",
        {method: 'PUT',headers:{"Content-Type": "application/json"},
            body:JSON.stringify({counter:this.state.counter+1})
        })
        .then((res)=>
        {
            console.log(res)
            this.setState({counter:this.state.counter+1})
        }
        )
    }

    public render() {
        initializeIcons();
        return (
            <React.Fragment>
                <h1>Counter</h1>

                <Label>This is a simple example of a React component.</Label>


                <Label aria-live="polite">Current count: <strong>{this.state.counter}</strong></Label>


                <CompoundButton primary onClick={this.onclick} secondaryText="This button increments the counter.">Increment</CompoundButton>

               
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
