import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../api/api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function PesertaListScreen({ navigation }) {
  const [peserta, setPeserta] = useState([]);

  const getPeserta = async () => {
    try {
      const response = await api.get("/peserta");
      setPeserta(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data peserta");
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPeserta();
    }, [])
  );

  const hapusPeserta = async (id) => {
    if (Platform.OS === "web") {
      const isConfirmed = window.confirm("Yakin ingin menghapus data ini?");
      if (isConfirmed) {
        try {
          await api.delete(`/peserta/${id}`);
          window.alert("Data berhasil dihapus");
          getPeserta();
        } catch (error) {
          window.alert("Gagal menghapus data");
          console.log(error.message);
        }
      }
    } else {
      Alert.alert("Konfirmasi", "Yakin ingin menghapus data ini?", [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/peserta/${id}`);
              Alert.alert("Sukses", "Data berhasil dihapus");
              getPeserta();
            } catch (error) {
              Alert.alert("Error", "Gagal menghapus data");
              console.log(error.message);
            }
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.cardHeader}>
        <Text style={styles.nama}>{item.nama}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.infoText}>Tempat Lahir: {item.tempatlahir}</Text>
        <Text style={styles.infoText}>Tanggal Lahir: {item.tanggallahir}</Text>
        <Text style={styles.infoText}>Telepon: {item.telepon}</Text>
      </View>

      <View style={styles.action}>
        <Button
          title="Detail"
          variant="primary"
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("PesertaDetail", {
              id: item.id,
            })
          }
        />
        <Button
          title="Edit"
          variant="warning"
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("PesertaForm", {
              id: item.id,
            })
          }
        />
        <Button
          title="Hapus"
          variant="danger"
          style={styles.actionBtn}
          onPress={() => hapusPeserta(item.id)}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Tambah Peserta"
        variant="primary"
        style={styles.addButton}
        onPress={() => navigation.navigate("PesertaForm")}
      />

      <FlatList
        data={peserta}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada data peserta</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // slate-50
  },
  listContainer: {
    padding: 16,
  },
  addButton: {
    margin: 16,
    marginBottom: 0,
  },
  cardHeader: {
    marginBottom: 8,
  },
  nama: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a", // slate-900
  },
  cardBody: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#475569", // slate-600
    marginBottom: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#64748b", // slate-500
    fontSize: 16,
  },
});