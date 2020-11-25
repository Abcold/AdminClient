import React, { Component } from 'react';
import {Button,message} from 'antd';
import { BrowserRouter,HashRouter ,Switch,Route} from "react-router-dom";
import  Login  from "./pages/login/login";
import  Admin  from "./pages/admin/admin";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
         );
    }
    handleClick=()=>{
        message.success('成功..');
    }
}
 
export default App;