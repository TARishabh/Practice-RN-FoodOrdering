import { Tabs,withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
      <SafeAreaView edges={['top']} style={{flex:1}}>
        <TopTab/>
    </SafeAreaView>
  )
}