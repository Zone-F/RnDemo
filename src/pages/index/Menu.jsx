import React from 'react';
import { Icon, Button,Layout, Menu, MenuItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

// const ForwardIcon = () => <Icon name='arrow-ios-forward' />;

// const useMenuState = (initialState = null) => {
//   const [selectedIndex, setSelectedIndex] = React.useState(initialState);
//   return { selectedIndex, onSelect: setSelectedIndex };
// };

const MenuList = [
  {
    title: 'SQLite能力演示',
    name: 'SQLite能力演示'
  },
  {
    title: '长列表',
    name: '长列表'
  },
  {
    title: '动画展示',
    name: '动画展示'
  },
  {
    title: 'UI展示',
    name: 'UI展示'
  },
  {
    title: 'tab页面',
    name: 'tab页面'
  },
]

const MenuAccessoriesShowcase = ({ navigation }) => {

  // const rightMenuState = useMenuState();
  const MenuItems = MenuList.map(
    menu =>
      <MenuItem
        key={menu.name} title={menu.title}
        onPress={() => navigation.navigate(menu.name)} />
  );
  return (
    <Layout style={styles.container} level='1'>
      <Menu style={styles.menu}>
        {MenuItems}
      </Menu>
      {/* <Button onPress={() => navigation.navigate("SQLiteView")}>SQLiteView</Button> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menu: {
    flex: 1,
    margin: 8,
  },
});

export default MenuAccessoriesShowcase;