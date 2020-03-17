import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity, Dimensions, Slider, Alert, TouchableWithoutFeedback } from 'react-native'
// import PropTypes from 'prop-types'
// import { Header } from 'react-native-elements';
import HeaderBar from '../components/HeaderBar';

import { colors } from '../helpers'
import { DrawerActions } from 'react-navigation-drawer'

import Icon from 'react-native-vector-icons/Foundation';
import FeatherIcon from 'react-native-vector-icons/Feather'

Icon.loadFont();
FeatherIcon.loadFont();

let deviceData = Dimensions.get('window');

const containerPadding = 30;

export class Home extends Component {

    static navigationOptions = () => ({
        header: null,

    });

    static navigationOptions = {
        drawerLabel: 'Home',
        // drawerIcon: ({ tintColor }) => (
        //   <Image
        //     source={require('./chats-icon.png')}
        //     style={[styles.icon, { tintColor: tintColor }]}
        //   />
        // ),
    };
    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            height: 180,
            weight: 60,
            age: 30
        };
    }

    calculateBMI = () => {


        
        console.log(this.state.height, this.state.weight)
        
        if (this.state.gender === '') {
            return Alert.alert(
                'Please Select Gender',
                'Once select gender, you can continue',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],

            );
        }

        let heightSquared = (this.state.height / 100 * this.state.height / 100);
        let bmi = this.state.weight / heightSquared;
        let message = "";
        let status = "";
        if (bmi >= 18.5 && bmi <= 24.99) {
            message = "You have a normal body weight, good job!";
            status = 'Normal'
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            message = "You have a overweight body, please exercise";
            status = 'Overweight'
        }
        else if (bmi >= 30) {
            message = "Ohh, You have obese, please control yourself";
            status = 'Moderately obese'
        }
        else if (bmi < 18.5) {
            message = "You are underweight, please intake more nutrition";
            status = 'Underweight'
        }

        console.log('calculatebmi', bmi, status, message)
        
        this.props.setTotalWeight({ bmi: Math.round(bmi * 100) / 100, status: status, message })

        console.log('calcuatebmi get pros', this.props)

        this.props.navigation.navigate('Result', {
            onNavigateBack: this.handleOnNavigateBack.bind(this)
          })
        // this.setState({
        //     bmi: Math.round(bmi * 100) / 100,
        //     optimalWeight: "Your suggested weight range is between " + low + " - " + high,
        //     message
        // }, () => console.log(this.state));
    }


    handleOnNavigateBack = (foo) => {
        this.setState({
          foo
        })
      }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container} >
                    <HeaderBar {...this.props}/>
                    <ScrollView
                        contentContainerStyle={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingHorizontal: containerPadding,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 30
                            }}
                        >
                            <TouchableOpacity style={styles.section} onPress={() => { this.setState({ gender: 'male' }) }} activeOpacity={1}>
                                <Icon name="male-symbol" size={80} color='white' style={{ opacity: this.state.gender === 'male' ? 1 : 0.5 }} />
                                {/* <View style={{paddingBottom: 10}}/> */}
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: this.state.gender === 'male' ? 'bold' : null }}>Male</Text>
                            </TouchableOpacity>
                            <View style={{ paddingHorizontal: 5 }} />
                            <TouchableOpacity style={styles.section} onPress={() => { this.setState({ gender: 'female' }) }} activeOpacity={1}>
                                <Icon name="female-symbol" size={80} color='white' style={{ opacity: this.state.gender === 'female' ? 1 : 0.5 }} />
                                {/* <View style={{paddingBottom: 10}}/> */}
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: this.state.gender === 'female' ? 'bold' : null }}>Female</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                backgroundColor: colors.secondaryColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 20,
                                marginBottom: 30
                            }}
                        >
                            <Text style={styles.buttonLable}>Height</Text>

                            <View style={{ height: 10 }} />

                            <Text style={{ color: 'white', fontSize: 40 }}>
                                {this.state.height}
                                <Text style={{ fontSize: 20 }}>cm</Text>
                            </Text>

                            <Slider
                                minimumValue={120}
                                thumbTintColor={colors.pinkColor}
                                maximumTrackTintColor={'white'}
                                minimumTrackTintColor={'white'}
                                maximumValue={200}
                                value={this.state.height}
                                onValueChange={(value) => this.setState({ height: Math.round(value) })}
                                style={{ width: deviceData.width - containerPadding - 100, height: 30, borderRadius: 50, }}
                                maximumTrackTintColor={colors.pinkColor}
                                minimumTrackTintColor={colors.pinkColor}
                            />
                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.section}>
                                <Text style={styles.buttonLable}>
                                    WEIGHT
                           </Text>

                                <Text style={styles.bottomSectionText}>
                                    {this.state.weight}
                                </Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.state.weight <= 0) return;
                                            this.setState({ weight: this.state.weight - 1 })
                                        }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255, 0.1)',
                                            padding: 15,
                                            borderRadius: 30,
                                            minWidth: 50,
                                            minHeight: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon name="minus" color='white' />
                                    </TouchableOpacity>

                                    <View style={{ width: 10 }} />

                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.state.weight >= 400) return;

                                            this.setState({ weight: this.state.weight + 1 })

                                        }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255, 0.1)',
                                            padding: 15,
                                            borderRadius: 30,
                                            minWidth: 50,
                                            minHeight: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon name="plus" color='white' />
                                    </TouchableOpacity>
                                </View>

                            </View>



                            <View style={{ paddingHorizontal: 5 }} />

                            <View style={styles.section}>
                                <Text style={styles.buttonLable}>
                                    AGE
                           </Text>

                                <Text style={styles.bottomSectionText}>
                                    {this.state.age}
                                </Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.state.age <= 0) return;
                                            this.setState({ age: this.state.age - 1 })
                                        }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255, 0.1)',
                                            padding: 15,
                                            borderRadius: 30,
                                            minWidth: 50,
                                            minHeight: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon name="minus" color='white' />
                                    </TouchableOpacity>

                                    <View style={{ width: 10 }} />

                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.state.age >= 150) return;
                                            this.setState({ age: this.state.age + 1 })
                                        }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255, 0.1)',
                                            padding: 15,
                                            borderRadius: 30,
                                            minWidth: 50,
                                            minHeight: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon name="plus" color='white' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>



                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: colors.pinkColor,
                        justifyContent: 'center'
                    }}
                    onPress={this.calculateBMI}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>CALCULATE YOUR BMI</Text>
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
    section: {
        backgroundColor: colors.secondaryColor,
        minWidth: (deviceData.width / 2) - containerPadding,
        minHeight: 150, alignItems: 'center', justifyContent: 'center',
        padding: 20,
    },
    buttonLable: {
        color: colors.greyColor, fontSize: 20, fontWeight: 'bold'
    },
    bottomSectionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
    }
});


import { connect } from 'react-redux';
import { setTotalWeight } from '../actions';

const mapStateToProps = ({ totalWeightSettings }) => {
    let { status, bmi, message } = totalWeightSettings;
    return { status, bmi, message };
}


export default connect(mapStateToProps, { setTotalWeight }, null, { forwardRef: true })(Home);
