import React, { Component } from 'react'
import './dashboard.css';
import { Container, Row, Col } from 'react-bootstrap';
import WidgetText from './WidgetText';
import WidgetBar from './WidgetBar';
import WidgetDoughnut from './widgetDoughnut';
import WidgetPareto from './widgetPareto';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class dashboard extends Component {
    
   constructor(){
       super(); 
       this.state={
           items: [],
           dropdownOptions: [],
           selectedValue: null,
           organicSource: null,
           directSource: null,
           referralSource: null,
           socialSource: null,
           emailSource: null,
           pageViews: null,
           users: null,
           newUsers: null,
           sessions: null,
           noSession: null,
           pagePerSession: null,
           avgSession: null,
           bounceRate: null,
           sourceArr: [],
           usersArr: [],
           sessionArr: [],
           sessChart: [],
       }
   }

   getData= arg =>{
       const arr = this.state.items;
       const arrLen = arr.length;

       let organicSource=0;
       let directSource=0;
       let referralSource=0;
       let socialSource=0;
       let emailSource=0;
       let pageViews=0;
       let users=0;
       let newUsers=0;
       let sessions=0;
       let noSession=0;
       let pagePerSession=0;
       let avgSession=0;
       let bounceRate=0;
       let selectedValue=null;
       let sourceArr = [];
       let usersArr=[];
       let sessionArr=[];
       let sessChart=[];

       for(let i=0; i<arrLen; i++){
           if(arg === arr[i]["month"]){
               organicSource=arr[i].organic_source;
               directSource=arr[i].direct_source;
               referralSource=arr[i].referral_source;
               socialSource=arr[i].social_source;
               emailSource=arr[i].email_source;
               pageViews=arr[i].page_views;
               users=arr[i].users;
               newUsers=arr[i].new_users;
               sessions=arr[i].sessions;
               noSession=arr[i].number_of_sessions_per_users;
               pagePerSession=arr[i].page_per_session;
               avgSession=arr[i].avg_session_time;
               bounceRate=arr[i].bounce_rate;
               sourceArr.push(
                {
                    label: "Organic Source",
                    value: arr[i].organic_source
                  },
                  {
                    label: "Direct Source",
                    value: arr[i].direct_source
                  },
                  {
                    label: "Referral Source",
                    value: arr[i].referral_source
                  },
                  {
                    label: "Social Source",
                    value: arr[i].social_source
                  },
                  {
                    label: "Email Source",
                    value: arr[i].email_source
                  }
                 
               );
               usersArr.push(
                {
                    label: "Users",
                    value: arr[i].users
                  },
                  {
                    label: "New Users",
                    value: arr[i].new_users
                  },
               );

               sessionArr.push(
                // {
                //     label: "Sessions",
                //     value: arr[i].sessions
                //   },
                  {
                    label: "No Of Sessions Per Users",
                    value: arr[i].number_of_sessions_per_users
                  },
                  {
                    label: "Page Per Session",
                    value: arr[i].page_per_session
                  },
                  {
                    label: "Avg Session Time",
                    value: arr[i].avg_session_time
                  },
                  {
                    label: "Bounce Rate",
                    value: arr[i].bounce_rate
                  }
                 
               );
               sessChart.push(
                {
                    label: "Sessions",
                    value: arr[i].sessions
                  }
               );
           }
       }
       selectedValue=arg;

       this.setState({
           organicSource: organicSource,
           directSource:directSource,
           referralSource:referralSource,
           socialSource:socialSource,
           emailSource:emailSource,
           pageViews:pageViews,
           users:users,
           newUsers:newUsers,
           sessions:sessions,
           noSession:noSession,
           pagePerSession:pagePerSession,
           avgSession:avgSession,
           bounceRate:bounceRate,
           sourceArr: sourceArr,
           usersArr:usersArr,
           sessionArr:sessionArr,
           sessChart:sessChart,
       })
       console.log(this.state.sourceArr)
   }

   updateDashboard=event=>{
       this.getData(event.value);
       this.setState({selectedValue: event.value}, ()=>{
           console.log(this.state.organicSource)
       }); 
   }

   componentDidMount(){
    fetch(url)
    .then(response => response.json())
    .then(data => {

        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
            let rowObject = {};
            for (let j = 0; j < batchRowValues[i].length; j++) {
                rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
            }
            rows.push(rowObject);
        }

        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
            dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
            {
                items: rows,
                dropdownOptions: dropdownOptions,
                selectedValue: "Jan 2018"
            },
            () => this.getData("Jan 2018")
        );

        });
   }

    render() {
         
      
        return ( 
            <div>
            {/* <container fluid>
                <Row className="TopHeader">
                    <Col>
                    Dashboard
                    </Col>
                    <Col>
                    <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                    </Col>
                </Row>
            </container> */}
            <div className="container-fluid abc">
            {/* <div className="container-fluid dash_head"> */}
               <div className="row dash_head">
                   <div className="col-lg-8">
                       <h1> Dashboard</h1>
                   </div>
                   <div className="col-lg-4">
                   <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                   </div>
               </div>
               {/* </div> */}
            {/* <container fluid>
               SOURCE STATE
            </container> */}
            <div className="row">
            <div className="col-md-12 heading-color">
              <h1>SOURCE STATE</h1>
              </div>
            </div>
         {/* <div className="container"> */}
            <div className="row">
                <div className="col-md-4">
                <WidgetText title="ORGANIC SOURCE" value={this.state.organicSource} />
                </div>
                <div className="col-md-4">
                <WidgetText title="DIRECT SOURCE" value={this.state.directSource} />
             
                </div>
                <div className="col-md-4">
                <WidgetText title="REFERRAL SOURCE" value={this.state.referralSource} />
                </div>
            </div>
            {/* </div> */}
            
            <div className="row">
                <div className="col-md-6">
                <WidgetText title="SOCIAL SOURCE" value={this.state.socialSource} />
            
                </div>
                <div className="col-md-6">
                <WidgetText title="EMAIL SOURCE" value={this.state.emailSource} />
             
                </div>
                <div col-md-12>
              <WidgetPareto title="SOURCE COMPARISION" data={this.state.sourceArr} />
              </div>
            </div>

            <div className="row">
            <div className="col-md-12 heading-color">
              <h1>USERS COMPARISION</h1>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4">
              <WidgetText title="USER" value={this.state.users} />
               </div>
               <div className="col-md-4">
               <WidgetText title="NEW USER" value={this.state.newUsers} />
               </div>
              
               <div className="col-md-4">
               <WidgetText title="PAGE VIEWS" value={this.state.pageViews} />
               </div>
               <div className="col-md-12">
               <WidgetDoughnut title="USERS COMPARISION" data={this.state.usersArr} />

               </div>

            </div>


            <div className="row">
            <div className="col-md-12 heading-color">
              <h1>SESSION STATE</h1>
              </div>
            </div>

            
            {/* <div className="abc"></div> */}
            <div className="row">
             <div className="col-md-4">
             <WidgetText title="SESSIONS" value={this.state.sessions} />
             </div>
             <div className="col-md-4">
             <WidgetText title="NO OF SESSIONS PER USERS" value={this.state.noSession} />
             </div>
             <div className="col-md-4">
             <WidgetText title="PAGE PER SESSION" value={this.state.pagePerSession} />
             </div>
             <div className="col-md-6">
             <WidgetText title="AVG SESSION TIME" value={this.state.avgSession} />
             </div>
             <div className="col-md-6">
             <WidgetText title="BOUNCE RATE" value={this.state.bounceRate} />
             </div>
             <div className="col-md-6">
                 <WidgetBar title="SESSION CHART" data={this.state.sessChart} />
             </div>
             <div className="col-md-6">
                 <WidgetBar title="SESSION COMPARISION" data={this.state.sessionArr} />
             </div>

            </div>
            
            {/* <container className="mainDashboard">
                <Row >
                    <Col>
             <WidgetText title="ORGANIC SOURCE" value={this.state.organicSource} />
                    </Col>
                    <Col>
             <WidgetText title="DIRECT SOURCE" value={this.state.directSource} />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
             <WidgetText title="REFERRAL SOURCE" value={this.state.referralSource} />
                    </Col>
                    <Col>
             <WidgetPareto title="SOURCE COMPARISION" data={this.state.sourceArr} />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
             <WidgetText title="SOCIAL SOURCE" value={this.state.socialSource} />
                    </Col>
                    <Col>
             <WidgetText title="EMAIL SOURCE" value={this.state.emailSource} />
                    </Col>
                    </Row>

                <Row >
                    <Col>
             <WidgetText title="USER" value={this.state.users} />
                    </Col>
                    <Col>
             <WidgetText title="NEW USER" value={this.state.newUsers} />
                    </Col>
                    <Col>
             <WidgetText title="PAGE VIEWS" value={this.state.pageViews} />
                    </Col>
                    <Col>
            <WidgetDoughnut title="USERS COMPARISION" data={this.state.usersArr} />
                    </Col>
                </Row>

                <Row >
                    <Col>
             <WidgetText title="SESSIONS" value={this.state.sessions} />
                    </Col>
                    <Col>
             <WidgetText title="NO OF SESSIONS PER USERS" value={this.state.noSession} />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
             <WidgetText title="PAGE PER SESSION" value={this.state.pagePerSession} />
                    </Col>
                    <Col>
                    <WidgetBar title="SESSION COMPARISION" data={this.state.sessionArr} />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
             <WidgetText title="AVG SESSION TIME" value={this.state.avgSession} />
                    </Col>
                    <Col>
             <WidgetText title="BOUNCE RATE" value={this.state.bounceRate} />
                    </Col>
                    </Row>
            </container>*/}
                    
            </div> 
            <div className="row">
            <div className="col-md-12 footer">
              <p>Creadet by: Muhammad Haseeb</p>
              </div>
            </div>
            </div>
        )
    }
}

export default dashboard;
