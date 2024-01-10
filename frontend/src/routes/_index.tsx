import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useState } from 'react'
import { CardStack } from 'src/components/CardStack'

export async function loader({request}: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const date = url.searchParams.get('date')
	const req = await fetch(`http://localhost:8080/cards/quizz?date=${date}`)
	const res = await req.json()

	console.log(res)
	return json({ questions: res })
} 

export default function MainPage() { 
	const [ question, setQuestion ] = useState('')
	const [ answer, setAnswer ] = useState('')
	const [ tag, setTag ] = useState('')

	const onSubmit = async () => {
		const req = await fetch('http://localhost:8080/cards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				question,
				answer,
				tag
			})
		})

		setQuestion('')
		setAnswer('')
		setTag('')
	}

	return (
		<main className='min-h-screen min-w-full bg-white text-black flex flex-col items-center gap-4 relative'>
			<nav className='w-full h-12 bg-red-50 flex items-center'>
				<div className='container mx-auto flex items-center justify-between'>
					<h1 className='text-lg'>Remember</h1>
					<div>
						<button>X</button>
					</div>
				</div>
			</nav>
			<div className='container flex gap-8 items-start mt-16'>
				<div className='flex-1 flex flex-col gap-4 justify-start items-start'>
					<h1 className='text-3xl'>Hello User</h1>
					<span className='text-gray-600'>Ready to do the daily challenge ?</span>
					<hr className='w-full' />
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild>
							<button className="bg-gray-700 text-white px-4 py-2 rounded-lg">Create Question</button>
						</AlertDialog.Trigger>
						<AlertDialog.Portal>
							<AlertDialog.Overlay className="bg-gray-500 bg-opacity-10 z-30 absolute top-0 left-0 w-screen h-screen" />
							<AlertDialog.Content className="fixed flex flex-col items-start gap-2 shadow-lg shadow-slate-500 top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 w-1/3 p-4 bg-white rounded-lg">
								<AlertDialog.Title className="text-xl">Create a new Question</AlertDialog.Title>
								<AlertDialog.Description className="AlertDialogDescription">
									You're about to create a new question for your trainings
								</AlertDialog.Description>
								<div className='flex flex-col gap-2'>
									<input onChange={(e) => setQuestion(e.currentTarget.value)} value={question} type="text" placeholder='Question?' required={true}  />
									<input onChange={(e) => setAnswer(e.currentTarget.value)} value={answer} type="text" placeholder='Answer' required={true} />
									<input onChange={(e) => setTag(e.currentTarget.value)} value={tag} type="text" placeholder='Tag' />
								</div>
								<div className='flex gap-2 w-full justify-end'>
									<AlertDialog.Cancel asChild>
										<button className="bg-gray-700 text-white px-4 py-2 rounded-lg">Cancel</button>
									</AlertDialog.Cancel>
									<AlertDialog.Action asChild>
										<button onClick={onSubmit} className="bg-gray-700 text-white px-4 py-2 rounded-lg">Create</button>
									</AlertDialog.Action>
								</div>
							</AlertDialog.Content>
						</AlertDialog.Portal>
					</AlertDialog.Root>

				</div>
				<div className='flex-1 flex items-center justify-center'>
					<CardStack questions={[{
						question: 'Quand est nez Lucas?',
						answer: 'Je sais pas :(',
						tag: 'Boufon',
						id: 'xxx-xxx'
					}, {
						question: 'Quand est nez Lucas?2',
						answer: 'Je sais pas :(2',
						tag: 'Boufon2',
						id: 'xxx-xxx2'
					}, {
						question: 'Quand est nez Lucas?2',
						answer: 'Je sais pas :(2',
						tag: 'Boufon2',
						id: 'xxx-xxx3'
					}, {
						question: 'Quand est nez Lucas?2',
						answer: 'Je sais pas :(2',
						tag: 'Boufon2',
						id: 'xxx-xxx4'
					}]}/>
				</div>
				
			</div>
		</main>
	)
}

