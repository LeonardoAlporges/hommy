import * as yup from 'yup';
import { Formik } from 'formik';

import { connect } from 'react-redux';

import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';

import { Icon, Input, Item, Button, Spinner } from 'native-base';
import CustomModal from '../../components/Alert';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';

import style from './style';

import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editNota,
  editTelefone,
  editFoto,
  editId,
} from '../../actions/UserAction';
import { NavigationActions, StackActions } from 'react-navigation';
class Login extends Component {
  static navigationOptions = { header: null };
  state = {
    user: [],
    erro: false,
    load: false,
    erroLogin: false,
    erroSenha: false,
  };

  async setToken(dados) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));
    } catch (error) {
      console.log(error);
    }
  }
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  enviarlogin = async value => {
    this.setState({ load: true });
    this.data = {
      email: value.email,
      password: value.password,
      tokenD: this.props.tokenUser,
    };
    console.log('Token', this.props.tokenUser);
    await api
      .post('/session', this.data)
      .then(responseJson => {
        this.setToken(responseJson.data);
        this.setState({ user: responseJson.data.usuario });
        this.props.editId(responseJson.data.usuario.id);
        this.props.editNome(responseJson.data.usuario.nome);
        this.props.editEmail(responseJson.data.usuario.email);
        this.props.editCpf(responseJson.data.usuario.cpf);
        this.props.editIdUser(responseJson.data.usuario.token);
        this.props.editLogado(responseJson.data.usuario.nome);
        this.props.editTelefone(responseJson.data.usuario.celular);
        this.props.editFoto(responseJson.data.usuario.fotoPerfil);
        this.props.editNota(responseJson.data.usuario.nota);

        this.setState({ load: false }), this.resetNavigation('TabsHeader');
      })
      .catch(error => {
        this.setState({ load: false });
        console.log('ERRO:', error.response);
        if (error.response.data.code == 206) {
          this.setState({ erroSenha: true });
        } else if (error.response.data.code == 203) {
          this.setState({ erroLogin: true });
        }
      });
  };

  render() {
    return (
      <ScrollView>
        {this.state.erroLogin && (
          <CustomModal
            parametro="Custom"
            imagem="NaoEncontrado"
            titulo="E-mail não encontrado."
            descricao="Por favor verifique as informações inseridas e tente novamente."
            botao="Voltar"
            callback={() => {
              this.setState({ erroLogin: false });
            }}
          />
        )}
        {this.state.erroSenha && (
          <CustomModal
            parametro="Custom"
            imagem="NaoEncontrado"
            titulo="Senha invalida."
            descricao="Por favor verifique as informações inseridas e tente novamente."
            botao="Voltar"
            callback={() => {
              this.setState({ erroSenha: false });
            }}
          />
        )}
        {this.state.erro && (
          <CustomModal
            parametro="Erro"
            callback={() => {
              this.setState({ erro: false });
            }}
          />
        )}
        <View style={style.container}>
          <TouchableOpacity>
            <Image
              source={{
                uri:
                  'https://firebsestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
              }}
              style={style.imgStyle}
            />
          </TouchableOpacity>
          <Text style={style.txt_Titulo}>Hoomy</Text>
          <Text style={style.txt_FormaDeLogin}>Faça login com sua rede social</Text>
          <View style={style.view_OutrosLogin}>
            <Icon style={style.icons_OutroLogin} name="logo-facebook" />
            <Icon style={style.icons_OutroLogin} name="logo-twitter" />
            <Icon style={style.icons_OutroLogin} name="logo-googleplus" />
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              this.enviarlogin(values);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string('')
                .email('E-mail inválido ou incorreto')
                .required('Campo obrigatório'),
              password: yup
                .string('')
                .min(8, 'Mínimo 8 dígitos necessários')
                .required('Campo obrigatório'),
            })}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
              <Fragment>
                <View style={style.view_CamposLogin}>
                  <Item>
                    <Icon name="md-person" style={style.icons_CamposLogin} />
                    <Input
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="E-mail"
                      onBlur={() => setFieldTouched('email')}
                    />
                  </Item>
                  {touched.email && errors.email && <Text style={style.txtError}>{errors.email}</Text>}
                </View>

                <View style={style.view_CamposLogin}>
                  <Item>
                    <Icon name="md-key" style={style.icons_CamposLogin} />
                    <Input
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder="Senha"
                      secureTextEntry={true}
                      onBlur={() => setFieldTouched('password')}
                    />
                  </Item>
                  {touched.password && errors.password && <Text style={style.txtError}>{errors.password}</Text>}
                </View>
                <View style={style.V_cadastrar}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('EsqueciSenha');
                    }}
                  >
                    <Text style={style.touchTx}>Esqueci minha senha!</Text>
                  </TouchableOpacity>
                </View>
                <View style={style.V_botoes}>
                  <Button style={style.botao_login} onPress={handleSubmit}>
                    <Text style={style.labelBotao}>Login</Text>
                  </Button>
                  <Button
                    style={style.botao_cadastro}
                    onPress={() => {
                      this.props.navigation.navigate('CadastroUsuario');
                    }}
                  >
                    <Text style={style.labelBotao}>Cadastre-se</Text>
                  </Button>
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
        <Modal animationType="slide" transparent={true} visible={this.state.load}>
          <View style={style.ViewFundo}>
            <View style={style.ViewModal}>
              <Spinner color="#142850" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokenUser: state.user.tokenUser,
  };
};

const loginConnect = connect(
  mapStateToProps,
  {
    editId,
    editNome,
    editEmail,
    editCpf,
    editIdUser,
    editLogado,
    editTelefone,
    editFoto,
    editNota,
  }
)(Login);

export default withNavigation(loginConnect);
