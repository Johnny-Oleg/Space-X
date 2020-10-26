import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
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
    const { rockets, rocketFeatures, company } = this.state;

    return (
      <BrowserRouter>
        <Header rockets={rockets} changeRocket={this.changeRocket} />
        <Route exact path="/" render={() => company && <Home company={company} />} />
        <Route path="/rocket" render={() => rocketFeatures && <Features {...rocketFeatures} />} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/details/:id" component={Details} />
        {company && <Footer {...company.links} />}
      </BrowserRouter>
    );
  }  
}

export default App;