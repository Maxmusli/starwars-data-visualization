import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import BarChart from './Components/bar_chart.jsx';
import Table from './Components/table.jsx';
import NavigationBar from './Components/nav_bar.jsx';

function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/" >
            <Redirect to="/bar-chart" />
          </Route>
          <Route exact path="/bar-chart" component={BarChart} />
          <Route exact path="/table" component={Table} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
