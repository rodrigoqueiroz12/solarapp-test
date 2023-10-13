import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Home() {
	return (
		<main className="h-screen w-screen flex flex-col items-center justify-center">
			<h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">
				Welcome to SolarApp Test 😁🗺️
			</h1>
			<p className="flex gap-2 text-sm sm:text-lg md:text-xl mb-4 md:mb-8">
				This is a technical test from
				<a
					href="https://deltasistemas.net/"
					className="font-bold text-primary flex hover:text-primary/80 transition-colors"
					target="_blank"
				>
					Delta Sistemas <ExternalLink size={16} className="ml-2" />
				</a>
			</p>
			<Link
				href={"/addresses"}
				className="font-semibold rounded py-2 px-4 text-primary hover:text-primary/80 transition-colors"
			>
				Go to addresses
			</Link>
		</main>
	)
}
