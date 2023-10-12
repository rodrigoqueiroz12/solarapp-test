import { Card } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"

export default function AddressSkeleton() {
	return (
		<Card className="p-2 flex flex-col gap-1 bg-card rounded-sm border">
			<Skeleton className="h-4 w-3/4 rounded mb-1" />
			<Skeleton className="h-3 w-full rounded mb-1" />
			<Skeleton className="h-3 w-full rounded mb-1" />
		</Card>
	)
}
