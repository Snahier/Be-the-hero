import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import styles from "./styles"
import api from "../../services/api"

import logoImg from "../../assets/logo.png"
import { TouchableOpacity, FlatList } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

const Incidents = () => {
  const [incidents, setIncidents] = useState([])
  const [totalIncidents, setTotalIncidents] = useState(0)
  const navigation = useNavigation()

  function navigateToDetail() {
    navigation.navigate("Detail")
  }

  async function loadIncidents() {
    const response = await api.get("/incidents")
    setIncidents(response.data)
    setTotalIncidents(response.headers["x-total-count"])
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de{" "}
          <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={navigateToDetail}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Incidents
