/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Linking,
  View,TouchableOpacity,
  Alert,
  TextInput,
  ToastAndroid,
  Vibration
} from 'react-native';
var axios = require('axios');
var rn = require('random-number');
import { Container, Header, Content, Form, Item, Input,Button,Text,Toast,Card, CardItem,Icon,H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal'


var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();


import { StackNavigator } from 'react-navigation';
import  firebase  from 'firebase' ;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



//********initialize firebase*************//

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCjxNBcZMK9cmYA4BxRhhwID89eTaO0_8s",
  authDomain: "smartpolice-64fe8.firebaseapp.com",
  databaseURL: "https://smartpolice-64fe8.firebaseio.com",
  projectId: "smartpolice-64fe8",
  storageBucket: "",
  messagingSenderId: "18371984418"
});





//******************************************//

class  Dossier extends Component {

  constructor(props) {
    super(props);
    this.state ={
      user :{}
    }
    console.log(JSON.stringify(props));
const {state} = this.props.navigation;

console.log(JSON.stringify(state));
//console.log(state.params.qode.params);

  }


  //******************//
componentWillMount()
{

  axios.get('http://localhost:9000/User/id=04848993')
  .then(function (response) {
    console.log(JSON.stringify(response));
    this.setState({user:response.data})
  })
  .catch(function (error) {
    console.log(error);
  });
}


  render() {
const {state} = this.props.navigation;
const {user} = this.state ;
    return (

      <Container>
        <Header />

        <Content>


<Card>
           <CardItem>
             <Icon active name="logo-googleplus" />
             <Text> Nom : Ilyes</Text>
             <Right>
               <Icon name="arrow-forward" />
             </Right>
            </CardItem>



            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text> Cin :04848993</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>




             <CardItem>
               <Icon active name="logo-googleplus" />
               <Text> Type Sanguin :A</Text>
               <Right>
                 <Icon name="arrow-forward" />
               </Right>
              </CardItem>



              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text> Maladies : Fiévre  Diabéte A</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
               </CardItem>



               <CardItem>
                 <Icon active name="logo-googleplus" />
                 <Text> Numéro de confiance  :20140428</Text>
                 <Right>
                   <Icon name="arrow-forward" />
                 </Right>
                </CardItem>


              </Card>





        </Content>
      </Container>
    );

}

}







class UselessTextInput extends Component {

  constructor(props) {
    super(props);
  //*************initilize firebase*********************//
  this.AlertesRef = firebaseApp.database().ref('/alertes');
  const path = `/alertes/`;
         //pass the path here
  //this._alertesPath = firebaseApp.database.list(path);
    this.state = { long :10.1568, lat :36.8910 , type :'' , nbClick :0};
    this.onSelect = this.onSelect.bind(this);
  }





//**************************//

componentWillMount()
{
  console.log("hhd"+ firebaseApp.database().ref('alertes'));
  /*this.AlertesRef.push({
    date : new Date(),
    type :'vol',
    long :36.8064948,
     lat :10.1815316*/

  //})


}




//**********OnSelectfunction******************//
onSelect = (e) =>
{
console.log("selected with value" + e);
this.setState({type:e})
}





//********************//
AddAlert = () =>
{
this.state.nbClick ++ ;
//***************GENREATE RANDOM NUMBER********************//
var gen = rn.generator({
  min: 1
, max:  3
, integer: true
})
let number = gen();

console.log("clicked" + number);

let { long , lat , type } = this.state ;

   /*this._alertesPath.push({ long : long+number , lat : long+number, date : new Date(),
  type : type
})*/
let date = new Date()
var nb1 =chance.floating({min: 0.02, max: 0.04});
var nb2 =chance.floating({min: 0.02, max: 0.04});
firebaseApp.database().ref('alertes').push({
  long : long+nb1 , lat : lat+nb2, date : date.toString(),
 type : type
})


//**********Show Toast******************//
ToastAndroid.show('Alerte Sauvegardée!', ToastAndroid.SHORT);

console.log("hshhs"+ this.state.nbClick);
const DURATION = 5000

if(this.state.nbClick==5)
{
Vibration.vibrate(DURATION)
}

}



  render() {


    return (

      <Container>
        <Header />
        <Content>




<Card>


 <CardItem>
                    <Grid>

                          <Col>
                        <Button bordered info full onPress={() => this.onSelect("violence")}>
                            <Text>Violence </Text>
                          </Button>
                          </Col>

                               <Col>
                               <Button bordered info full  onPress={() => this.onSelect("vol")}>
                                   <Text>Vols</Text>
                                 </Button>
                               </Col>

                      </Grid>

 </CardItem>


  <CardItem>

                      <Grid>

                            <Col>
                          <Button bordered info full onPress={() => this.onSelect("crime_stupéfinat")}>
                              <Text>Crime de stupéfiants</Text>
                            </Button>
                            </Col>

                                 <Col>
                                 <Button bordered info full  onPress={() => this.onSelect("securite_publique")}>
                                     <Text>Atteinte à la sécurité publique</Text>
                                   </Button>
                                 </Col>


                        </Grid>
 </CardItem>



<CardItem>
        <Grid>


        <Col>
        <Button bordered info full onPress={() => this.onSelect("atteinte_corps_humain")}>
            <Text>Atteinte au corps humain</Text>
          </Button>
        </Col>



        </Grid>

 </CardItem>


<CardItem footer>
        <Grid>

        <Button full danger onPress={() => this.AddAlert()}>
        <Text>Alerter</Text>
        </Button>
        </Grid>

 </CardItem>

</Card>

           </Content>
         </Container>
    );

}

}

//*************UI ***********************//







 class App extends Component<{}> {


  constructor(props){
         super(props);
         console.log("props");
         this.state ={
           isModalVisible : false,
           numTel :'',
           numCin : ''
         }
     }







    _navigate = () => {
      console.log("clicked");
      const {navigate} = this.props.navigation;
      const { numCin,numTel} = this.state ;
    navigate('Details')


    }






    render() {
       return (

         <Container>
         <Header />
         <Content style={styles.container}>

         <Card>
          <CardItem header>
            <H1>AllSafe</H1>
          </CardItem>
           <Form>

            <CardItem>
             <Item>
               <Input placeholder="Numéro de Télephone"
               onChangeText={(text) => {this.setState({numTel}); }}
   value={this.state.numTel} />
    <Icon name='checkmark-circle' />
             </Item>
              </CardItem>

               <CardItem>

             <Item last>
               <Input placeholder="Numéro de Cin"
               onChangeText={(text) => {this.setState({numCin}); }}
   value={this.state.numCin} />
    <Icon name='checkmark-circle' />
             </Item>

               </CardItem>

 <CardItem footer>
             <Grid>

            <Col><Button block danger onPress={() => this._navigate()}><Text> Connecter</Text></Button></Col>

          </Grid>
</CardItem>


           </Form>

           </Card>
         </Content>
       </Container>





       );
     }
   }


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
  container: {
   borderColor: '#d6d7da',
 },
});







//***************Define ***********************//

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
  },
  Details: {
    screen: UselessTextInput,
  },
  Dossier :{
    screen : Dossier
  }
},
  { headerMode: 'none' });


export default RootNavigator;
