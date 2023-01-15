import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import React, {useRef, useState} from 'react';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import {Picker} from '@react-native-picker/picker';
export default function CalculatorScreen() {
  const [numOne, setNumOne] = useState<null | number>(null);
  const [numTwo, setNumTwo] = useState<null | number>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [res, setRes] = useState<null | number | string>('');
  const pickerRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  const makeCalculation = async () => {
    if (!numOne || !numTwo || !selectedValue) {
      console.log('return if block');
      Alert.alert('Error!', 'Please fill all the fields');
      return;
    } else {
      try {
        setLoading(true);
        const bodyPayload = {
          a: numOne,
          b: numTwo,
          operation: selectedValue,
        };

        let headers = new Headers({
          'Content-Type': 'application/json',
        });
        let response = await fetch(
          'https://calculation-backend.vercel.app/api/calc',
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bodyPayload),
          },
        );
        const {res} = await response.json();
        setRes(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Erro!', 'Soemthing went wrong');
      }
    }
  };
  return (
    <View style={styles.container}>
      <FormInput
        labelValue={numOne}
        onChangeText={(val: number) => setNumOne(val)}
        placeholderText="First Number"
        iconType="arrowright"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={numTwo}
        onChangeText={(val: number) => setNumTwo(val)}
        placeholderText="Second Number"
        iconType="arrowright"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Choose Option" value="" />
        <Picker.Item label="Addition" value="+" />
        <Picker.Item label="Subtraction" value="-" />
        <Picker.Item label="Multiplication" value="*" />
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <SocialButton
          disabled={!numOne || !numTwo || !selectedValue}
          buttonTitle="Calculation"
          btnType="calculator"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => makeCalculation()}
        />
      )}
      {res || res === 0 ? (
        <Text style={styles.resultText}>
          Your result is <Text style={{fontWeight: 'bold'}}>{res} 🥳</Text>
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
  resultText: {
    fontSize: 25,
    marginTop: 20,
    textAlign: 'center',
  },
});
