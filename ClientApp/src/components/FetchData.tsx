import "./FetchData.css";
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import {DetailsList,SelectionMode,IColumn} from "@fluentui/react";
import {CompoundButton} from "@fluentui/react";

// At runtime, Redux will merge together...
type WeatherForecastProps =
  WeatherForecastsStore.WeatherForecastsState // ... state we've requested from the Redux store
  & typeof WeatherForecastsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

interface IState{
  columns:IColumn[];
}

class FetchData extends React.PureComponent<WeatherForecastProps,IState> {
  // This method is called when the component is first added to the document
  constructor(props: WeatherForecastProps){
    super(props)
    const columns: IColumn[] = [
      {
        key:"column1",
        name:"Date",
        maxWidth:300,
        minWidth:100,
        fieldName:"date",
        className:"list",
        headerClassName:"header"
      },
      {
        key:"column2",
        name:"Temp. (C)",
        maxWidth:300,
        minWidth:100,
        fieldName:"temperatureC",
        className:"list",
        headerClassName:"header"
      },
      {
        key:"column3",
        name:"Temp. (F)",
        maxWidth:300,
        minWidth:100,
        fieldName:"temperatureF",
        className:"list",
        headerClassName:"header"
      },
      {
        key:"column4",
        name:"Summary",
        maxWidth:300,
        minWidth:100,
        fieldName:"summary",
        className:"list",
        headerClassName:"header"
      }
    ];
    this.state={
      columns:columns
    };
  }
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  private renderForecastsTable() {
    return (
      <div className="header">
            <DetailsList
              items={this.props.forecasts}
              selectionMode={SelectionMode.none}
              columns={this.state.columns}
            />
      </div>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link to={`/fetch-data/${prevStartDateIndex}`}>
          <CompoundButton primary >
          Previous
          </CompoundButton>
        </Link>
        {this.props.isLoading && <span>Loading...</span>}
        <Link to={`/fetch-data/${nextStartDateIndex}`}>
          <CompoundButton primary >
            Next
          </CompoundButton>
        </Link>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
