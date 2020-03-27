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
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident })
  }

  async function loadIncidents() {
    // Prevents another requisition if the user starts pushing the screen down a lot.
    if (loading) {
      return
    }
    // Prevents requests in case the total of incidents is equals to the ones loaded
    if (totalIncidents > 0 && incidents.length == totalIncidents) {
      return
    }

    setLoading(true)

    const response = await api.get("/incidents", {
      params: { page }
    })
    setIncidents([...incidents, ...response.data])
    setTotalIncidents(response.headers["x-total-count"])
    setPage(page + 1)
    setLoading(false)
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
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
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
              onPress={() => navigateToDetail(incident)}
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
