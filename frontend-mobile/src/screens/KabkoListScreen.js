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

export default function KabkoListScreen({ navigation }) {
  const [kabko, setKabko] = useState([]);

  const getKabko = async () => {
    try {
      const response = await api.get("/kabko");
      setKabko(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data Kabupaten/Kota");
      console.log(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getKabko();
    }, [])
  );

  const hapusKabko = async (id) => {
    if (Platform.OS === "web") {
      const isConfirmed = window.confirm("Yakin ingin menghapus data ini?");
      if (isConfirmed) {
        try {
          await api.delete(`/kabko/${id}`);
          window.alert("Data berhasil dihapus");
          getKabko();
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
              await api.delete(`/kabko/${id}`);
              Alert.alert("Sukses", "Data berhasil dihapus");
              getKabko();
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
        <Text style={styles.infoText}>Provinsi ID: {item.id_provinsi}</Text>
      </View>

      <View style={styles.action}>
        <Button
          title="Edit"
          variant="warning"
          style={styles.actionBtn}
          onPress={() =>
            navigation.navigate("KabkoForm", {
              id: item.id,
            })
          }
        />
        <Button
          title="Hapus"
          variant="danger"
          style={styles.actionBtn}
          onPress={() => hapusKabko(item.id)}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Tambah Kab/Kota"
        variant="primary"
        style={styles.addButton}
        onPress={() => navigation.navigate("KabkoForm")}
      />

      <FlatList
        data={kabko}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada data Kabupaten/Kota</Text>
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
