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

export default function ProvinsiListScreen({ navigation }) {
  const [provinsi, setProvinsi] = useState([]);

  const getProvinsi = async () => {
    try {
      const response = await api.get("/provinsi");
      setProvinsi(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data provinsi");
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProvinsi();
    }, [])
  );

  const hapusProvinsi = async (id) => {
    if (Platform.OS === "web") {
      const isConfirmed = window.confirm("Yakin ingin menghapus data ini?");
      if (isConfirmed) {
        try {
          await api.delete(`/provinsi/${id}`);
          window.alert("Data berhasil dihapus");
          getProvinsi();
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
              await api.delete(`/provinsi/${id}`);
              Alert.alert("Sukses", "Data berhasil dihapus");
              getProvinsi();
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
        <Text style={styles.idText}>ID: {item.id}</Text>
      </View>

      <View style={styles.action}>
        <Button
          title="Edit"
          variant="warning"
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("ProvinsiForm", {
              id: item.id,
            })
          }
        />
        <Button
          title="Hapus"
          variant="danger"
          style={styles.actionBtn}
          onPress={() => hapusProvinsi(item.id)}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Tambah Provinsi"
        variant="primary"
        style={styles.addButton}
        onPress={() => navigation.navigate("ProvinsiForm")}
      />

      <FlatList
        data={provinsi}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada data provinsi</Text>
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
    marginBottom: 16,
  },
  nama: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a", // slate-900
    marginBottom: 4,
  },
  idText: {
    fontSize: 14,
    color: "#64748b", // slate-500
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
