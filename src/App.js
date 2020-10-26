import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';
import FetchData from './service/FetchData';
import './css/style.css';

class App extends React.Component {
  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  fetchData = new FetchData();

  componentDidMount = () => {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket = () => {
    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) });
        return data;
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  changeRocket = rocket => this.setState({ rocket }, this.updateRocket);

  updateCompany = () => this.fetchData.getCompany().then(company => this.setState({ company }));

  render() {
    const { rocket, rockets, rocketFeatures, company } = this.state;

    return (
      <Router>
        <Header rockets={rockets} changeRocket={this.changeRocket} />
        <Route exact path="/">
          {company && <Home company={company} />}
        </Route>
        <Route path="/rocket">
          <Main rocket={rocket} />
          {rocketFeatures && <Features {...rocketFeatures} />}
        </Route>
        <Router path="/calendar">
          <Main />
          <Calendar />
        </Router>
        <Route path="/details">
          <Main />
          <Details />
        </Route>
        {company && <Footer {...company.links} />}
      </Router>
    );
  }  
}

export default App;