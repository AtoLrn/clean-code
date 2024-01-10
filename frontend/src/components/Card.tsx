import { PanInfo, motion as m, useMotionValue, useTransform } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import { TiTick, TiTimes } from 'react-icons/ti'

export interface CardProps {
	question: string,
	answer: string,
	tag?: string,
	onSubmit: (isValid: boolean) => unknown
}

export enum Status {
	PENDING,
	ACCEPTED,
	REFUSED
}

export const Card: React.FC<CardProps> = ({ question, answer, tag, onSubmit }) => {
	const [ isAccepted, setAccepted ] = useState(false)

	const [ isChoiceMade, setChoiceMade ] = useState<Status>(Status.PENDING)

	const [ isRevelead, setRevealed ] = useState(false)
	const x = useMotionValue(0)
	const rotate = useTransform(x, [-250, 250], [-25, 25])
	const opacity = useTransform(x, [-250,-100, 0, 100, 250], [1, 1, 0, 1, 1])

	const onDrag = useCallback((_: unknown, pan: PanInfo) => {
		setAccepted(pan.offset.x > 0)
	}, [])

	const onDragEnd = useCallback((_: unknown, pan: PanInfo) => {
		if (pan.offset.x > 150) {
			setChoiceMade(Status.ACCEPTED)
		} else if (pan.offset.x < -150) {
			setChoiceMade(Status.REFUSED)
		}
	}, [])	

	useEffect(() => {
		if (Status.PENDING === isChoiceMade) { return }
		onSubmit(isChoiceMade === Status.ACCEPTED)
	}, [isChoiceMade])

	return <div className={`h-96 w-72 relative flex items-center justify-center duration-300 ${isChoiceMade === Status.PENDING ? '' : `opacity-0 ${isChoiceMade === Status.ACCEPTED ? 'translate-x-full rotate-12' : '-translate-x-full -rotate-12' }`}`}>
		<m.div 
			className='shadow-black shadow-md relative w-full h-full flex flex-col items-start gap-2 text-white p-8 bg-slate-600'
			style={{ x, rotate }}
			drag="x" 
			dragConstraints={{ left: 0, right: 0 }}
			whileTap={{ cursor: 'grabbing' }}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
		>
				
			<h1 className='text-xl'>{question}</h1>
			{ tag && <span className='text-xs px-2 py-1 rounded-md bg-opacity-30 border bg-green-500 border-green-500'>{tag}</span>}
			<span className='c cursor-pointer' onClick={() => setRevealed(!isRevelead)}>{ !isRevelead ? '********' : answer}</span>

			<m.span style={{
				opacity
			}} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto'>
				<div className={`p-8 rounded-full ${isAccepted ? 'bg-green-600' : 'bg-red-600'} flex items-center justify-center`}>
					{isAccepted ? <TiTick className='' size={64} /> : <TiTimes size={64} />}
				</div>
			</m.span>
			
		</m.div>
		
	</div>  
}