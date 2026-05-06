import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="school" size={48} color="#2563eb" />
        <Text style={styles.title}>Selamat Datang!</Text>
        <Text style={styles.subtitle}>
          Sistem Registrasi Peserta Mobile
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color="#2563eb" />
          <Text style={styles.cardTitle}>Tentang Aplikasi</Text>
        </View>
        <Text style={styles.description}>
          Aplikasi ini dirancang khusus untuk mempermudah pengelolaan data
          pendaftaran peserta di mana saja dan kapan saja. Dilengkapi dengan
          sinkronisasi data real-time, Anda dapat menambah, mengubah, dan
          memantau data peserta secara langsung dari genggaman Anda.
        </Text>
      </Card>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Ionicons name="people" size={32} color="#2563eb" />
          <Text style={styles.statNumber}>Akses Cepat</Text>
          <Text style={styles.statLabel}>Kelola Peserta</Text>
        </Card>
        <Card style={styles.statCard}>
          <Ionicons name="map" size={32} color="#f59e0b" />
          <Text style={styles.statNumber}>Wilayah</Text>
          <Text style={styles.statLabel}>Provinsi & Kab/Kota</Text>
        </Card>
      </View>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb" size={24} color="#f59e0b" />
          <Text style={styles.cardTitle}>Tips Penggunaan</Text>
        </View>
        <Text style={styles.description}>
          • Gunakan menu navigasi di bawah untuk berpindah antar halaman.{"\n"}
          • Pastikan koneksi internet stabil untuk sinkronisasi data.{"\n"}
          • Anda dapat melampirkan foto peserta langsung dari galeri HP Anda.
        </Text>
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
  header: {
    alignItems: "center",
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a", // slate-900
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b", // slate-500
    marginTop: 4,
  },
  card: {
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  description: {
    fontSize: 15,
    color: "#475569", // slate-600
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginBottom: 0,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});
