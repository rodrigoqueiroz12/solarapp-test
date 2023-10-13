import { useState } from "react"
import {
	GoogleMap as Map,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api"
import { Skeleton } from "./ui/skeleton"
import { useAddressContext } from "../contexts/AddressContext"
import { Address } from "../@types/solarpipe-address"

const containerStyle = {
	width: "100%",
	height: "100%",
}

export default function GoogleMap() {
	const [selectedMarker, setSelectedMarker] = useState<Address | null>(null)
	const { selectedAddress, addresses } = useAddressContext()
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	})

	return isLoaded && addresses ? (
		<Map
			clickableIcons={false}
			mapContainerStyle={containerStyle}
			center={
				selectedAddress
					? { lat: +selectedAddress.latitude, lng: +selectedAddress.longitude }
					: { lat: +addresses[0].latitude, lng: +addresses[0].longitude }
			}
			zoom={selectedAddress ? 16 : 13}
		>
			{addresses?.map(address => {
				return (
					<MarkerF
						key={address.uuid}
						position={{ lat: +address.latitude, lng: +address.longitude }}
						onClick={() => setSelectedMarker(address)}
					/>
				)
			})}

			{selectedMarker && (
				<InfoWindowF
					zIndex={1}
					position={{
						lat: +selectedMarker.latitude,
						lng: +selectedMarker.longitude,
					}}
					options={{
						pixelOffset: {
							width: 0,
							height: -40,
							equals: other => other?.height === other?.width,
						},
					}}
					onCloseClick={() => setSelectedMarker(null)}
				>
					<>
						<strong className="block mb-2 text-zinc-800 font-bold">
							{selectedMarker.description}
						</strong>
						<span className="text-xs text-zinc-500">
							{selectedMarker.streetName}
						</span>
					</>
				</InfoWindowF>
			)}
		</Map>
	) : (
		<>
			<Skeleton className="h-full w-full"></Skeleton>
		</>
	)
}
