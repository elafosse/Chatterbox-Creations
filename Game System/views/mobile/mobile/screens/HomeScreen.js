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
  color: #333;
  margin-bottom: 24px;
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
  background-color: #0000ff;
  border-radius: 25px;
  width: 80%;
  padding: 15px;
  align-items: center;
  margin-top: 20px;
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