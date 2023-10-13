"use client"

import { useContext, createContext } from "react"
import useSWR from "swr"

import { useAddressContext } from "./AddressContext"
import { fetcher } from "../lib/utils"

interface ISolarContext {
	buildingInsight: any
	isBuildingInsightLoading: boolean
}

const SolarContext = createContext<ISolarContext>({
	buildingInsight: undefined,
	isBuildingInsightLoading: false,
})

export default function SolarContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { selectedAddress } = useAddressContext()

	const apiUrl = selectedAddress
		? `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_SOLAR_API}&location.latitude=${selectedAddress.latitude}&location.longitude=${selectedAddress.longitude}&requiredQuality=HIGH`
		: null

	const { data, isLoading } = useSWR(apiUrl, fetcher, {
		errorRetryCount: 0,
		revalidateOnFocus: false,
		shouldRetryOnError: false,
	})

	return (
		<SolarContext.Provider
			value={{
				buildingInsight: data,
				isBuildingInsightLoading: isLoading,
			}}
		>
			{children}
		</SolarContext.Provider>
	)
}

export const useSolarContext = () => useContext(SolarContext)
