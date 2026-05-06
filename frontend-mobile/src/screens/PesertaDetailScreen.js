import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import api from "../api/api";
import Card from "../components/Card";
import Button from "../components/Button";

export default function PesertaDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [peserta, setPeserta] = useState(null);

  useEffect(() => {
    getDetailPeserta();
  }, []);

  const getDetailPeserta = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      setPeserta(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  if (!peserta) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  const getImageUrl = (filename) => {
    // URL backend untuk static files (harus sesuai dengan express.static di backend)
    // Umumnya adalah http://IP:PORT/storage/uploads/foto/filename
    const baseUrl = api.defaults.baseURL;
    return `${baseUrl}/storage/uploads/foto/${filename}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        {peserta.foto ? (
          <Image
            source={{ uri: getImageUrl(peserta.foto) }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Tidak ada foto</Text>
          </View>
        )}

        <Text style={styles.nama}>{peserta.nama}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{peserta.id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tempat Lahir</Text>
          <Text style={styles.value}>{peserta.tempatlahir}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <Text style={styles.value}>
            {peserta.tanggallahir ? peserta.tanggallahir.substring(0, 10) : "-"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Agama</Text>
          <Text style={styles.value}>{peserta.agama || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.value}>{peserta.alamat}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Telepon</Text>
          <Text style={styles.value}>{peserta.telepon}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <Text style={styles.value}>
            {peserta.jk === 1 || peserta.jk === "1"
              ? "Pria"
              : peserta.jk === 2 || peserta.jk === "2"
              ? "Wanita"
              : peserta.jk || "-"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Hobi</Text>
          <Text style={styles.value}>{peserta.hobi || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Provinsi</Text>
          <Text style={styles.value}>{peserta.nama_provinsi || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Kab/Kota</Text>
          <Text style={styles.value}>{peserta.nama_kabko || "-"}</Text>
        </View>

        <Button
          title="Edit Data"
          variant="warning"
          onPress={() =>
            navigation.navigate("PesertaForm", {
              id: peserta.id,
            })
          }
          style={styles.editButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // slate-50
  },
  content: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    color: "#64748b",
    fontSize: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: "#e2e8f0",
  },
  noImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  nama: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a", // slate-900
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9", // slate-100
  },
  label: {
    fontWeight: "600",
    color: "#475569", // slate-600
    flex: 1,
  },
  value: {
    color: "#0f172a", // slate-900
    flex: 2,
    textAlign: "right",
  },
  editButton: {
    marginTop: 24,
  },
});