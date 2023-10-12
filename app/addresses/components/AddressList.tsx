import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { useAddressContext } from "@/app/contexts/AddressContext"
import AddressSkeleton from "./AddressSkeleton"
import AddressButton from "./AddressButton"
import { Address } from "@/app/@types/solarpipe-address"
import { Input } from "@/app/components/ui/input"
import { getState } from "@/app/lib/utils"

export default function AddressList() {
	const [filterTerm, setFilterTerm] = useState("")
	const {
		selectedAddress,
		addresses,
		setSelectedAddress,
		addressesIsLoading,
		addressesError,
	} = useAddressContext()

	function handleChangeSelectedAddress(address: Address) {
		setSelectedAddress(address)
	}

	function handleSetFilterTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setFilterTerm(event.target.value)
	}

	const filteredAddresses = (() => {
		if (!addresses) return addresses

		return addresses.filter(address => {
			const matchDescription = address.description
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchStreet = address.streetName
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchNumber = address.streetNumber
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchNeighborhood = address.neighbourhood
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchState = getState(address.state)
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchZipcode = address.zipcode
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchUf = address.state
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			const matchCity = address.city
				.toLocaleLowerCase()
				.includes(filterTerm.toLocaleLowerCase())

			return (
				matchDescription ||
				matchStreet ||
				matchNumber ||
				matchNeighborhood ||
				matchState ||
				matchZipcode ||
				matchCity ||
				matchUf
			)
		})
	})()

	return (
		<Card className="h-full flex-1 overflow-hidden">
			<ul className="p-2 max-h-full overflow-y-auto flex flex-col gap-3">
				<li>
					<Card className="overflow-hidden">
						<Input
							type="text"
							placeholder="Search here"
							value={filterTerm}
							onChange={handleSetFilterTerm}
						/>
					</Card>
				</li>

				{addressesIsLoading ? (
					<>
						<li>
							<AddressSkeleton />
						</li>
						<li>
							<AddressSkeleton />
						</li>
						<li>
							<AddressSkeleton />
						</li>
					</>
				) : null}

				{addressesError ? (
					<div className="p-2">
						<span className="text-sm text-muted-foreground">
							Unfortunately, the data could not be loaded. Please, try again
							later!
						</span>
					</div>
				) : null}

				{filteredAddresses?.map(address => {
					return (
						<li key={address.uuid}>
							<AddressButton
								active={selectedAddress?.uuid === address.uuid}
								changeSelectedAddress={() =>
									handleChangeSelectedAddress(address)
								}
							>
								<strong className="text-sm font-bold">
									{address.description}
								</strong>
								<span className="text-xs text-start text-muted-foreground">
									{`${address.streetName}, ${address.streetNumber}, ${
										address.neighbourhood
									}, ${address.city}, ${getState(address.state)} - ${
										address.state
									}, ${address.zipcode}`}
								</span>
							</AddressButton>
						</li>
					)
				})}
			</ul>
		</Card>
	)
}
