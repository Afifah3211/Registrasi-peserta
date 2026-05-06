import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import api from "../api/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function PesertaFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    tempatlahir: "",
    tanggallahir: "",
    agama: "",
    alamat: "",
    telepon: "",
    jk: "",
    hobi: "",
    idkabko: "",
  });

  const [existingFoto, setExistingFoto] = useState("");
  const [fotoFile, setFotoFile] = useState(null);

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabkoList, setKabkoList] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());

  useEffect(() => {
    loadProvinsi();
    if (id) {
      getPesertaById();
    }
  }, [id]);

  const loadProvinsi = async () => {
    try {
      const response = await api.get("/provinsi");
      setProvinsiList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadKabko = async (idProvinsi) => {
    if (!idProvinsi) {
      setKabkoList([]);
      return;
    }
    try {
      const response = await api.get(`/kabko/provinsi/${idProvinsi}`);
      setKabkoList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPesertaById = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      const data = response.data;

      setForm({
        nama: data.nama || "",
        tempatlahir: data.tempatlahir || "",
        tanggallahir: data.tanggallahir ? data.tanggallahir.substring(0, 10) : "",
        agama: data.agama || "",
        alamat: data.alamat || "",
        telepon: data.telepon || "",
        jk: data.jk ? String(data.jk) : "",
        hobi: data.hobi || "",
        idkabko: data.idkabko ? String(data.idkabko) : "",
      });

      if (data.tanggallahir) {
        setDateValue(new Date(data.tanggallahir));
      }

      setExistingFoto(data.foto || "");

      if (data.id_provinsi) {
        setSelectedProvinsi(String(data.id_provinsi));
        loadKabko(data.id_provinsi);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  const handleProvinsiChange = (itemValue) => {
    setSelectedProvinsi(itemValue);
    setForm({ ...form, idkabko: "" });
    loadKabko(itemValue);
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateValue;
    setShowDatePicker(Platform.OS === "ios");
    setDateValue(currentDate);

    // Format to YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];
    handleChange("tanggallahir", formattedDate);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin Ditolak", "Maaf, kami membutuhkan izin akses galeri untuk ini!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFotoFile(result.assets[0]);
    }
  };

  const simpanPeserta = async () => {
    if (!form.nama || !form.tempatlahir || !form.tanggallahir) {
      if (Platform.OS === "web")
        window.alert("Nama, tempat lahir, dan tanggal lahir wajib diisi");
      else
        Alert.alert(
          "Validasi",
          "Nama, tempat lahir, dan tanggal lahir wajib diisi"
        );
      return;
    }

    const formData = new FormData();

    for (const key in form) {
      if (form[key] !== "" && form[key] !== null) {
        formData.append(key, form[key]);
      }
    }

    if (fotoFile) {
      const localUri = fotoFile.uri;
      const filename = fotoFile.fileName || localUri.split("/").pop();
      const type = fotoFile.mimeType || "image/jpeg";

      formData.append("foto", {
        uri: Platform.OS === 'ios' ? localUri.replace('file://', '') : localUri,
        name: filename,
        type,
      });
    }

    try {
      const url = id ? `${api.defaults.baseURL}/peserta/${id}` : `${api.defaults.baseURL}/peserta`;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
        headers: {
          // fetch automatically sets multipart/form-data boundary
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Gagal menyimpan data");
      }

      if (Platform.OS === "web") window.alert("Data berhasil disimpan");
      else Alert.alert("Sukses", "Data berhasil disimpan");

      navigation.goBack();
    } catch (error) {
      if (Platform.OS === "web") window.alert(error.message);
      else Alert.alert("Error", error.message);
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.title}>
          {id ? "Edit Data Peserta" : "Tambah Data Peserta"}
        </Text>

        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama"
          value={form.nama}
          onChangeText={(value) => handleChange("nama", value)}
        />

        <Input
          label="Tempat Lahir"
          placeholder="Masukkan tempat lahir"
          value={form.tempatlahir}
          onChangeText={(value) => handleChange("tempatlahir", value)}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <TouchableOpacity 
            style={styles.datePickerButton} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={form.tanggallahir ? styles.dateText : styles.datePlaceholder}>
              {form.tanggallahir ? form.tanggallahir : "Pilih Tanggal Lahir"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateValue}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <Input
          label="Agama"
          placeholder="Masukkan agama"
          value={form.agama}
          onChangeText={(value) => handleChange("agama", value)}
        />

        <Input
          label="Alamat Lengkap"
          placeholder="Masukkan alamat"
          value={form.alamat}
          onChangeText={(value) => handleChange("alamat", value)}
          multiline
        />

        <Input
          label="Telepon / WhatsApp"
          placeholder="0812xxxx"
          value={form.telepon}
          onChangeText={(value) => handleChange("telepon", value)}
          keyboardType="phone-pad"
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.jk}
              onValueChange={(itemValue) => handleChange("jk", itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Pilih Jenis Kelamin --" value="" color="#94a3b8" />
              <Picker.Item label="Pria" value="1" />
              <Picker.Item label="Wanita" value="2" />
            </Picker>
          </View>
        </View>

        <Input
          label="Hobi"
          placeholder="Masukkan hobi"
          value={form.hobi}
          onChangeText={(value) => handleChange("hobi", value)}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Foto</Text>
          
          {existingFoto && !fotoFile && (
            <Text style={styles.infoText}>Foto saat ini: {existingFoto}</Text>
          )}

          {fotoFile && (
            <Image source={{ uri: fotoFile.uri }} style={styles.previewImage} />
          )}

          <Button 
            title={fotoFile ? "Ganti Foto" : "Pilih Foto dari Galeri"} 
            variant="outline" 
            onPress={pickImage} 
            style={styles.uploadButton}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Provinsi</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedProvinsi}
              onValueChange={handleProvinsiChange}
              style={styles.picker}
            >
              <Picker.Item label="-- Pilih Provinsi --" value="" color="#94a3b8" />
              {provinsiList.map((item) => (
                <Picker.Item key={item.id} label={item.nama} value={String(item.id)} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Kabupaten / Kota</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.idkabko}
              onValueChange={(itemValue) => handleChange("idkabko", itemValue)}
              style={styles.picker}
              enabled={kabkoList.length > 0}
            >
              <Picker.Item label="-- Pilih Kab/Kota --" value="" color="#94a3b8" />
              {kabkoList.map((item) => (
                <Picker.Item key={item.id} label={item.nama} value={String(item.id)} />
              ))}
            </Picker>
          </View>
        </View>

        <Button
          title={id ? "Simpan Perubahan" : "Simpan Peserta"}
          variant="primary"
          onPress={simpanPeserta}
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 15,
    color: "#0f172a",
  },
  datePlaceholder: {
    fontSize: 15,
    color: "#94a3b8",
  },
  infoText: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: "cover",
  },
  uploadButton: {
    borderStyle: "dashed",
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 20,
  },
});