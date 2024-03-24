import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #0C1562;
  margin-bottom: 14px;
`;

const Input = styled.TextInput`
  height: 50px;
  margin-vertical: 10px;
  padding-horizontal: 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  width: 80%;
`;

const Button = styled.TouchableOpacity`
  background-color: #0C1562;
  border-radius: 25px;
  width: 80%;
  padding: 15px;
  align-items: center;
  margin-top: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Title>Room Code</Title>
      <Input placeholder="XXXX" />
      <Title>Name</Title>
      <Input placeholder="Johnny" />
      <Button onPress={() => {navigation.navigate('AvatarSelection');}}>
        <ButtonText>PLAY</ButtonText>
      </Button>
    </Container>
  );
};

export default HomeScreen;