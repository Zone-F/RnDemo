import React from 'react';
import { Icon, Layout, Menu, MenuItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

// const ForwardIcon = () => <Icon name='arrow-ios-forward' />;

const useMenuState = (initialState = null) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const MenuAccessoriesShowcase = () => {

  const rightMenuState = useMenuState();

  return (
    <Layout style={styles.container} level='1'>
      <Menu style={styles.menu} {...rightMenuState}>
        <MenuItem title='Users' />
        <MenuItem title='Orders' />
        <MenuItem title='Transactions' />
        {/* <MenuItem title='Users' accessoryRight={ForwardIcon}/>
        <MenuItem title='Orders' accessoryRight={ForwardIcon}/>
        <MenuItem title='Transactions' accessoryRight={ForwardIcon}/> */}
      </Menu>
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