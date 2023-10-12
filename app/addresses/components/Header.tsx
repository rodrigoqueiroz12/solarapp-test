import Link from "next/link"
import ThemeSwitcher from "../../components/ThemeSwitcher"
import { Button } from "@/app/components/ui/button"
import { Menu } from "lucide-react"

export default function Header({
	toggleMobileNavBar,
}: {
	toggleMobileNavBar: () => void
}) {
	return (
		<header className="flex items-center justify-between">
			<Link href="/" className="flex items-center gap-3">
				<strong className="leading-normal text-2xl">Solar Info</strong>
			</Link>

			<div className="flex gap-4">
				<ThemeSwitcher />

				<Button
					variant="outline"
					size="icon"
					className="md:hidden"
					onClick={() => toggleMobileNavBar()}
				>
					<Menu className="h-[1.2rem] w-[1.2rem] " />
				</Button>
			</div>
		</header>
	)
}
