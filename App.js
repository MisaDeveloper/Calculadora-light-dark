import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [darkMode, setDarkMode] = useState(false);
  const buttons = [
    'AC', 'DEL', '%',
    ':', 7, 8, 9,
    'X', 4, 5, 6,
    '-', 1, 2, 3,
    '+', '.', 0,
    '+/-', '='
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('')

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const fistNumberCalc = parseFloat(splitNumbers[0]);
    const lastNumberCalc = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch(operator) {
      case '+':
        setCurrentNumber((fistNumberCalc + lastNumberCalc).toString());
        return
      case '-':
        setCurrentNumber((fistNumberCalc - lastNumberCalc).toString());
        return
      case 'X':
        setCurrentNumber((fistNumberCalc * lastNumberCalc).toString());
        return
      case ':':
        setCurrentNumber((fistNumberCalc / lastNumberCalc).toString());
        return
    }
  }

  function handleInput(buttonPressed) {
    if(buttonPressed === '+' || 
       buttonPressed === '-' ||
       buttonPressed === 'X' || 
       buttonPressed === ':'
      ) {
        setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
        return
      }
      switch(buttonPressed) {
        case 'DEL':
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)));
          return
        case 'AC':
          setLastNumber('');
          setCurrentNumber('');
          return
        case '=':
          setLastNumber(currentNumber + ' = ');
          calculator();
          return
        case '+/-':
          return
      }
      setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
    },
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: '100%',
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      color: darkMode ? "#f5f5f5" : "#282F38",
      margin: 10,
      fontSize: 40,
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      alignSelf: 'flex-end',
      marginRight: 10
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '28%',
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      borderWidth: 1,
      minWidth: 90,
      minHeight:90,
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 20,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity 
          style={styles.themeButton}
          onPress={() => darkMode ? setDarkMode(false):setDarkMode(true)}   
        >
        <Entypo name={darkMode ? 'light-up' : 'moon'} 
          size={24} 
          color={darkMode ? 'white' : 'black'} 
        />
        </TouchableOpacity>
        <Text style={styles.historyText}>
          {lastNumber}
        </Text>
        <Text style={styles.resultText}>
          {currentNumber}
        </Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ?
          <TouchableOpacity 
            key={button} 
            style={[styles.button, {backgroundColor: "#9DBC7B"}]}
            onPress={()=>handleInput(button)}  
          >

            <Text style={[styles.textButton, {
              color: "white",
              fontSize: 28
            }]}>
              {button}
            </Text>

          </TouchableOpacity> 
          :
          <TouchableOpacity 
            key={button} 
            style={[styles.button, {
              backgroundColor: 
                typeof(button) === 'number' ?
                  darkMode ? "#303946" : "#fff"
                    : 
                  darkMode ? "#414853" : "#ededed"
              }
            ]}
            onPress={()=>handleInput(button)}
          >

            <Text style={styles.textButton}>
              {button}
            </Text>

          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
