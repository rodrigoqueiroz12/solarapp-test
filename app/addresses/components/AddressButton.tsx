import { Address } from "../../@types/solarpipe-address"

interface AddressButtonProps {
	children: React.ReactNode
	changeSelectedAddress: () => void
	active?: boolean
}

export default function AddressButton({
	children,
	changeSelectedAddress,
	active,
}: AddressButtonProps) {
	return (
		<button
			className={`${
				active ? "border-primary bg-secondary" : null
			} p-2 flex flex-col gap-1 bg-card rounded-sm border hover:border-primary transition-colors`}
			onClick={() => changeSelectedAddress()}
		>
			{children}
		</button>
	)
}
