import AddressContextProvider from "./contexts/AddressContext"
import SolarContextProvider from "./contexts/GoogleSolarContext"
import { ThemeContextProvider } from "./contexts/ThemeContext"

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeContextProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
			>
				<AddressContextProvider>
					<SolarContextProvider>{children}</SolarContextProvider>
				</AddressContextProvider>
			</ThemeContextProvider>
		</>
	)
}
