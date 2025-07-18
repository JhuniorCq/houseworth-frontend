import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { PredictionResult } from "../types/prediction";
import { searchNeighborhood, searchOverallQual } from "../utils/logic";

interface PDFProps {
  predictions: PredictionResult[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontSize: 11,
    color: "#333",
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#6b5a46",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: "1px solid #ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 11,
    marginRight: 5,
    color: "#6b5a46",
  },
  value: {
    fontSize: 11,
    color: "#333",
  },
  footer: {
    fontSize: 10,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

const PDF = ({ predictions }: PDFProps) => {
  return (
    <Document>
      {predictions.map((p) => (
        <Page key={p.id} size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>Reporte de Predicciones</Text>

            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Predicción ID:</Text>
                <Text style={styles.value}>{p.id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.value}>{p.predictionDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Hora:</Text>
                <Text style={styles.value}>{p.predictionTime}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Precio predicho:</Text>
                <Text style={styles.value}>$ {p.price}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Área habitable:</Text>
                <Text style={styles.value}>{p.grLivArea} ft²</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Capacidad del garage:</Text>
                <Text style={styles.value}>{p.garageCars} coches</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Área del sótano:</Text>
                <Text style={styles.value}>{p.totalBsmtSF} ft²</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Año de construcción:</Text>
                <Text style={styles.value}>{p.yearBuilt}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Calidad de la construcción:</Text>
                <Text style={styles.value}>
                  {searchOverallQual(p.overallQual)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vecindario:</Text>
                <Text style={styles.value}>
                  {searchNeighborhood(p.neighborhood)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>¿Es moderna?:</Text>
                <Text style={styles.value}>{p.isModern ? "Sí" : "No"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>¿Es lujosa?:</Text>
                <Text style={styles.value}>{p.isLuxury ? "Sí" : "No"}</Text>
              </View>
            </View>
          </View>

          <Text
            style={styles.footer}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  );
};

export default PDF;
