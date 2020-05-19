import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomModal from '../../components/Alert';
import {
  editTipoImovel,
  editValor,
  editNomeRepublica,
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
} from '../../actions/AuthActions';
import {
  imagePickerOptions,
  uploadFileToFireBase,
  uploadProgress,
} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import { Text, Item, Input, Label, Button, Icon, Picker } from 'native-base';
import ViewPager from '@react-native-community/viewpager';
import api from '../../service/api';
import estilo from './style';

export class Cadastro extends Component {
  static navigationOptions = { header: null };

  //setImageURI('https://image.flaticon.com/icons/svg/61/61205.svg');

  constructor(props) {
    super(props);
    this.entrar = this.entrar.bind(this);
    this.state = {
      contadorImagem: 0,
      loading: false,
      update: this.props.navigation.state.params.update,
      genero: '',
      animal: '',
      erro: false,
      sucesso: false,
      imageURI0: null,
      imageURI1: null,
      imageURI2: null,
      envio: true,
    };
    console.log(this.props.email);
    console.log(this.props.telefone);
    console.log(this.props.representante);
    this.verificarParametro(this.props.navigation.state.params.update);
  }

  async verificarParametro(parametro) {
    await this.setState({ update: parametro });
    console.log('VErificar parametro', this.state.update);
    console.log('valor Parametro ', parametro);
    if (parametro.update == false) {
      this.atualizarPropsRedux();
    }
  }
  atualizarPropsRedux(dados) {
    console.log('Atulizando ');
    this.props.editNomeRepublica('');
    this.props.editValor('');
    this.props.editBairro('');
    this.props.editRua('');
    this.props.editNumeroCasa('');
    this.props.editPessoas('');
    this.props.editAnimal('');
    this.props.editDescricao('');
    this.props.editAcomodacaoQuarto('');
    this.props.editAcomodacaoRepublica('');
    this.props.editObservacao('');
    this.props.editGenero('');
    this.props.editNumVagas('');
    this.props.editRepresentante('');
    this.props.editImg1('');
    this.props.editImg2('');
    this.props.editImg3('');
    this.props.editTipoImovel('');
  }

