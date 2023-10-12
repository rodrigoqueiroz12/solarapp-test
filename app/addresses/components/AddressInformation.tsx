import { useAddressContext } from "../../contexts/AddressContext"
import { useSolarContext } from "../../contexts/GoogleSolarContext"
import { Card } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"

export default function AddressInformation() {
	const { selectedAddress } = useAddressContext()
	const { buildingInsight, isBuildingInsightLoading } = useSolarContext()

	if (!selectedAddress) {
		return (
			<Card className="flex flex-col p-4">
				<strong className="text-sm mb-2">Please, select an address</strong>
				<span className="text-muted-foreground text-xs leading-5">
					The information for the selected address will be here
				</span>
			</Card>
		)
	}

	if (isBuildingInsightLoading) {
		return (
			<Card className="flex flex-col p-4">
				<strong className="text-sm mb-2">{selectedAddress.description}</strong>

				<Skeleton className="w-full h-4 rounded mb-2" />
				<Skeleton className="w-full h-4 rounded mb-2" />
				<Skeleton className="w-full h-4 rounded" />
			</Card>
		)
	}

	if (buildingInsight && buildingInsight.error) {
		return (
			<Card className="flex flex-col p-4">
				<strong className="text-sm mb-2">{selectedAddress.description}</strong>
				<span className="text-muted-foreground text-xs leading-5">
					{/*eslint-disable-next-line react/no-unescaped-entities*/}
					Sorry, we were unable to find information about this address. 😢
				</span>
			</Card>
		)
	}

	return (
		<Card className="flex flex-col p-4">
			<strong className="text-sm mb-2">{selectedAddress.description}</strong>

			<span className="text-muted-foreground text-xs leading-5">
				Max. panels capacity:{" "}
				{buildingInsight.solarPotential.maxArrayPanelsCount}un
			</span>
			<span className="text-muted-foreground text-xs leading-5">
				Generation Potential:{" "}
				{buildingInsight.solarPotential.panelCapacityWatts / 1000}kWp
			</span>

			{buildingInsight.solarPotential.financialAnalyses ? (
				<span className="text-muted-foreground text-xs leading-5">
					Expected savings: R$
					{
						buildingInsight.solarPotential.financialAnalyses[0]
							.cashPurchaseSavings.savings.savingsYear1.units
					}
					/year
				</span>
			) : (
				<>
					<hr className="my-2" />
					<span className="text-muted-foreground text-xs leading-5">
						Unfortunately, it was not possible to calculate the expected savings
					</span>
				</>
			)}
		</Card>
	)
}
