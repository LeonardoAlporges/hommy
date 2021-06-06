import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import CartaoCarona from '../../../components/CartaoCarona';
import CartaoProdutos from '../../../components/CartaoProdutos';
import { CartaoServico } from '../../../components/CartaoServico';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';
import {
  BarraSeparacao,
  BotaoDelete,
  BotaoEditar,
  BotaoInteressado,
  Container,
  Label,
  LabelBotaoEditar,
  ViewOpcoes,
  V_Label
} from './style';

function Anuncios({ navigation }) {
  const [listaRepublicas, setListaRepublicas] = useState([]);
  const [listaCaronas, setListaCaronas] = useState([]);
  const [listaProdutos,setListaProdutos] = useState([]);
  const [listaServicos,setListaServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [item, setItem] = useState('');
  const [tipo, setTipo] = useState('');
  const [anuncio, setAnuncio] = useState(0);
  const email = useSelector(state => state.user.email);

  function DeleteAnuncio(valor, item, tipo) {
    if (valor == 0) {
      return null;
    }
    if (tipo == 'Republica' && valor == 1) {
      api
        .delete(`/republica/${item._id}`)
        .then(responseJson => {
          setListaRepublicas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setLoading(false);
          setErro(true);
        });
    } else if (tipo == 'Carona' && valor == 1) {
      api
        .delete(`/carona/${item._id}`)
        .then(responseJson => {
          setListaCaronas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setReloading(false);
          setLoading(false);
        });
    } else if (tipo == 'Produto' && valor == 1) {
      api
        .delete(`/produto/${item._id}`)
        .then(responseJson => {
          setListaProdutos([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setReloading(false);
          setLoading(false);
        });
    } else if (tipo == 'Servico' && valor == 1) {
      api
        .delete(`/servico/${item._id}`)
        .then(responseJson => {
          setListaServicos([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setReloading(false);
          setLoading(false);
        });
    }
  }

  function getlist() {
    setLoading(true);
    api
      .get(`/userCarona/${email}`)
      .then(responseJson => {
        setListaCaronas(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false), setAnuncio(anuncio++),console.log("TESTE1")
      });
    api
      .get(`/userRepublica/${email}`)
      .then(responseJson => {
        setListaRepublicas(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally( () => {
        setLoading(false), setAnuncio(anuncio++),console.log("TESTE2")
      });
    api
      .get(`/userProduto/${email}`)
      .then(responseJson => {
        setListaProdutos(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally( () => {
        setLoading(false), setAnuncio(anuncio++),console.log("TESTE3")
      });
      api
      .get(`/userServico/${email}`)
      .then(responseJson => {
        setListaServicos(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally( () => {
        setLoading(false), setAnuncio(anuncio++),console.log("TESTE4")
      });
  }

  useEffect(() => {
    getlist();
  }, [reloading]);

  function editRepublica(edit) {
    const dados = edit;
    navigation.navigate('Cadastro', { update: true, dadosRepublica: dados });
  }

  function editCaronas(edit) {
    const dados = edit;
    navigation.navigate('CadastroCaronas', { update: true, carona: dados });
  }

  return (
    <Container>
      <HeaderBack title="Meus anúncios" onNavigation={() => navigation.navigate('TabsHeader', { menuAberto: true })} />
      {loading && <Loading />}
      {listaCaronas.length == 0 && listaRepublicas.length == 0 && listaServicos.length == 0 && !loading && (
        <EmptyState
          titulo="Sem anúncios"
          mensagem="Você ainda não anunciou nada. Nos diga quando houver vagas em sua república ou ofereça uma carona."
        />
      )}
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            setErro(false);
          }}
        />
      )}
      {modalConfirmacao && (
        <ModalConfirmacao
          retornoModal={valor => {
            DeleteAnuncio(valor, item, tipo);
            setModalConfirmacao(false);
          }}
          titulo="Excluir anúncio?"
          mensagem="Sua publicação será apagada e mais ninguém poderá vê-la."
          botaoCancel="Cancelar"
          botaoConfirmar="Excluir"
          confirmar={true}
        />
      )}
      <ScrollView>
        {listaRepublicas.length != 0 && (
          <View>
            <V_Label>
              <Label>Suas Republica</Label>
              <BarraSeparacao />
            </V_Label>

            <FlatList
              data={listaRepublicas}
              renderItem={({ item }) => (
                <View>
                  <Cartao data={item} />
                  <ViewOpcoes>
                    <BotaoDelete
                      onPress={() => {
                        setItem(item);
                        setTipo('Republica');
                        setModalConfirmacao(true);
                      }}
                    >
                      <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                    </BotaoDelete>
                    <BotaoEditar
                      onPress={() => {
                        editRepublica(item);
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="pencil" />
                      <LabelBotaoEditar>Editar</LabelBotaoEditar>
                    </BotaoEditar>
                    <BotaoInteressado
                      onPress={() => {
                        navigation.navigate('Agendamentos', {
                          usario: false,
                          idRepublica: item._id
                        });
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                      <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                    </BotaoInteressado>
                  </ViewOpcoes>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={reloading}
              onRefresh={getlist}
            />
          </View>
        )}

        {listaCaronas.length != 0 && (
          <View>
            <V_Label>
              <Label>Suas Caronas</Label>
              <BarraSeparacao />
            </V_Label>
            <FlatList
              data={listaCaronas}
              renderItem={({ item }) => (
                <View>
                  <CartaoCarona dados={item} />
                  <ViewOpcoes>
                    <BotaoDelete
                      onPress={() => {
                        setItem(item);
                        setTipo('Carona');
                        setModalConfirmacao(true);
                      }}
                    >
                      <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                    </BotaoDelete>

                    <BotaoEditar
                      onPress={() => {
                        editCaronas(item);
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="pencil" />
                      <LabelBotaoEditar>Editar</LabelBotaoEditar>
                    </BotaoEditar>

                    <BotaoInteressado
                      onPress={() => {
                        navigation.navigate('Interessados', {
                          usario: false,
                          idCarona: item._id
                        });
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                      <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                    </BotaoInteressado>
                  </ViewOpcoes>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </View> 
        )}
        {listaProdutos.length != 0 && (
          <View>
          <V_Label>
            <Label>Seus Produtos</Label>
            <BarraSeparacao />
          </V_Label>
          <FlatList
            data={listaProdutos}
            renderItem={({ item }) => (
              <View>
                <CartaoProdutos dados={item} />
                <ViewOpcoes>
                  <BotaoDelete
                    onPress={() => {
                      setItem(item);
                      setTipo('Produto');
                      setModalConfirmacao(true);
                    }}
                  >
                    <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                  </BotaoDelete>

                  <BotaoInteressado
                    onPress={() => {
                      navigation.navigate('InteressadosProduto', {
                        usario: false,
                        idProduto: item._id
                      });
                    }}
                  >
                    <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                    <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                  </BotaoInteressado>
                </ViewOpcoes>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
        )}
        {listaServicos.length != 0 && (
          <View>
          <V_Label>
            <Label>Seus Serviços</Label>
            <BarraSeparacao />
          </V_Label>
          <FlatList
            data={listaServicos}
            renderItem={({ item }) => (
              <View>
                <CartaoServico dados={item} />
                <ViewOpcoes>
                  <BotaoDelete
                    onPress={() => {
                      setItem(item);
                      setTipo('Servico');
                      setModalConfirmacao(true);
                    }}
                  >
                    <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                  </BotaoDelete>

                  <BotaoInteressado
                    onPress={() => {
                      navigation.navigate('InteressadosServico', {
                        usario: false,
                        idServico: item._id
                      });
                    }}
                  >
                    <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                    <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                  </BotaoInteressado>
                </ViewOpcoes>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
        )}
      </ScrollView>
    </Container>
  );
}

export default withNavigation(Anuncios);
