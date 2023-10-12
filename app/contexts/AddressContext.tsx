"use client"

import { useState, useContext, createContext } from "react"
import { Address } from "../@types/solarpipe-address"
import useSWR from "swr"
import { fetcher } from "../lib/utils"

interface IAddressContext {
	selectedAddress: Address | null
	setSelectedAddress: (address: Address) => void
	addresses: Address[] | undefined
	addressesError: any
	addressesIsLoading: boolean
}

const AddressContext = createContext<IAddressContext>({
	selectedAddress: null,
	setSelectedAddress: () => {},
	addresses: undefined,
	addressesError: {},
	addressesIsLoading: false,
})

export default function AddressContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
	const { data, error, isLoading } = useSWR<Address[]>(
		process.env.NEXT_PUBLIC_SOLARPIPE_API_URL,
		fetcher
	)

	return (
		<AddressContext.Provider
			value={{
				selectedAddress,
				setSelectedAddress,
				addresses: data,
				addressesError: error,
				addressesIsLoading: isLoading,
			}}
		>
			{children}
		</AddressContext.Provider>
	)
}

export const useAddressContext = () => useContext(AddressContext)
