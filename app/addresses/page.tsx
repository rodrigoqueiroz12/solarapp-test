"use client"

import { Card } from "@/app/components/ui/card"
import { useAddressContext } from "../contexts/AddressContext"
import Header from "./components/Header"
import { Skeleton } from "../components/ui/skeleton"
import GoogleMap from "../components/GoogleMap"
import AddressInformation from "./components/AddressInformation"
import AddressList from "./components/AddressList"
import { useState } from "react"

export default function Home() {
	const [isMobileSideBarActive, setIsMobileSideBarActive] = useState(false)
	const { addressesIsLoading } = useAddressContext()

	function handleToggleMobileNavBar() {
		setIsMobileSideBarActive(state => {
			return !state
		})
	}

	return (
		<div className="h-screen max-h-screen py-12 px-4 max-w-[1140px] mx-auto flex flex-col gap-4 overflow-hidden">
			<Header toggleMobileNavBar={handleToggleMobileNavBar} />
			<main className={`h-full flex-1 flex overflow-hidden`}>
				<section className="flex-1 max-h-full overflow-hidden">
					<div className="h-full max-h-full flex gap-4 overflow-hidden relative md:static">
						<Card className="flex-1 overflow-hidden">
							{addressesIsLoading ? (
								<Skeleton className="w-full h-full" />
							) : (
								<GoogleMap />
							)}
						</Card>

						<div
							className={`
              ${
								isMobileSideBarActive ? "translate-x-0" : "translate-x-full"
							} absolute right-0 transition-transform gap-2 bg-card px-3
              md:bg-transparent md:p-0 md:transition-none md:static h-full w-[256px] max-h-full flex flex-col md:gap-4 md:translate-x-0
            `}
						>
							<AddressInformation />

							<AddressList />
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
