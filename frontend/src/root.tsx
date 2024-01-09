import { LinksFunction, json } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	LiveReload,
	Scripts,
	useLoaderData
} from '@remix-run/react'
import stylesheet from './tailwind.css'
import { getEnvironnement } from './utils/gtm/env/environnement.server'
import { GoogleTagManager, GoogleTagManagerIframe } from './utils/gtm/GoogleTagManager'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
]
  
export async function loader() {
	return json({ ...getEnvironnement() })
}

export default function App() {
	const { GOOGLE_TAG_MANAGER_ID, NODE_ENV } = useLoaderData<typeof loader>()

	return (
		<html>
			<head>
				<link
					rel="icon"
					href="data:image/x-icon;base64,AA"
				/>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
				<GoogleTagManager id={GOOGLE_TAG_MANAGER_ID}/>

			</head>
			<body suppressHydrationWarning={NODE_ENV === 'development'}>
				<GoogleTagManagerIframe id={GOOGLE_TAG_MANAGER_ID}/>
				<Outlet />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
