import React, {Component} from 'react';
import {View, TextInput,StyleSheet, Text, Button, TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options={
    title: "Choose Options",
    takePhotoButtonTitle:"Take Photo form Camera",
    chooseFromLibraryButtonTitle:"Upload form Gallery",
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

class InputScreen extends Component {
    pickImage=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    static navigationOptions = {
        title: 'Home',
    };
    state = {
        formData: {
            /*email: {
                value: '',
                placeholder: "Email",
                // keyboardType: "email-address",
                valid: false,
                touch: false,
                validationRules: {
                    isEmail: true
                }
            },*/
            name: {
                value: '',
                valid: false,
                touch: false,
                placeholder: "Name",
                // keyboardType: "",
                validationRules: {
                    notEmpty: true
                }
            }
        },
        formIsValid: false,
    };
    onInputChange = (key, value) => {
        const updatedForm = {...this.state.formData};
        const updatedElement = {...updatedForm[key]};
        updatedElement.value = value;
        updatedElement.valid = validate(
            updatedElement.value,
            updatedElement.validationRules
        );
        updatedElement.touch = true;
        updatedForm[key] = updatedElement;
        let formIsValid = this.isFormValid(updatedForm);
        this.setState({formData: updatedForm, formIsValid: formIsValid})
    };

    isFormValid(props) {
        let formIsValid = true;
        for (let inputIdentifier in props) {
            formIsValid = props[inputIdentifier].valid && formIsValid;
        }
        return formIsValid;
    }

    onSubmit=()=>{};

    render() {

        const {formData} = this.state;
        return (
            <View>
                {this.state.avatarSource? (
                    <Image source={this.state.avatarSource} style={{height:150}}/>
                ): null}
                {Object.keys(formData).map(el => (
                    <TextInput
                        key={el}
                        style={styles.inputBox}
                        onChangeText={val => this.onInputChange(el, val)}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder={formData[el].placeholder}
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        // keyboardType={formData[el].keyboardType}
                        value={formData[el].value}
                        valid={formData[el].valid}
                        touched={formData[el].touch}
                    />
                ))}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.pickImage}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default InputScreen;