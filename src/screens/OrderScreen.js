import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const OrderScreen = ({ route }) => {
  const { userId, serviceId } = route.params;
  const [orderStatus, setOrderStatus] = useState(null);

  const handlePlaceOrder = async () => {
    try {
      // Realizar a requisição para gerar o pedido
      const response = await axios.post('http://localhost:3000/orders', {
        userId,
        serviceId,
      });
      // Atualizar o estado para exibir o status do pedido
      setOrderStatus(response.data.status);
    } catch (error) {
      console.error('Erro ao fazer o pedido:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>
      <Text>Usuário: {userId}</Text>
      <Text>Serviço: {serviceId}</Text>
      {orderStatus && <Text>Status do Pedido: {orderStatus}</Text>}
      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Fazer Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderScreen;
