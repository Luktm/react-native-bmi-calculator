import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'

import { colors } from '../helpers';

import Icon from 'react-native-vector-icons/Foundation';

import HeaderBar from '../components/HeaderBar';

Icon.loadFont();

let deviceData = Dimensions.get('window');

const containerPadding = 30;

export class Result extends Component {

    constructor(props) {
        super(props);
    }


    static getDerivedStateFromProps(props, state) {
        console.log('getDeriveStateFromProps', { props, state });
        
    }

    componentDidMount() {
        console.log('componentDidMount');
        if (this.props.bmi <= 0) {
            Alert.alert(
                'Please Calculate you bmi',
                '',
                [

                    {
                        text: 'OK', onPress: () => {
                            // this.props.navigation.state.params.onNavigateBack(this.state.foo)
                            this.props.navigation.goBack()
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("UNSAFE_componentWillReceiveProps", nextProps)
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate', { prevProps, prevState })
    }

    render() {
console.log('result render function', this.props)

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <HeaderBar {...this.props} />
                    <ScrollView
                        contentContainerStyle={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingHorizontal: containerPadding,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Your Result</Text>
                        <View style={{ height: 30 }} />

                        <View style={{ padding: 30, backgroundColor: colors.secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[{ color: this.props.status === "Normal" ? colors.greenColor : '#fc575e', fontWeight: 'bold' },]}>
                                {this.props.status}
                            </Text>

                            <Text style={{ color: 'white', fontSize: 100, fontWeight: 'bold' }}>
                                {this.props.bmi}
                            </Text>

                            <View style={{ height: 10 }} />

                            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Normal BMI range:</Text>


                            <View style={{ height: 10 }} />

                            <Text style={{ color: 'white', fontSize: 18 }}>
                                18,5 -25kg/m2
                        </Text>

                            <View style={{ height: 10 }} />

                            <View style={{ width: 200 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{this.props.message}</Text>
                            </View>


                            <View style={{ height: 40 }} />

                            <TouchableOpacity style={{ backgroundColor: '#181A2E', minWidth: 220, minHeight: 60, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.8}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>SAVE RESULT</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </SafeAreaView>


                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: colors.pinkColor,
                        justifyContent: 'center'
                    }}
                    onPress={
                        () => {

                            this.props.navigation.goBack()
                        }
                    }
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>RE-CALCULATE YOUR BMI</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,

    },
})

import { connect } from 'react-redux';
import { setTotalWeight } from '../actions';

const mapStateToProps = ({ totalWeightSettings }) => {
    let { status, bmi, message } = totalWeightSettings;
    return { status, bmi, message };
}

export default connect(mapStateToProps, {}, null, { forwardRef: true })(Result);
