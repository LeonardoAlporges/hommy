import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const FieldSet = styled.View`
  width: 45%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;

export const FieldSetLarge = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const LabelFielSet = styled.Text`
  position: absolute;
  top: -13px;
  left: 10px;
  font-family: WorkSans;
  font-size: 16px;
  color: #022250;
  background-color: #ffffff;
  padding: 0 5px 0 5px;
`;
export const Linha = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 33px;
`;
export const AreaFotos = styled.View`
  height: 130px;
  width: 100%;
  justify-content: space-between;
  margin-top: 33px;
  margin-bottom: 70px;
`;
export const LabelFotos = styled.Text`
  height: 30px;
  width: 100%;
  font-family: WorkSans;
  font-size: 16px;
  color: #022250;
`;
export const DivisaoFotos = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const estilo = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#142850',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  campos: {
    marginTop: 20
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginHorizontal: '5%'
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  V_interna1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)'
  },
  txtLabel: {
    fontFamily: 'WorkSans',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#586880'
  },
  title: {
    fontSize: 24,
    fontFamily: 'WorkSans',
    fontWeight: 'bold',
    color: '#142850'
  },
  V_Conteudo: {
    height: '100%',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  ruaNum: {
    display: 'flex',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  Valores: {
    display: 'flex',
    height: 30,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#f8f2',
    justifyContent: 'space-between'
  },
  campos2: {
    marginTop: 20
  },
  place: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#989898'
  },
  enviar: {
    alignItems: 'center',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  btnProximo: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    zIndex: 1
  },
  iconeBtn: {
    margin: 0,
    color: '#68c0e8'
  },
  botaoEnv: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    color: '#fff'
  },
  txtCarona: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#687368',
    marginHorizontal: 20,
    marginTop: 20
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  campoStyle: {
    width: '43%'
  },
  V_erro: {
    height: 12,
    width: '100%',
    textAlign: 'left'
  },
  textError: {
    fontFamily: 'WorkSans',
    textAlign: 'left',
    fontSize: 10,
    color: 'red'
  },
  V_btn: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center'
  },
  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080'
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center'
  },
  InputHora: {
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  V_ImageLabel: {
    width: '100%',
    height: 20,
    marginBottom: 18
  },
  V_ImageEmpty: {
    justifyContent: 'space-around',
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row'
  },
  V_ImageFull: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2e2e2e',
    padding: 10,
    opacity: 1
  },
  V_ImageFullEmpty: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2e2e2e',
    padding: 10,
    opacity: 0.3
  },
  ImageEmpty: {
    width: 50,
    height: 50,
    borderRadius: 3,
    opacity: 0.7
  },
  ImageFull: {
    width: 100,
    height: 100,
    borderRadius: 3
  },
  V_BotaoImg: {
    marginTop: 10,
    width: '100%',
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  }
});

export default estilo;
