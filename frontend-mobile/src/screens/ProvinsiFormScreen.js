import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Platform } from "react-native";
import api from "../api/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ProvinsiFormScreen({ route, navigation }) {
  const id = route.params?.id;
  const [nama, setNama] = useState("");

  useEffect(() => {
    if (id) {
      getProvinsiById();
    }
  }, [id]);

  const getProvinsiById = async () => {
    try {
      const response = await api.get(`/provinsi/${id}`);
      setNama(response.data.nama || "");
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail provinsi");
      console.log(error.message);
    }
  };

  const simpanProvinsi = async () => {
    if (!nama) {
      if (Platform.OS === "web") window.alert("Nama provinsi wajib diisi");
      else Alert.alert("Validasi", "Nama provinsi wajib diisi");
      return;
    }

    try {
      if (id) {
        await api.put(`/provinsi/${id}`, { nama });
        if (Platform.OS === "web") window.alert("Data berhasil diperbarui");
        else Alert.alert("Sukses", "Data berhasil diperbarui");
      } else {
        await api.post("/provinsi", { nama });
        if (Platform.OS === "web") window.alert("Data berhasil ditambahkan");
        else Alert.alert("Sukses", "Data berhasil ditambahkan");
      }

      navigation.goBack();
    } catch (error) {
      if (Platform.OS === "web") window.alert("Gagal menyimpan data provinsi");
      else Alert.alert("Error", "Gagal menyimpan data provinsi");
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.title}>
          {id ? "Edit Provinsi" : "Tambah Provinsi"}
        </Text>

        <Input
          label="Nama Provinsi"
          placeholder="Masukkan nama provinsi"
          value={nama}
          onChangeText={setNama}
        />

        <Button
          title={id ? "Simpan Perubahan" : "Simpan Provinsi"}
          variant="primary"
          onPress={simpanProvinsi}
          style={styles.saveButton}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a", // slate-900
    marginBottom: 20,
    textAlign: "center",
  },
  saveButton: {
    marginTop: 12,
  },
});