  monitorFileUpload = task => {
    task.on('state_changed', snapshot => {
      const progress = uploadProgress(
        snapshot.bytesTransferred / snapshot.totalBytes
      );
      switch (snapshot.state) {
        case 'running':
          this.setState({ imageURI: null });
          this.setState({ loading: true });
          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('COntador', this.state.contadorImagem);
            if (this.state.contadorImagem == 1) {
              this.setState({ imageURI0: downloadURL });
              console.log('Imagem1', this.state.imageURI0);
            } else if (this.state.contadorImagem == 2) {
              this.setState({ imageURI1: downloadURL });
              console.log('Imagem1', this.state.imageURI1);
            } else if (this.state.contadorImagem == 3) {
              this.setState({ imageURI2: downloadURL });
              console.log('Imagem1', this.state.imageURI2);
            } else {
              this.setState({ envio: false });
            }
            this.setState({ contadorImagem: this.state.contadorImagem + 1 });
          });
          break;
        default:
          break;
      }
    });
  };

  uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Post canceled');
      } else if (error) {
        alert('An error occurred: ', error);
      } else {
        const uploadTask = uploadFileToFireBaseRepublica(imagePickerResponse);
        this.monitorFileUpload(uploadTask);
      }
    });
  };

  async entrar(values) {
    this.data = {
      imagem1: this.state.imageURI0,
      imagem2: this.state.imageURI1,
      imagem3: this.state.imageURI2,
      nomeRepublica: values.nome,
      valorAluguel: values.aluguel,
      bairro: values.bairro,
      rua: values.rua,
      numeroCasa: values.numero,
      pessoas: values.moradores,
      descricao: values.desc,
      animal: values.animais,
      acomodacaoQuarto: values.aQuarto,
      acomodacaoRepublica: values.aRepublica,
      valorContas: values.contas,
      genero: values.genero,
      numVagas: values.numeroVagas,
      telefone: this.props.telefone,
      representante: this.props.representante,
      tipoImovel: values.tipoImovel,
      descricao: values.descricao,
    };
    console.log('up?', this.state.update);
    try {
      if (this.state.update == true) {
        console.log('Upadte');
        await api
          .put(`/main/${this.props.email}`, this.data)
          .then(Response => {
            console.log(Response);
            this.setState({ sucesso: true });
            this.props.navigation.navigate('Confirmacao');
          })
          .catch(e => {
            this.setState({ erro: true });
          });
      } else if (this.state.update == false) {
        console.log('Postado');
        await api
          .post('/main', this.data)
          .then(Response => {
            this.setState({ sucesso: true });
            this.props.navigation.navigate('Confirmacao');
          })
          .catch(e => {
            console.log('erro net', e);
            this.setState({ erro: true });
          });
      }
    } catch (error) {
      console.log('Erro', error);
    }
  }
  render() {
    return (
      <Formik
        initialValues={{
          nome: this.props.nome,
          bairro: this.props.bairro,
          rua: this.props.rua,
          numero: this.props.numeroCasa,
          aluguel: this.props.valorAluguel,
          contas: this.props.valorContas,
          moradores: this.props.pessoas,
          genero: this.props.genero,
          animais: this.props.animal,
          aQuarto: this.props.acomodacaoQuarto,
          aRepublica: this.props.acomodacaoRepublica,
          numeroVagas: this.props.numeroVagas,
          tipoImovel: this.props.tipoImovel,
          descricao: this.props.descricao,
        }}
        onSubmit={values => {
          console.log('values??');
          this.entrar(values);
        }}
        validationSchema={yup.object().shape({
          nome: yup
            .string('Erro')
            .min(3)
            .required('Insira o nome da sua republica'),
          bairro: yup
            .string('Erro')
            .min(3)
            .max(15)
            .required('Insira o bairro aonde fica localizada'),
          rua: yup
            .string('erroo')
            .min(3)
            .max(25)
            .required('Insira a rua aonde fica localizada'),
          numero: yup
            .number()
            .min(1)
            .max(10000)
            .required('Numero invalido'),
          descricao: yup
            .string('Erro')
            .min(3)
            .max(50),
          aluguel: yup
            .number('Erro')
            .min(2)
            .max(2000)
            .required('Valor invalido'),
          contas: yup
            .number('Erro')
            .min(2)
            .max(600)
            .required('Valor invalido'),
          genero: yup.string('Erro'),
          animais: yup.string('Erro'),
          tipoImovel: yup.string('Erro'),
          numeroVagas: yup.string('Erro'),
          aQuarto: yup
            .string('Erro')
            .min(3)
            .max(40)
            .required('Insira as acomodações do quarto'),
          aRepublica: yup
            .string('Erro')
            .min(3)
            .max(40)
            .required('Insira as acomodações da repúblicaaqui'),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
            <Fragment>
              {this.state.erro ? <CustomModal parametro="Erro" /> : <View />}
              {this.state.sucesso ? (
                <View style={estilo.V_modal}>
                  <CustomModal parametro="Sucesso" />
                </View>
              ) : (
                  <View />
                )}
              <ViewPager style={{ flex: 1 }}>
                <View key="1">
                  <ScrollView>
                    <View style={estilo.V_header}>
                      <TouchableOpacity
                        style={{ marginLeft: '5%' }}
                        onPress={() => {
                          this.props.navigation.goBack(null);
                        }}
                      >
                        <Icon name="ios-arrow-back" style={estilo.iconHeader} />
                      </TouchableOpacity>

                      <Text style={estilo.title}>Informações Basicas</Text>
                    </View>

                    <View style={estilo.V_Conteudo}>
                      <Text style={estilo.textRepublica}>
                        Nos passe algumas informaçoes basica para fazer o registro
                        de sua republica
                    </Text>

                      <View>
                        <Text style={estilo.txtLabel}>Nome da Republica</Text>
                        <Item>
                          <Input
                            value={values.nome}
                            onChangeText={handleChange('nome')}
                            placeholder={this.props.titulo}
                            onBlur={() => setFieldTouched('nome')}
                          />
                        </Item>
                      </View>
                      <View style={estilo.V_error}>
                        {touched.nome && errors.nome && (
                          <Text style={estilo.textError}>
                            {errors.nome}
                          </Text>
                        )}
                      </View>

                      <View style={estilo.campos} inlineLabel>
                        <Label style={estilo.txtLabel}>Bairro</Label>
                        <Item>
                          <Input
                            value={values.bairro}
                            onChangeText={handleChange('bairro')}
                            placeholder=""
                            onBlur={() => setFieldTouched('bairro')}
                          />
                        </Item>
                      </View>
                      <View style={estilo.V_error}>
                        {touched.bairro && errors.bairro && (
                          <Text style={estilo.textError}>
                            {errors.bairro}
                          </Text>
                        )}
                      </View>

                      <View style={estilo.ruaNum}>
                        <View floatingLabel style={{ width: '70%' }}>
                          <Label style={estilo.txtLabel}>Rua </Label>
                          <Item>
                            <Input
                              value={values.rua}
                              onChangeText={handleChange('rua')}
                              placeholder=""
                              onBlur={() => setFieldTouched('rua')}
                            />
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.rua && errors.rua && (
                              <Text style={estilo.textError}>
                                {errors.rua}
                              </Text>
                            )}
                          </View>
                        </View>

                        <View floatingLabel style={{ width: '20%' }}>
                          <Label style={estilo.txtLabel}>N°</Label>
                          <Item>
                            <Input
                              value={values.numero}
                              onChangeText={handleChange('numero')}
                              placeholder=""
                              onBlur={() => setFieldTouched('numero')}
                            />
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.numero && errors.numero && (
                              <Text style={estilo.textError}>
                                {errors.numero}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      <View style={estilo.camposAmb} inlineLabel>
                        <Label style={estilo.txtLabel}>Descricao Ambiente</Label>
                        <Item>
                          <Input
                            value={values.descricao}
                            onChangeText={handleChange('descricao')}
                            placeholder=""
                            onBlur={() => setFieldTouched('descricao')}
                          />
                        </Item>
                      </View>
                      <View style={estilo.V_error}>
                        {touched.descricao && errors.descricao && (
                          <Text style={estilo.textError}>
                            {errors.descricao}
                          </Text>
                        )}
                      </View>
                      <View style={estilo.V_ImageLabel}>
                        <Text style={estilo.txtLabel}>
                          Envie Fotos de Sua Republica
                      </Text>
                      </View>
                      <View style={estilo.V_ImageEmpty}>
                        {this.state.imageURI0 == null ? (
                          <View style={estilo.V_ImageFull}>
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <Image
                              source={{ uri: this.state.imageURI0 }}
                              style={estilo.ImageFull}
                            />
                          )}
                        {this.state.imageURI1 == null ? (
                          <View
                            style={estilo.V_ImageFull}
                          >
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <Image
                              source={{ uri: this.state.imageURI1 }}
                              style={estilo.ImageFull}
                            />
                          )}
                        {this.state.imageURI2 == null ? (
                          <View
                            style={estilo.V_ImageFull}
                          >
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <Image
                              source={{ uri: this.state.imageURI2 }}
                              style={estilo.ImageFull}
                            />
                          )}
                      </View>

                      <View style={estilo.V_BotaoImg}>
                        <Button
                          style={estilo.botao_send}
                          onPress={() => {
                            this.uploadFile();
                          }}
                        >
                          {/* //<Icon name="account-outline" style={estilo.icon_send} /> */}
                          <Text>Enviar Fotos (0/3)</Text>
                        </Button>
                      </View>
                    </View>
                  </ScrollView>
                </View>

                <View key="2">
                  <View style={estilo.V_header}>
                    <Icon name="ios-arrow-back" style={estilo.iconHeader} />
                    <Text style={estilo.title}>Detalhes da República</Text>
                  </View>
                  <ScrollView>
                    <View style={estilo.V_Conteudo}>
                      <Text
                        style={estilo.textRepublica}
                      >
                        Agora nos passe algumas caracteristicas basica de sua
                        republica.
                    </Text>

                      <View
                        style={estilo.V_Caracteristicas}
                      >
                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Aluguel</Text>
                          <Item>
                            <Label fixedLabel>R$</Label>
                            <Input
                              value={values.aluguel}
                              onChangeText={handleChange('aluguel')}
                              placeholder=""
                              onBlur={() => setFieldTouched('aluguel')}
                            />
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.aluguel && errors.aluguel && (
                              <Text style={estilo.textError}>
                                {errors.aluguel}
                              </Text>
                            )}
                          </View>
                        </View>

                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Média de contas</Text>
                          <Item>
                            <Label fixedLabel>R$</Label>
                            <Input
                              value={values.contas}
                              onChangeText={handleChange('contas')}
                              placeholder=""
                              onBlur={() => setFieldTouched('contas')}
                            />
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.contas && errors.contas && (
                              <Text style={estilo.textError}>
                                {errors.contas}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      <View
                        style={estilo.V_Caracteristicas}
                      >
                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Genero</Text>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined }}
                              placeholder=""
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.genero}
                              onValueChange={handleChange('genero')}
                              value={values.genero}
                              onChangeText={handleChange('genero')}
                              placeholder=""
                              onBlur={() => setFieldTouched('genero')}
                            >
                              <Picker.Item label="Feminina" value="Feminina" />
                              <Picker.Item label="Masculina" value="Masculina" />
                              <Picker.Item label="Mista" value="Mista" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.genero && errors.genero && (
                              <Text style={estilo.textError}>
                                {errors.genero}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Aceita Animais ?</Text>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined }}
                              placeholder="Sim ou Nao"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.animais}
                              onValueChange={handleChange('animais')}
                              value={values.animais}
                              onChangeText={handleChange('animais')}
                              placeholder=""
                              onBlur={() => setFieldTouched('animais')}
                            >
                              <Picker.Item label="Sim" value="sim" />
                              <Picker.Item label="Não" value="nao" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.animais && errors.animais && (
                              <Text style={estilo.textError}>
                                {errors.animais}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      <View
                        style={estilo.V_Caracteristicas}
                      >
                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Tipo de Imovel</Text>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined }}
                              placeholder=""
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.tipoImovel}
                              onValueChange={handleChange('tipoImovel')}
                              value={values.tipoImovel}
                              onChangeText={handleChange('tipoImovel')}
                              placeholder=""
                              onBlur={() => setFieldTouched('tipoImovel')}
                            >
                              <Picker.Item label="Casa" value="Casa" />
                              <Picker.Item
                                label="Apartamento"
                                value="Apartamento"
                              />
                            </Picker>
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.tipoImovel && errors.tipoImovel && (
                              <Text style={estilo.textError}>
                                {errors.tipoImovel}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View style={estilo.V_Campos}>
                          <Text style={estilo.txtLabel}>Vagas Disponiveis</Text>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined }}
                              placeholder="Sim ou Nao"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.numeroVagas}
                              onValueChange={handleChange('numeroVagas')}
                              value={values.numeroVagas}
                              //onChangeText={handleChange('numeroVagas')}
                              placeholder=""
                              onBlur={() => setFieldTouched('numeroVagas')}
                            >
                              <Picker.Item label="1" value="1" />
                              <Picker.Item label="2" value="2" />
                              <Picker.Item label="3+" value="3+" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_error}>
                            {touched.numeroVagas && errors.numeroVagas && (
                              <Text style={estilo.textError}>
                                {errors.numeroVagas}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      <View style={estilo.campos} inlineLabel>
                        <Label style={estilo.txtLabel}>
                          Acomodaçoes do Quarto
                      </Label>
                        <Item>
                          <Input
                            style={estilo.place}
                            value={values.aQuarto}
                            onChangeText={handleChange('aQuarto')}
                            placeholder=""
                            onBlur={() => setFieldTouched('aQuarto')}
                            placeholder=""
                          />
                        </Item>
                      </View>
                      <View style={estilo.V_error}>
                        {touched.aQuarto && errors.aQuarto && (
                          <Text style={estilo.textError}>
                            {errors.aQuarto}
                          </Text>
                        )}
                      </View>

                      <View style={estilo.campos} inlineLabel>
                        <Label style={estilo.txtLabel}>
                          Acomodaçoes da Republica
                      </Label>
                        <Item>
                          <Input
                            style={estilo.place}
                            value={values.aRepublica}
                            onChangeText={handleChange('aRepublica')}
                            placeholder=""
                            onBlur={() => setFieldTouched('aRepublica')}
                            placeholder="EX: Wifi, Maquina de Lavar, Fogao"
                          />
                        </Item>
                      </View>
                      <View style={estilo.V_error}>
                        {touched.aRepublica && errors.aRepublica && (
                          <Text style={estilo.textError}>
                            {errors.aRepublica}
                          </Text>
                        )}
                      </View>

                      <View style={estilo.V_btnProx}>
                        <Button style={estilo.btnProximo} onPress={handleSubmit}>
                          <Text>Publicar</Text>
                          <Icon
                            name="ios-checkmark-circle"
                            style={estilo.iconeBtn}
                          />
                        </Button>
                        <View>
                          <Text>
                            {
                              (errors.nome,
                                errors.bairro,
                                errors.rua,
                                errors.numero,
                                errors.aluguel,
                                errors.contas,
                                errors.moradores,
                                errors.genero,
                                errors.animais,
                                errors.aQuarto,
                                errors.aRepublica,
                                errors.numeroVagas,
                                errors.tipoImovel,
                                errors.descricao)
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </ViewPager>
            </Fragment>
          )}
      </Formik>
    );
  }
}

//Conexao react e Redux
//Recomendação do redux, que recebe state do store e retorna um json com props que vao ser acessivel dentro do compoennte
const mapStateToProps = state => {
  return {
    representante: state.user.nome,
    email: state.user.email,
    telefone: state.user.telefone,
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    titulo: state.auth.nomeRepublica,
    valorAluguel: state.auth.valorAluguel,
    genero: state.auth.genero,
    numeroVagas: state.auth.numVagas,
    bairro: state.auth.bairro,
    rua: state.auth.rua,
    pessoas: state.auth.pessoas,
    numeroCasa: state.auth.numeroCasa,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    valorContas: state.auth.valorContas,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};
// passa a aonde criamos os state o conjuento de actions que vai ser utilizada e a pagina a ser renderizada
const CadastroConnect = connect(
  mapStateToProps,
  {
    editTipoImovel,
    editNomeRepublica,
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
  }
)(Cadastro);

// depois da um export default no CadastroConnect

export default CadastroConnect;
