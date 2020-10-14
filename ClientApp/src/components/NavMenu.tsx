import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';
import {Pivot,PivotItem} from "@fluentui/react";

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    click(){
        
    }
    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">dotnet_react_redux_deneme</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <Pivot>
                                    <PivotItem headerText="Home" onClick={this.click.bind(this)}>
                                        <Redirect to="/"></Redirect>
                                    </PivotItem>
                                    <PivotItem headerText="Counter">
                                        <Redirect to="/counter"></Redirect>
                                    </PivotItem>
                                    <PivotItem headerText="Fetch Data">
                                        <Redirect to="/fetch-data"></Redirect>
                                    </PivotItem>
                                    <PivotItem headerText="Adventureworks">
                                        <Redirect to="/adventurework"></Redirect>
                                    </PivotItem>
                                </Pivot>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
