import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../api/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function KabkoFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    id_provinsi: "",
  });

  const [provinsiList, setProvinsiList] = useState([]);

  useEffect(() => {
    getProvinsi();
    if (id) {
      getKabkoById();
    }
  }, [id]);

  const getProvinsi = async () => {
    try {
      const response = await api.get("/provinsi");
      setProvinsiList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKabkoById = async () => {
    try {
      const response = await api.get(`/kabko/${id}`);
      setForm({
        nama: response.data.nama || "",
        id_provinsi: response.data.id_provinsi ? String(response.data.id_provinsi) : "",
      });
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail Kabupaten/Kota");
      console.log(error.message);
    }
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const simpanKabko = async () => {
    if (!form.nama || !form.id_provinsi) {
      if (Platform.OS === "web") window.alert("Nama dan Provinsi wajib diisi");
      else Alert.alert("Validasi", "Nama dan Provinsi wajib diisi");
      return;
    }

    try {
      if (id) {
        await api.put(`/kabko/${id}`, form);
        if (Platform.OS === "web") window.alert("Data berhasil diperbarui");
        else Alert.alert("Sukses", "Data berhasil diperbarui");
      } else {
        await api.post("/kabko", form);
        if (Platform.OS === "web") window.alert("Data berhasil ditambahkan");
        else Alert.alert("Sukses", "Data berhasil ditambahkan");
      }

      navigation.goBack();
    } catch (error) {
      if (Platform.OS === "web") window.alert("Gagal menyimpan data Kabupaten/Kota");
      else Alert.alert("Error", "Gagal menyimpan data Kabupaten/Kota");
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.title}>
          {id ? "Edit Kabupaten/Kota" : "Tambah Kabupaten/Kota"}
        </Text>

        <Input
          label="Nama Kabupaten/Kota"
          placeholder="Masukkan nama Kab/Kota"
          value={form.nama}
          onChangeText={(value) => handleChange("nama", value)}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Provinsi</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.id_provinsi}
              onValueChange={(itemValue) => handleChange("id_provinsi", itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Pilih Provinsi --" value="" color="#94a3b8" />
              {provinsiList.map((item) => (
                <Picker.Item key={item.id} label={item.nama} value={String(item.id)} />
              ))}
            </Picker>
          </View>
        </View>

        <Button
          title={id ? "Simpan Perubahan" : "Simpan Kab/Kota"}
          variant="primary"
          onPress={simpanKabko}
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
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155", // slate-700
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#cbd5e1", // slate-300
    borderRadius: 8,
    backgroundColor: "#f8fafc", // slate-50
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "web" ? 40 : 50,
    color: "#0f172a",
  },
  saveButton: {
    marginTop: 12,
  },
});
