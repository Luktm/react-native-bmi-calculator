import React from 'react'
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Header } from 'react-native-elements';

import { colors } from '../helpers'
import {DrawerActions} from 'react-navigation-drawer'

import FeatherIcon from 'react-native-vector-icons/Feather'

FeatherIcon.loadFont();


let deviceData = Dimensions.get('window');

const containerPadding = 30;



const HeaderBar = (props) => {
    return (
        <Header
        leftComponent={<TouchableWithoutFeedback onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <FeatherIcon name='menu' color='white' size={20}/>
        </TouchableWithoutFeedback>}
        centerComponent={{ text: 'BMI CALCULATOR', style: { color: 'white', fontWeight: 'bold' ,fontSize:18 } }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        containerStyle={{
            backgroundColor: colors.primaryColor,
            borderBottomWidth: 0,
            paddingHorizontal: containerPadding - 5,
        }}
    />
    )
}

export default HeaderBar
