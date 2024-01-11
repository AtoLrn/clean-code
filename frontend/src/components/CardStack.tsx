import { AnimatePresence, motion as m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Card, CardProps } from './Card'

export interface CardStack {
    questions: Array<Omit<CardProps, 'onSubmit'> & { id: string }>
}

export const CardStack: React.FC<CardStack> = ({ questions }) => {
	const [ answeredIds, setAnsweredIds ] = useState<string[]>([])

	const onSubmit = (id: string, isValid: boolean) => {
		setAnsweredIds((ids) => [...ids, id])
		fetch(`http://localhost:8080/cards/${id}/answer`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				isValid,
			})
		})
	}

	useEffect(() => {
		setAnsweredIds([])
	}, [questions])

	return <div className='relative flex items-center justify-center mt-12'>
		<AnimatePresence mode='sync'>
		
			{ questions.filter(({ id }) => !answeredIds.includes(id)).map(({id, question, answer, tag}, index, arr) => {
				return <m.div 
					className='absolute top-0 m-auto'
					style={{ zIndex: index }}
					key={id}
					initial={{ transform: 'translateY(30%)', opacity: 0}}
					animate={{ transform: 'translateY(0%)', opacity: 1}}
					exit={{ opacity: 0 }}>
					<div className=' duration-200' style={{ transform: `rotate(${(arr.length - index - 1) * 5}deg)`}}>

						<Card question={question} answer={answer} tag={tag} onSubmit={onSubmit.bind(this, id)}/>
					</div>
				</m.div>
			})}
		</AnimatePresence>
	</div>
}