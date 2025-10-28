import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

const ScrollToTop = () => {
    const [visible , setisVisible] = useState(false); 

    const handleIsVisible = ()=>{
        if (window.pageYOffset > 300 ){
            setisVisible(true ); 
        }
        else{
            setisVisible(false)
        }
    }

    useEffect(()=>{
        window.addEventListener( "scroll" ,  
            handleIsVisible
        )
        return ()=> window.removeEventListener("scroll" ,  handleIsVisible) 
    })
    console.log()
return (

    <div className="  z-10 bottom-6 fixed right-6  ">
        <button
        onClick={()=> window.scrollTo(0 , 0) }
         
         className={`  ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 " }   hover:cursor-pointer focus:outline-none bg-purple-600 text-white rounded-full p-5 hover:bg-purple-700 transition-all duration-300 shadow-lg`}>
            <ChevronUp />
        </button>
    </div>
)
}

export default ScrollToTop
