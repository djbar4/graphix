import React, {Component} from 'react'
import { Graphix } from 'graphik';
import './index.css'

import 'graphik/dist/index.css'

import harryPotterData from './resources/harry_potter.json';
import orgStructureData from './resources/savedData.json';
import companyData from './resources/companies.json';
import welcomeData from './resources/welcome.json';
import coloursData from './resources/colours.json';
import contextData from './resources/edges_and_contexts.json';
import edgesData from './resources/edges.json';
import endData from './resources/end.json';
import plantData from './resources/plant.json';


import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import gif from './resources/react-gif.gif'
import { Col, Row } from 'react-bootstrap';



const rootCss = {
      flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Segoe UI'

}

const footerCss = {
      padding: '1px',
    backgroundColor: '#868686'

}


const defaultConfig = {
  nodeWidth: 90,
  nodeHeight: 60,
  nodeRx: 10,
  nodeColour: '#212121',
  nodeStroke: '#65d3ec',
  svgCanvasWidth: 1032,
  svgCanvasHeight: 594,
  svgCanvasBackgroundColour: '#383838',
  nodeFontColour: 'white',
  edgeStroke: 'black',
  edgeFontColour: 'white'
}



const nodesConfig = {
  nodeWidth: 60,
  nodeHeight: 60,
  nodeRx: 10,
  nodeColour: '#212121',
  nodeStroke: 'green',
  svgCanvasWidth: 1032,
  svgCanvasHeight: 594,
  svgCanvasBackgroundColour: '#020d21',
  nodeFontColour: 'white',
  edgeStroke: 'black',
  edgeFontColour: 'white'
}

const companiesConfig = {
  nodeWidth: 60,
  nodeHeight: 60,
  nodeRx: 10,
  nodeColour: '#212121',
  nodeStroke: 'black',
  svgCanvasWidth: 1032,
  svgCanvasHeight: 594,
  svgCanvasBackgroundColour: '#383838',
  nodeFontColour: 'white',
  edgeStroke: 'black',
  edgeFontColour: 'white'
}

const plantsConfig = {
  nodeWidth: 30,
  nodeHeight: 30,
  nodeRx: 40,
  nodeColour: '#e8e7df',
  nodeStroke: 'black',
  svgCanvasWidth: 1032,
  svgCanvasHeight: 594,
  svgCanvasBackgroundColour: '#e8e7df',
  nodeFontColour: 'black',
  edgeStroke: 'black',
  edgeFontColour: 'black'
}

/*
- Function which download a JSON version of the graph data on save.
*/
const saveData = (data) => {
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(data)], {type: 'application/json'});

  a.href = URL.createObjectURL(file);
  a.download = 'graphix_test_data.json';
  a.click();
};


export default class App extends Component {
  constructor(props) {
    super(props)

    this.changePage = this.changePage.bind(this);
    
    this.state = {
      data: welcomeData,
      config: defaultConfig,
      key: 'welcome'
    };
  }

  changePage(data, config, key) {
    console.log('changed')
    this.setState({
      data,
      config,
      key
    })
  }

  render(){
    console.log('rerendered')
    console.log(this.state)
  return (
    <div className={rootCss}>
      <Navbar style={{backgroundColor: '#212121', borderBottom: '2px solid #868686'}} variant="dark">
      <Navbar.Brand >
      <img
        alt=""
        src={gif}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Graphix</Navbar.Brand>
      </Navbar>
      <div>
        <Container style={{padding: 0}}>
          <Row noGutters>
          <Col xs={2} style={{backgroundColor: '#212121', borderRight: '2px solid #868686'}}>
            <Nav  className="flex-column">
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(welcomeData, defaultConfig, 'welcome')} eventKey="welcome">Welcome!</Nav.Link>
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(coloursData, nodesConfig, 'colours')} eventKey="colours">Nodes</Nav.Link>
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(contextData, defaultConfig, 'contexts')} eventKey="contexts">Context Menus</Nav.Link>
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(edgesData, defaultConfig, 'edges')} eventKey="edges">Edges</Nav.Link>

              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(harryPotterData, defaultConfig, 'harry')} eventKey="link-1" >Harry Potter</Nav.Link>
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(companyData, companiesConfig, 'companies')} eventKey="link-2" >Companies</Nav.Link>
              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(plantData, plantsConfig, 'plants')} eventKey="link-2" >Biological</Nav.Link>

              <Nav.Link style={{color: '#63cee6'}} onSelect={() => this.changePage(endData, defaultConfig, 'end')} eventKey="end" >End</Nav.Link>

            </Nav>
              </Col>
              <Col xs={10}>
              <CssBaseline />

              <Container component="main" style={{padding: 0}}>
                <Graphix key={this.state.key} data={this.state.data} userConfig={this.state.config} externalSaveGraph={saveData} />
              </Container>
              </Col>
          </Row>
        </Container>
      </div>

      <footer className={footerCss}>
      </footer>    
      </div>
  )
  }
}

