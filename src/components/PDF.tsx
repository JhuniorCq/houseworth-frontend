import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { PredictionResult } from "../types/prediction";

interface PDFProps {
  predictions: PredictionResult[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 12,
    color: "#333",
  },
});

// Acepta un Array de predicciones -> Una predicción por página
const PDF = ({ predictions }: PDFProps) => {
  console.log(predictions);
  return (
    <Document>
      {predictions.map((p) => (
        <Page key={p.id} size="A4" style={styles.page}>
          <Text>Reporte de Predicciones</Text>

          <Text>Predicción ID: {String(p.id)}</Text>

          <View>
            <Text>Fecha de predicción: {p.predictionDate}</Text>
            <Text>Hora de predicción: {p.predictionTime}</Text>
            <Text>Precio predicho: ${p.price}</Text>
            <Text>Área habitable: {p.grLivArea} sqft</Text>
            <Text>Garage: {p.garageCars} coches</Text>
            <Text>Total de sótano: {p.totalBsmtSF} sqft</Text>
            <Text>Año de construcción: {p.yearBuilt}</Text>
            <Text>Calidad general: {p.overallQual}</Text>
            <Text>Vecindario: {p.neighborhood}</Text>
            <Text>¿Es moderna? {p.isModern ? "Sí" : "No"}</Text>
            <Text>¿Es lujosa? {p.isLuxury ? "Sí" : "No"}</Text>
          </View>

          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
      ))}
    </Document>
  );
};

export default PDF;
