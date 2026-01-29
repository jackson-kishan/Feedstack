import { Button } from "./ui/button";


export default function Roadmap() {

    return (
        <main className="flex flex-col grow">
           <div className="flex w-full shrink-0 items-start py-3 px-2 md:px-10 flex-col space-y-3">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-lg md:text-2.125 tracking-tight leading-heading font-semibold text-text">Roadmap</h1>
                <div className="shrink-0">
                    <div className="relative shrink-0 grow-0 inline-flex">
                        <div className="flex shrink-0 rounded bg-surface-0 border border-element-10 shadow-sm">
                            <Button className="bg-gray-50 h-auto w-auto hover:bg-gray-200">
                                <h3 className="text-gray-500">Filter</h3>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-x-scroll w-full py-4 px-4">
                <div className="flex space-x-4">
                   <div className="flex-auto w-56 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="mb-4 text-lg font-semibold text-black">2.0 Feedback</h2>   
                  </div> 

                  <div className="w-96 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="md-4 text-lg font-semibold text-black">TO DO</h2>

                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                        <div className="flex item-start space-x-3">
                            <Button className="flex items-center justify-start w-12 h-12 bg-gray-50 hover:bg-gray-200 text-gray-800 font-bold text-lg">
                               23
                            </Button>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur</h3>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="w-96 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="md-4 text-lg font-semibold text-black">TO DO</h2>

                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                        <div className="flex item-start space-x-3">
                            <Button className="flex items-center justify-start w-12 h-12 bg-gray-50 hover:bg-gray-200 text-gray-800 font-bold text-lg">
                               23
                            </Button>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                        <div className="flex item-start space-x-3">
                            <Button className="flex items-center justify-start w-12 h-12 bg-gray-50 hover:bg-gray-200 text-gray-800 font-bold text-lg">
                               23
                            </Button>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur hewhfopiw ehporfhe werioph fgiop uwerhpu iofgh ujghedfuiopwer ghiudfui</h3>
                            </div>
                        </div>
                    </div>

                  </div>

                  <div className="w-96 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="md-4 text-lg font-semibold text-black">TO DO</h2>

                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                        <div className="flex item-start space-x-3">
                            <Button className="flex items-center justify-start w-12 h-12 bg-gray-50 hover:bg-gray-200 text-gray-800 font-bold text-lg">
                               23
                            </Button>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur</h3>
                            </div>
                        </div>
                    </div>
                  </div>


        

                  

                </div>
            </div>
           </div>
        </main>
    )
}