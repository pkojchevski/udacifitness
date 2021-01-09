import React from 'react';
import { View, Text } from 'react-native';
import { purple } from '../utils/colors';

// import { Container } from './styles';

export const DateHeader = ({ date }) => {
  return <Text style={{color: purple, fontSize: 25}}>{date}</Text>;
}
