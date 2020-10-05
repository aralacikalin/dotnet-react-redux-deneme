import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {initializeIcons, Nav,INavLinkGroup,INavLink} from "@fluentui/react";
import 'office-ui-fabric-react/dist/css/fabric.css';



const Links:INavLinkGroup[]= [
  {
    links:[
      {
          name: 'Home',
          url: "/",
          key: "/",

      },
      {
          name: 'Counter',
          url: '/counter',
          key: "/counter",
      },
      {
          name: 'Fetch Data',
          url: '/fetch-data',
          key: '/fetch-data',
      }
    ]
  }
];

interface IProps{
  asd?:string
}
interface IState {
  count: number,
  current?:string
}
const defaultStates:IState={
  count:1,
  current:"/"
}

export class NavBar extends Component<IProps,IState> {
  static displayName = NavBar.name;
  
  constructor (props:IProps) {
      super(props);
      initializeIcons();
      
      this.onClick = this.onClick.bind(this);
      this.state = { 
        count:1,
        current:"/"
          
      };
    }

    
  onClick (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    //useHistory.apply(item?.url);
    //console.log(element.url);
    console.log("asd");
    //event.preventDefault();
    //ev&&ev.preventDefault();
    this.setState({current:item&&item.url});
    this.setState({count:this.state.count+1});
    alert(this.state.count)

    //alert(this.state.count)
  }

  render () {
    return (
      
        <div className="ms-Grid" dir="">
            <div className="ms-Grid-col">
                <div className="ms-Grid-col ms-sm1 ms-xl1">

            <Nav
                groups={Links}
                selectedKey={this.state.current}
                onLinkClick={this.onClick}
                ariaLabel="Nav basic example"
                
            >

            </Nav>
                </div>
            </div>
        </div>
      
    );
  }
}
