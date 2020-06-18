import React, { Component } from 'react';
import { View } from 'react-native';
import { DatePicker, Item, Label, Text, Button } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';
import { extend } from 'lodash';
import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';
import CartaoUser from '../../components/CartaoUser';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { number } from 'yup';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
class Agendamentos extends Component {
  static navigationOptions = { header: null };
  state = {
    listaAgendamento: [],
    Load: true,
    Usuario: this.props.navigation.state.params.usuario,
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  onRefreshPage = () => {};

  Agendar = () => {
    api
      .get(`/confirmAgendamento/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ listaAgendamento: responseJson.data, Load: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false });
      });
  };
  // ${this.props.email}
  enviarReq = (tipoSocilitacao, usuario) => {
    console.log('VOLTOU NO AGENDAMENTO ?', tipoSocilitacao, usuario);
    const data = {
      email: usuario,
      status: 'Confirmado',
    };
    if (tipoSocilitacao == 1) {
      api
        .put(`/confirmAgendamento/${this.props.email}`, data)
        .then(responseJson => {
          console.log(responseJson);
          this.setState({ listaAgendamento: [] });
          this.Agendar();
        })
        .catch(error => {});
    } else if (tipoSocilitacao == 0) {
    }
  };

  render() {
    return (
      <View style={style.Container}>
        <HeaderBack
          title="Agendamentos de visita"
          onNavigation={() => this.navegar()}
        />
        {this.state.Load && <Loading />}
        {this.state.listaAgendamento.length == 0 && (
          <EmptyState
            titulo="Sem Agendamentos"
            mensagem="Aguarde logo aparecerár alguem para preencher esse vazio :("
          />
        )}

        <View style={style.V_label}>
          <Text style={style.label}>Lista de agendamento de visita</Text>
          <View style={style.barra} />
        </View>

        <FlatList
          data={this.state.listaAgendamento}
          renderItem={({ item }) => (
            <View>
              <CartaoUser
                callback={() => this.onRefreshPage()}
                retorno={(number, user) => this.enviarReq(number, user)}
                dados={item.user}
                dadosGerais={item}
              />
              <View style={style.viewData}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    width: '45%',
                    borderRadius: 50,
                    backgroundColor: '#f8f8f8',
                  }}
                >
                  <Text style={style.data}>
                    {moment(new Date(item.data)).format('L')}
                  </Text>
                  <Text>As</Text>
                  <Text style={style.data}>
                    {moment(new Date(item.hora)).format('hh:mm')}
                  </Text>
                </View>
                {item.status == 'Análise' && (
                  <View
                    style={{
                      width: '30%',
                      borderRadius: 20,
                      backgroundColor: 'yellow',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={style.data}>{item.status}</Text>
                  </View>
                )}
                {item.status == 'Confirmado' && (
                  <View
                    style={{
                      width: '30%',
                      borderRadius: 20,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={style.dataConf}>{item.status}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

const AgendamentoConnect = connect(
  mapStateToProps,
  null
)(Agendamentos);

export default AgendamentoConnect;
