import React, {Component} from 'react';
import {View, TextInput,StyleSheet, Text, Button, TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from "../../Utility/Style/style";

const options={
    title: "Choose Options",
    takePhotoButtonTitle:"Take Photo form Camera",
    chooseFromLibraryButtonTitle:"Upload form Gallery",
}

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
                {Object.keys(formData).map(el => (
                    <TextInput
                        key={el}
                        style={style.inputBox}
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
                {this.state.avatarSource? (
                    <Image source={this.state.avatarSource} style={{height:150}}/>
                ): null}
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText} onPress={this.pickImage}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default InputScreen;