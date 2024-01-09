import { json } from '@remix-run/node'
import { Card } from 'src/components/Card'

export async function loader() {
	return json({ questions: [] })
} 

export default function MainPage() { 

	return (
		<main className='min-h-screen min-w-full bg-white text-black flex flex-col items-center gap-4 relative'>
			<nav className='w-full h-12 bg-red-50 flex items-center'>
				<div className='container mx-auto flex items-center justify-between'>
					<h1 className='text-lg'>Remeber</h1>
					<div>
						<button>X</button>
					</div>
				</div>
			</nav>
			<div className='container flex flex-col items-center'>
				<h1 className='text-2xl'>Today's Questions</h1>
				<div>
					<Card />
				</div>
			</div>
		</main>
	)
}

