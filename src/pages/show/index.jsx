import React, { useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Layout } from '@ui-kitten/components';
import { View, StyleSheet, Image } from 'react-native';
import {
  Text, Button,
  Dialog, Card,
  CheckBox,
  ListItem,
  Avatar,
} from '@rneui/themed';
const App = () => {
  const [visible1, setVisible1] = useState(false);
  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  return (
    <Layout level='1' style={styles.container} >
      <Text h2>组件</Text>
      <Card>
        <Button
          title="打开弹窗"
          onPress={toggleDialog1}
          buttonStyle={styles.button}
        />
      </Card>
      <Dialog
        isVisible={visible1}
        onBackdropPress={toggleDialog1}
      >
        <Dialog.Title title="Dialog Title" />
        <Text>Dialog body text. Add relevant information here.</Text>
      </Dialog>
      <Text h4>点赞动画</Text>
      <AnimatedLottieView
        source={require('./animations/TwitterHeart.json')}
        autoPlay
        loop style={styles.ani}
      />
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 600,
    height: '100%'
  }, button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  ani: {
    width: 100,
    height: 100
  }
});
export default App;