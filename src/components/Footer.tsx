 
const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <div className='navbar bg-base-100 border-t-2 border-base-200'>
      <div className='flex-1 container mx-auto'>
        <h1 className="font-semibold mx-auto">&copy; {date}</h1>
      </div>
    </div>
  )
}

export default Footer