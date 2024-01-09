import { AnimatePresence, motion as m, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export const Card = () => {
	const x = useMotionValue(0)
	const rotate = useTransform(x, [-250, 250], [-35, 35])

	return <div className="h-96 w-72 bg-slate-500 relative flex items-center justify-center">
		<AnimatePresence mode='wait'>
			<m.div 
                
				className='w-full h-full bg-red-500'
				style={{ x, rotate }}
				drag="x" 
				dragConstraints={{ left: 0, right: 0 }}
				whileTap={{ cursor: 'grabbing' }}>
            TESt
			</m.div>
		</AnimatePresence>
		
	</div>  
}