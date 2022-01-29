import React from 'react';
import {
  Button,
  HStack,
  Image,
  useToast,
  Modal,
  Pressable,
  Progress,
  ScrollView,
  Text,
  VStack,
  Input,
  FlatList,
} from 'native-base';
import {Platform, TouchableOpacity, Dimensions} from 'react-native';
import colors from '../../../utils/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import NameBox from '../../../globalComponents/infoBox/NameBox';
import ProgressBox from '../../../globalComponents/ProgressBox/ProgressBox';
import {TestData} from '../../../utils/data';

function AnonymousApproval({navigation}) {
  const settings = require('../../../../assets/images/settings.png');
  const close = require('../../../../assets/images/approval/close.png');
  const info = require('../../../../assets/images/approval/info.png');
  const dLogo = require('../../../../assets/images/approval/check.png');
  const copy = require('../../../../assets/images/connectWallet/copy.png');

  const toast = useToast();

  const width = Dimensions.get('window').width;

  const [showModal, setShowModal] = React.useState(false);
  const [approvals, setApprovals] = React.useState(null);
  const [address, setAddress] = React.useState('');

  if (!approvals) {
    fetch('https://decho-staging.herokuapp.com/api/v1/causes')
      .then(response => response.json())
      .then(responseData => {
        setApprovals(responseData.data);
      })
      .catch(error => console.log(error));
  }

  return (
    <ScrollView bg={colors.white}>
      <VStack w={'100%'} h={'100%'} pt={10} space={3}>
        <TouchableOpacity
          alignSelf={'flex-end'}
          onPress={() => {
            navigation.navigate('Options');
          }}>
          <Image
            mx={5}
            source={settings}
            alt={'settings'}
            size={7}
            alignSelf={'flex-end'}
          />
        </TouchableOpacity>
        <Text
          mx={5}
          color={colors.black}
          fontSize={'24'}
          fontWeight={'500'}
          fontFamily={Platform.OS === 'ios' ? 'Gill Sans' : ''}>
          Hi, Good morning.
        </Text>
        <Input mx={5} placeholder={'Search....'} />
        <Text fontSize={10} px={5}>
          Swipe left to see more >>
        </Text>
        <FlatList
          data={approvals}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item}) => {
            return (
              <VStack w={width} px={5} py={1}>
                <NameBox
                  name={item.title}
                  slogan={item.short_description}
                  img={TestData[0].image}
                />
                <HStack
                  justifyContent={'center'}
                  alignItems={'center'}
                  space={5}
                  mt={10}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ViewInfo');
                    }}>
                    <Image source={info} alt={'info'} size={7} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setAddress(item.decho_wallet.address);
                      setShowModal(true);
                    }}>
                    <Image source={dLogo} alt={'donate'} size={10} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={close} alt={'disprove'} size={7} />
                  </TouchableOpacity>
                </HStack>
                <ProgressBox
                  progress={item.progress || 0}
                  goal={item.cause_approval.goal}
                  prefix={'$'}
                />
              </VStack>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AnonymousDonate');
          }}>
          <Text
            mx={10}
            my={5}
            color={colors.black}
            fontSize={'12'}
            fontFamily={Platform.OS === 'ios' ? 'Gill Sans' : ''}
            alignSelf={'flex-end'}>
            View approved projects>>
          </Text>
        </TouchableOpacity>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content w={'80%'}>
          <Modal.CloseButton />
          <Modal.Header>Vote</Modal.Header>
          <Modal.Body>
            <Text
              my={2}
              color={colors.black}
              fontSize={'16'}
              fontFamily={Platform.OS === 'ios' ? 'Gill Sans' : ''}>
              Make your vote towards this project by sending CHOICE to this
              address.
              {'\n'}Your Choice will be refunded and rewarded!
            </Text>
            <Pressable
              onPress={() => {
                Clipboard.setString(address);
                toast.show({
                  description: 'Copied Address',
                });
              }}
              flexDirection={'row'}
              background={colors.grey}
              p={5}
              borderRadius={'md'}
              justifyContent={'space-between'}>
              <Text
                color={colors.black}
                fontSize={'12'}
                fontFamily={Platform.OS === 'ios' ? 'Gill Sans' : ''}>
                {address}
              </Text>
              <Image
                source={copy}
                alt="applause"
                h="5"
                w="5"
                alignSelf={'center'}
              />
            </Pressable>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
              colorScheme="teal">
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}

export default AnonymousApproval;
