import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, View, ImageBackground, TouchableOpacity, Text, FlatList, ScrollView, Dimensions, Alert, Image } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Metodos from "./Metodos"
import {data, index, prices, zones, comboios} from './DataBase'

const { width: screenwidth } = Dimensions.get('window');

function calc(dest, ori){
  let var1 = []
  let var2 = []
  dest.split(':').map(item =>{
    var1.push(parseInt(item))
  })
  ori.split(':').map(item =>{
    var2.push(parseInt(item))
  })
  var h =0
  var m =0
  h=var1[0]-var2[0]
  if(var1[1]<var2[1]){
    h=h-1
    m=60-var2[1]+var1[1]
  }
  else
    m=var1[1]-var2[1]

  let sH=h.toString()
  let sM=m.toString()

  if(sH.length===1)
    sH='0'+sH
  if(sM.length===1)
    sM='0'+sM

  return sH+':'+sM
}

function getPrice(origem, destino){
  var line1=''
  var line2=''
  data.map(item => {
    if(item.name === origem)
      line1=item.value
    else if(item.name === destino)
      line2=item.name
  })
  let list1 = []
  let list2 = []
  index.map(item => {
    if(item.linha === line1)
      list1=item.value
    else if(item.linha === line2)
      list2=item.value
  })
  var index1=0
  var index2=0
  list1.map(item => {
    if(item.value===origem)
      index1=item.idx
    else if(item.value === destino)
      index2=item.idx
  })
  
  //Melhorar depois a partir daqui
  let pric = []
  prices.map(item => {
    if(item.linha===line1)
      pric=item.value
  })
  var nrZ = pric[index1][index2-1]
  var rt =0
  zones.map(item => {
    if(item.z === nrZ)
      rt= item.v
  })
  return rt
}

function getTimes(origem, destino){
  
  var line1=''
  var line2=''
  data.map(item => {
    if(item.name === origem)
      line1=item.value
    else if(item.name === destino)
      line2=item.value
  })

  let list1 = []
  let list2 = []
  index.map(item => {
    if(line1.includes(item.linha))
      list1=item.value
    else if(line2.includes(item.linha))
      list2=item.value
  })

  var index1=0
  var index2=0
  list1.map(item => {
    if(item.value===origem)
      index1=item.idx
    else if(item.value === destino)
      index2=item.idx
  })

  let rtn = []

  comboios.map(item => {
    if(item.linha===line1){
      if(index1<index2){
        item.value1.map(value => {
          if(value[index1]!='-' && value[index2]!='-')
            rtn.push({ori: value[index1], dest: value[index2], dur:calc(value[index2],value[index1])});
        })
      }
      else if(index1>index2){
        item.value2.map(value => {
          if(value[index1]!='-' && value[index2]!='-')
            rtn.push({ori: value[index1], dest: value[index2], dur:calc(value[index2],value[index1])});
        })
      }
    }
  })
  return rtn;
  
}

function getHorario(origem, destino, ori, dest){

  var line1=''
  var line2=''
  data.map(item => {
    if(item.name === origem)
      line1=item.value
    else if(item.name === destino)
      line2=item.name
  })

  let list1 = []
  let list2 = []
  index.map(item => {
    if(item.linha === line1)
      list1=item.value
    else if(item.linha === line2)
      list2=item.value
  })

  var index1=0
  var index2=0
  list1.map(item => {
    if(item.value===origem)
      index1=item.idx
    else if(item.value === destino)
      index2=item.idx
  })

  let rtn = []

  comboios.map((item,idx) => {
    if(item.linha===line1){
      if(index1<index2){
        item.value1.map(value => {
          if(value[index1]===ori && value[index2]===dest){
            list1.map(item => {
              if(item.idx<=index2 && item.idx>=index1 && value[item.idx]!='-')
                rtn.push({est: item.value, hor: value[item.idx]})
            })
          }
          })
        }
      else if(index1>index2){
        item.value2.map(value => {
          if(value[index1]===ori && value[index2]===dest){
            list1.reverse().map(item => {
              if(item.idx<=index1 && item.idx>=index2 && value[item.idx]!='-')    
                rtn.push({est: item.value, hor: value[item.idx]})
            })
          }
        })
      }
    }
  })
  return rtn
}

