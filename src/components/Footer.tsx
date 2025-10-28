import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
return (
    <section id="" className="bg-neutral-900 border-t border-neutral-800"> 
        <div className="container  mx-auto py-12 px-3 md:px-10">
            <div className="grid md:grid-cols-4 grid-cols-1 py-6 mb-6 gap-8 ">
                <div className="  ">
                    <h3 className="mb-4 text-2xl font-bold "><span className="text-purple-600">Cine</span> Mix</h3>
                    <p className="text-sm text-neutral-400">Discover and explore the latest movies from around the world. CineMix gives you access to a vast collection
                        of films across all genres
                    </p>
                    <ul className="flex space-x-4 mt-3 ">
                        <li className="text-neutral-400 hover:text-purple-500 transition-colors"><Twitter/></li>
                        <li className="text-neutral-400 hover:text-purple-500 transition-colors"><Instagram/></li>
                        <li className="text-neutral-400 hover:text-purple-500 transition-colors"><Facebook/></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-2xl font-bold ">Quick Links</h3>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Home</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Trending</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Top Rated</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Popular</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors" >Browse by Genre</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-2xl font-bold ">Resources</h3>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">About</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Contact</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Blog</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors ">FQA</a></li>
                        <li><a href="" className="text-neutral-400 hover:text-purple-500 transition-colors">Help Center</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-2xl font-bold ">News Letter</h3>
                    <p className="text-neutral-400">Stay up to date with the latest movies and news </p>
                    <form action="">
                        <input type="text" placeholder="your email address" className="rounded bg-neutral-800 border-neutral-900 w-full py-2 px-2 my-3   focus:outline-none focus:ring-2 focus:ring-purple-600"/>
                        <button className="bg-purple-600 hover:bg-purple-700 w-full rounded py-2">Subscribe</button>
                    </form>
                </div>
            </div>
             
            <div className="border-t-1 border-neutral-800 py-3 mt-10 flex items-center justify-between">
                <p className="text-neutral-400">&copy; cinemix all rights reserved   powered by <span className="text-purple-600">TMBD</span> API</p>
                <div className="flex space-x-2 text-neutral-400 ml-3">
                    <p>privacy policy</p>
                    <p>Terms of    Service</p>
                    <p>Cookies  policy</p>
                </div>
            </div>
        </div>
    </section>
)
}

export default Footer
