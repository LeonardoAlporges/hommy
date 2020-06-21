import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0,
  },
  flatList: {
    backgroundColor: '#f2f2f2f2',
    padding: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  V_Botao: {
    padding: 5,
    alignItems: 'flex-end',
    width: '100%',
  },
  botao: {
    flexDirection: 'row',
    width: 150,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Analise: {
    marginLeft: 16,
    marginTop: 8,
    width: '30%',
    height: 30,
    borderRadius: 10,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Confirmado: {
    marginLeft: 16,
    marginTop: 8,
    width: '30%',
    height: 30,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#142850',
    fontWeight: 'bold',
  },
  dataConf: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  icon: {
    fontSize: 16,
    color: '#142850',
    marginRight: 10,
  },
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#142850',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
  },
  titleHeader: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
});

export default style;
