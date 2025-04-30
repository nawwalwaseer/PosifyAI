import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Fix default icon issue in Leaflet for React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

const suppliers = [
  {
    name: "Karachi Supplier",
    location: [24.8607, 67.0011], // [lat, lon]
  },
  {
    name: "Lahore Supplier",
    location: [31.5497, 74.3436],
  },
]

export function SupplierMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Supplier Mapping - Pakistan</CardTitle>
      </CardHeader>
      <CardContent>
        <MapContainer
          center={[30.3753, 69.3451]} // Center of Pakistan
          zoom={5.5}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {suppliers.map((supplier, index) => (
            <Marker key={index} position={supplier.location}>
              <Popup>{supplier.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  )
}
