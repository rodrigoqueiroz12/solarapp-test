"use client"

import { Rings } from "react-loader-spinner"

export default function Loading() {
	return (
		<div className="w-screen h-screen flex justify-center items-center gap-2">
			<Rings
				height="32"
				width="32"
				color=""
				radius="6"
				wrapperStyle={{}}
				wrapperClass="loading-wrapper"
				visible={true}
				ariaLabel="rings-loading"
			/>
			<span className="text-md text-muted-foreground">Loading</span>
		</div>
	)
}
