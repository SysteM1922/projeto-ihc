import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CarouselItem from './CarouselItem';
import CustomPaging from './CustomPaging';
import Carousel from 'react-native-snap-carousel';
import { mudar, getTitle, addCartao, validar, getCards } from './App';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Pagamentos from './Pagamentos';
const { width } = Dimensions.get('window');
import {Routes, Route, useNavigate} from 'react-router-dom';
import Metodos from './Metodos'

export default function Cartoes() {
  const carouselRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [origem, onChangeO] = React.useState(null);

  const settings = {
    onSnapToItem: (index) => setSlideIndex(index),
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: getCards(),
    renderItem: CarouselItem,
    hasParallaxImages: true,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [current, setCurrent] = useState('Main');


  
  const Main = (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: 5,
          position: 'absolute',
          left: '67%',
          top: '1.5%',
        }}>
        <TouchableOpacity
          title="Mudar o Nome"
          onPress={function () {
            setModalVisible(!modalVisible);
          }}
          style={styles.editButton}>
          <FontAwesome name="edit" size={30} color="#74b751" />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20 }}>Mudar Nome</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeO}
              value={origem}
              placeholder="Nome do Cartão"
            />
            <Button
              color="#74b751"
              onPress={function () {
                mudar(origem, slideIndex);
                setModalVisible(!modalVisible);
              }}
              title="Confirmar"
            />
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20 }}>Validar Cartão</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Pressable
                onPress={function () {
                  validar(slideIndex);
                  setModalVisible2(!modalVisible2);
                }}>
                <Image source={require('./Images/NFC.png')} />
              </Pressable>
            </View>
            <Button
              color="#74b751"
              onPress={function () {
                setModalVisible2(!modalVisible2);
              }}
              title="Cancelar"
            />
          </View>
        </View>
      </Modal>
      <Carousel ref={carouselRef} {...settings} />
      <CustomPaging data={getCards()} activeSlide={slideIndex} />
      <View style={styles.line2}>
        <TouchableOpacity
          title="Validar"
          onPress={function () {
            setModalVisible2(!modalVisible2);
          }}>
          <FontAwesome name="check-square-o" color="#74b751" size={60} />
          <Text style={styles.TextCartao}>Validar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrent(Registo)}>
          <FontAwesome name="plus-square-o" color="#74b751" size={60} />
          <Text style={styles.TextCartao}>Registar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //On press go to pagamentos
          onPress={() =>
            setCurrent(Comprar)
          }>
          <FontAwesome5 name="coins" color="#74b751" size={50} />
          <Text style={styles.TextCartao}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [ref, onChangeR] = React.useState(null);

  const Registo = (
      <View style={{flex: 1}}>
        <View style={styles.line3}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeR}
          value={ref}
          placeholder="Ref Cartão"
        />
        <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
          <View>
            <TouchableOpacity
              title="Adicionar"
              onPress={function () {
                addCartao(ref);
                setCurrent(Main);
              }}
              style={styles.roundButton}>
              <Text style={styles.textbutton}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            title="Cancelar"
            onPress={() => setCurrent(Main)}
            style={styles.roundButton}>
            <Text style={styles.textbutton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.container2}>
          <Image style={styles.image} source={require('./Images/Cartao.png')}></Image>
        </View>
      </View>
  )

  
  const showAlert = () =>
  Alert.alert(
    "",
    "Pretende Efetuar o Pagamento?",
    [
      {
        text: "Cancelar",
        style: 'destructive',
        onPress: () => Alert.alert("Pagamento Cancelado"),
      },
       {
        style: 'cancel',
        text: "Sim",
        onPress: () => {Alert.alert("Pagamento Efetuado"); addCartao();setCurrent(Main)},
      },
    ],
  );

  const Comprar=(
    <View style={styles2.container}>
        <Text style={styles2.textTitle}>Pagamento no valor de 0,5€ </Text>
      <Metodos></Metodos>
      <TouchableOpacity
        onPress={showAlert}
        style={styles2.roundButton}>
        <Text style={styles2.textbutton}> Efetuar Pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {setCurrent(Main)}}
        style={styles2.roundButton}>
        <Text style={styles2.textbutton}> Cancelar</Text>
      </TouchableOpacity>
    </View>
  )

  return current === 'Main' ? Main : current;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  line2: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',
    //borderWidth: 2,
   // borderColor: 'rgba(0,0,0,0.2)',
   // backgroundColor: '#dedede',
   // borderRadius: 60,
  },
  line3: {
    alignItems: 'center',
  },
  TextCartao: {
    color:'#34623F',
    fontWeight: 'bold'
    
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 20,
    height: 50,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  container2: {
    flex: 1,
    padding: 50,
  },
  image: {
    flex: 1,
    width: null,
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  roundButton: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#74b751',
    borderRadius: 50,
    margin: 5,
  },
  textbutton: {
    color: 'white',
    fontSize: 19,
  },
  editButton: {
    justifyContent: 'center',

    color: '#74b751',
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
