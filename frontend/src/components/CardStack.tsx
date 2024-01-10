import { AnimatePresence, motion as m } from 'framer-motion'
import { useState } from 'react'
import { Card, CardProps } from './Card'

export interface CardStack {
    questions: Array<Omit<CardProps, 'onSubmit'> & { id: string }>
}

export const CardStack: React.FC<CardStack> = ({ questions }) => {
	const [ answeredIds, setAnsweredIds ] = useState<string[]>([])

	const onSubmit = (id: string, isValid: boolean) => {
		setAnsweredIds((ids) => [...ids, id])
	}

	return <div className='relative flex items-center justify-center'>
		<AnimatePresence mode='sync'>
		
			{ questions.filter(({ id }) => !answeredIds.includes(id)).map(({id, question, answer, tag}, index, arr) => {
				return <m.div 
					className='absolute top-0 left-0'
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