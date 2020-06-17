import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  editNomeRepublica,
  editValorAluguel,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumeroCasa,
  editTipoImovel,
  edituserEmail,
} from '../../actions/AuthActions';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Estilos from './styles';

class Cartao extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
  }

  onClickCard = () => {
    const dados = this.props.data;
    console.log(dados.valorContas);
    this.props.editNomeRepublica(dados.nomeRepublica);
    this.props.editValorConta(dados.valorContas);
    this.props.editValorAluguel(dados.valorAluguel);
    this.props.editBairro(dados.bairro);
    this.props.editRua(dados.rua);
    this.props.editNumeroCasa(dados.numeroCasa);
    this.props.editPessoas(dados.pessoas);
    this.props.editAnimal(dados.animal);
    this.props.editDescricao(dados.descricao);
    this.props.editAcomodacaoQuarto(dados.acomodacaoQuarto);
    this.props.editAcomodacaoRepublica(dados.acomodacaoRepublica);
    this.props.editValorConta(dados.valorContas);
    this.props.editObservacao(dados.observacao);
    this.props.editGenero(dados.genero);
    this.props.editNumVagas(dados.numVagas);
    this.props.editRepresentante(dados.representante);
    this.props.editTipoImovel(dados.tipoImovel);
    this.props.editImg1(dados.imagem1);
    this.props.editImg2(dados.imagem2);
    this.props.editImg3(dados.imagem3);
    this.props.edituserEmail(dados.userEmail);

    this.props.navigation.navigate('Detalhes');
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={this.onClickCard}
        style={Estilos.touch_card}
      >
        <View style={Estilos.V_cartao}>
          <View style={Estilos.V_imagem}>
            <Image
              source={{ uri: this.props.data.imagem1 }}
              style={Estilos.V_imagem}
            />
          </View>
          <View style={Estilos.V_TituloDesc}>
            <View style={Estilos.V_titulo}>
              <Text style={Estilos.txtTitulo}>
                {this.props.data.nomeRepublica}
              </Text>
            </View>
            <View style={Estilos.V_obs}>
              <Text numberOfLines={2}>{this.props.data.descricao}</Text>
            </View>
            <View style={Estilos.V_desc}>
              <View style={Estilos.V_valor}>
                <Icon2 style={Estilos.txtIcon} name="dollar-sign" />
                <Text style={Estilos.txtDesc}>
                  R$ {this.props.data.valorAluguel}
                </Text>
              </View>
              <View style={Estilos.V_vagas}>
                <Icon style={Estilos.txtIcon} name="people" />
                <Text style={Estilos.txtDesc}>
                  {this.props.data.numVagas} Vaga(s)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => {
  return {
    nomeRepublica: state.auth.nomeRepublica,
    valorAluguel: state.auth.valorAluguel,
    bairro: state.auth.bairro,
    pessoas: state.auth.pessoas1,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    valorContas: state.auth.valorContas,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    numVagas: state.auth.numVagas,
    numeroCasa: state.auth.numeroCasa,
  };
};

const cardConnect = connect(
  mapStateToProps,
  {
    editTipoImovel,
    editNomeRepublica,
    editValorAluguel,
    editBairro,
    editPessoas,
    editDescricao,
    editAnimal,
    editAcomodacaoQuarto,
    editAcomodacaoRepublica,
    editValorConta,
    editObservacao,
    editImg1,
    editImg2,
    editImg3,
    editGenero,
    editNumVagas,
    editRepresentante,
    editRua,
    editNumeroCasa,
    edituserEmail,
  }
)(Cartao);

export default withNavigation(cardConnect);
