import React from 'react'

const HeroSections = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: 'url(/images/heroImage.jpg)'}}>
        <div className='absolute inset-0 bg-black/80'></div>
      </div>
      
    </div>
  )
}

export default HeroSections
