import React from 'react';
import {Text} from 'native-base';
import {ImageBackground, Platform} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../../utils/colors';
function NameBox(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <ImageBackground
      source={{uri: props.img}}
      style={{height: 350}}
      imageStyle={{borderRadius: 10}}>
      <LinearGradient
        colors={['transparent', colors.white]}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 20,
        }}>
        <Text
          color={colors.black}
          fontSize={'24'}
          fontWeight={'500'}
          fontFamily={'JosefinSans-Bold'}>
          {props.name}
        </Text>
        <Text
          mb={1}
          color={colors.grey}
          fontSize={'12'}
          fontFamily={'JosefinSans-Regular'}>
          {props.slogan}
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
}

export default NameBox;