export default function Compra() {
  const [current, setCurrent] = useState('Main');
  const [origem, onChangeO] = React.useState(null);
  const [destino, onChangeD] = React.useState(null);

  const Main = (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./Images/waiting.png')}
        style={styles.image2}
      />
      <View style={styles.line}>
      <View style={styles.location}>
        <MaterialIcons style={{fontSize: 40,}} color={'#ffffff' } name="location-on" />
      </View>
      // TextInput não é reusável não sei porquê
      <TextInput
        style={styles.input}
        value={origem}
        onChangeText={onChangeO}
        placeholder="Origem"
      />
      </View>
      <View style={styles.line}>
        <View style={styles.location}>
          <MaterialIcons style={{fontSize: 40,}} color={'#ffffff' } name="location-on" />
        </View>
        // TextInput não é reusável não sei porquê
        <TextInput
          style={styles.input}
          value={destino}
          onChangeText={onChangeD}
          placeholder="Destino"
        />
      </View>
      <View style={styles.line2}>
        <View style={styles.btn}>
          <Button
            title="Horários"
            color='#74b751'
            onPress={() => {setCurrent(Horario)}}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Comprar"
            color='#74b751'
            onPress={() => {setCurrent(Compra)}}
          />
        </View>
      </View>
    </SafeAreaView>
  );

  const Horario = () => (
    <View style={styles.container2}>
      <Text style={{textAlign: 'center', fontSize: 35}}>{origem} - {destino}</Text>
      <View style={{backgroundColor: '#EDEDED', borderTopColor: '#74b751', borderBottomColor: '#74b751', borderLeftColor:'#EDEDED', borderRightColor:'#EDEDED' ,  borderWidth: 2}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Origem</Text>
          </View>
          <View style={{width: screenwidth/4, height: 40,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Destino</Text>
          </View>
          <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Duração</Text>
          </View>
          <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Detalhes</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
        {getTimes(origem, destino).map((el, idx) => {
          if(idx%2===0){
            return (
              <View style={{flexDirection: 'row'}}>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.ori}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.dest}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.dur}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => {setCurrent(ListHorarios(el.ori, el.dest))}}>
                    <MaterialIcons color='#74b751' name="zoom-in" size={40}/>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else{
            return (
              <View style={{flexDirection: 'row', backgroundColor: '#EDEDED'}}>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.ori}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.dest}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.dur}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => {setCurrent(ListHorarios(el.ori, el.dest))}}>
                    <MaterialIcons color='#74b751' name="zoom-in" size={40}/>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })}
        </View>
      </ScrollView>
      <Button
            title="Voltar"
            color='#74b751'
            onPress={function(){onChangeD(null),onChangeO(null),setCurrent(Main)}}
          />
    </View>
  );

  const showAlert = () =>
  Alert.alert(
    "",
    "Pretende Efetuar o Pagamento?",
    [
      {
        text: "Cancelar",
         style: 'destructive',
        onPress: () => {Alert.alert("Pagamento Cancelado")}
      
      },
       {
        style: 'cancel',
        text: "Sim",
        onPress: () => {Alert.alert("Pagamento Efetuado"); setCurrent(Main)}
      },
    ],
  );

  const Compra = () => (
    <View style={styles2.container}>
        <Text style={styles2.textTitle}>Pagamento no valor de {getPrice(origem, destino)}€ </Text>
      <Metodos></Metodos>
      <TouchableOpacity
        onPress={showAlert}
        style={styles2.roundButton}>
        <Text style={styles2.textbutton}> Efetuar Pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={function(){onChangeD(null),onChangeO(null),setCurrent(Main)}}
        style={styles2.roundButton}>
        <Text style={styles2.textbutton}> Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  const ListHorarios = (ori, dest) => (
    <View style={styles.container2}>
      <Text style={{textAlign: 'center', fontSize: 35}}>Detalhes</Text>
      <View style={{backgroundColor: '#EDEDED', borderTopColor: '#74b751', borderBottomColor: '#74b751', borderLeftColor:'#EDEDED', borderRightColor:'#EDEDED' ,  borderWidth: 2}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: screenwidth/4*3,height: 40, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Estação</Text>
          </View>
          <View style={{width: screenwidth/4, height: 40,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, flexShrink: 1}}>Hora</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
        {getHorario(origem, destino, ori, dest).map((el, idx) => {
          if(idx%2===0){
            return (
              <View style={{flexDirection: 'row'}}>
                <View style={{width: screenwidth/4*3,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.est}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.hor}</Text>
                </View>
              </View>
            );
          } else{
            return (
              <View style={{flexDirection: 'row', backgroundColor: '#EDEDED'}}>
                <View style={{width: screenwidth/4*3,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.est}</Text>
                </View>
                <View style={{width: screenwidth/4,height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, flexShrink: 1}}>{el.hor}</Text>
                </View>
              </View>
            );
          }
        })}
        </View>
      </ScrollView>
      <Button
            title="Voltar"
            color='#74b751'
            onPress={function (){setCurrent(Horario);}}
          />
    </View>
  );


  return current === 'Main' ? Main : current;
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 50,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  line2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
      marginBottom: '50%',
  },
  location: {
    height: 50,
    width: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74b751',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  image2: {
    flex: 1,
    width: '120%',
    resizeMode: 'contain',
  },
});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    
  },
textbutton:{
  fontSize: 20,
  color:'white',
},
  textTitle: {
    fontSize: 40,
    color: 'grey',
    padding: 20,
   
  },
   roundButton: {
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 50,
    backgroundColor: '#74b751',
    borderRadius: 10,
  },
});
