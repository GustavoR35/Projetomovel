import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';



import {GetData, RemoveAll, RemoveItem, SetData, ToggleStatus} from '../db';
import {ScrollView} from 'react-native';
import uuid from 'react-native-uuid';
import { Image } from 'react-native';


type toDo = {
  id: string;
  descricao: string;
  status: boolean;
};

export default function ToDoList(): JSX.Element {
  const [toDoList, setToDoList] = useState<Array<toDo>>([]);

  const [descricao, setDescricao] = useState<string>('');

  const handleSetToDo = (descricao: string) => {
    const id = uuid.v4().toString();
    const status = false;
    SetData({descricao, status, id})
      .then(() => {
        fetchData();
        setDescricao('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchData = async () => {
    const result = await GetData();
    setToDoList(result);
  };

  useEffect(() => {
    fetchData();
    //console.log(toDoList);
  }, [toDoList]);

  const imggd ='./assets/logobtn.png'
  
  return (
    
    <View style={styles.container}>
     
    
      <Text style={styles.title}>My notes</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui"
          onChangeText={e => setDescricao(e)}
          value={descricao}
        />
      </View>
      <View>
      <TouchableOpacity
          style={styles.button}
          onPress={() => handleSetToDo(descricao)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

      </View>
      <ScrollView style={styles.scrollView}>
        {toDoList?.map(item => {
          const colorStatus = item.status ? '#0ead69' : '#ff5e5b'
          return (
            <View style={[styles.descricao, {borderColor: colorStatus}]} key={item.id}>
              <TouchableOpacity onPress={() => ToggleStatus(item.id)}>
                <Text style={styles.txtToDoItem}>{item.descricao}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnToDoItem} onPress={() => RemoveItem(item.id)}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Excluir</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
     <View>
      
     </View>
      <View style={styles.viewRemoveAll}>
        <TouchableOpacity style={styles.buttonRemoveAll} onPress={RemoveAll}>
          <Text style={styles.txtRemoveAll}>  X  </Text>
        </TouchableOpacity>
        
      </View>

        
    </View>

);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#F5DEB3',
},
title: {
  marginTop: 40,
  fontSize: 38,
  fontWeight: 'bold',
  color: '#A9A9A9',

},
inputView: {
  flexDirection: 'row',
  paddingHorizontal: 20,
  marginVertical: 20,
},
input: {
  flex: 1,
  height: 40,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 15,
  paddingHorizontal: 15,
  backgroundColor: '#FFFFFF',
  color: '#1A1A1A',
},
button: {
  backgroundColor: 'blue',
  paddingHorizontal: 10,
  paddingVertical: 8,
  
  borderTopRightRadius: 40,
  borderBottomRightRadius: 10,
  borderLeftWidth:10
},
buttonText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},
scrollView: {
  flex: 1,
  width: '100%',
  marginBottom: 80,

},
descricao: {
  marginHorizontal: 20,
  borderLeftWidth: 5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
  height: 40,
  alignItems: 'center',
  borderRadius:15,
  borderBlockColor: '#E0FFFF',
  
  
},
txtToDoItem: {
  paddingHorizontal: 10,
  fontSize: 18,
  color: '#FFFFFF',
  
},
btnToDoItem: {
  paddingHorizontal: 10,
  backgroundColor: '#E91E63',
  borderRadius: 10,
  height: 30,
  justifyContent: 'center',
  
},
viewRemoveAll: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  paddingBottom: 20,
  
},
buttonRemoveAll: {
  backgroundColor: '#DB7093',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 3000,
  alignSelf: 'center',
  marginTop: 20,
 // width: 150,
  //borderColor:'#696969'
},
txtRemoveAll: {
  color: '#FFFFFF',
  fontWeight: 'bold',
  textAlign: 'center',
},

});