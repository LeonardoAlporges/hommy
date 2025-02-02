import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import style from './style';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import api from '../../service/api';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class CartaoUser extends Component {
  state = {
    modal: false,
    mensagem: '',
    confirmar: false,
    rejeitar: false,
  };

  retorno = number => {
    this.props.retorno(number, this.props.dados.email);
  };

  retornoCarona = number => {
    this.props.retornoCarona(number, this.props.dados.email);
  };

  mudarStatusInteressado = number => {
    if (number == 3) {
      this.setState({ modal: false });
    }
    if (this.props.tipoRetorno == 'Republica') {
      this.retorno(number);
      this.props.callback();
    } else if (this.props.tipoRetorno == 'Carona') {
      this.retornoCarona(number)
      this.props.callback();
    }
  };

  render() {
    return (
      <View
        style={{
          width: '100%',

          paddingHorizontal: 16,
        }}
      >
        <View style={style.card}>
          <TouchableOpacity            
            style={style.V_imagem}
          >
            <Image
              style={style.Imagem}
              source={{
                uri: this.props.dados.fotoPerfil,
              }}
            />
          </TouchableOpacity>
          <View style={style.V_nome}>
            <Text numberOfLines={2} style={style.nome}>
              {this.props.dados.nome}
            </Text>
          </View>
          <View style={style.V_nota}>
            <Icon name="star" style={style.icon} />
            <Text style={style.nota}>{this.props.dados.nota}</Text>
          </View>
          <View style={style.V_Icon}>
            {this.props.status != 'Confirmado' && this.props.status != 'Rejeitado' && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    mensagem: 'Deseja confirmar ?',
                    confirmar: true,
                    modal: true,
                  });
                }}
              >
                <Icon name="check" style={style.iconAceite} />
              </TouchableOpacity>
            )}
            {this.props.status != 'Rejeitado' && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    mensagem: 'Deseja rejeitar ?',
                    rejeitar: true,
                    modal: true,
                  });
                }}
              >
                <Icon name="close" style={style.iconRejeite} />
              </TouchableOpacity>
            )}
          </View>

          {this.state.modal && (
            <ModalConfirmacao
              retornoModal={valor => this.mudarStatusInteressado(valor)}
              titulo={this.state.mensagem}
              botaoCancel="Cancelar"
              botaoConfirmar="Sim"
              rejeitar={this.state.rejeitar}
              confirmar={this.state.confirmar}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

const CartaoUserConnect = connect(
  mapStateToProps,
  null
)(CartaoUser);

export default withNavigation(CartaoUserConnect);
